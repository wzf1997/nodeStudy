let express = require("express");
let app = express();
let log4js = require('log4js');
let jwt = require('jsonwebtoken');
let bodyParser = require('body-parser');
const multer = require('multer');
let redis = require('./redis');
const formidable = require('express-formidable')
const userRooter = require('./router/user');
const mockRooter = require('./router/mock');
const articleRooter = require('./router/article');
const {
	httpLog
} = require('./log');

// 将每个请求的日志 都记录下来
app.use(log4js.connectLogger(httpLog, {
	level: 'info'
}));
// 参数解析
app.use(bodyParser.json()); // 数据json 类型
app.use(bodyParser.urlencoded({
	extended: false
}))

let imgReg = /.jpg|.jpeg|.png$/g
let mdReg = /.md$/g
//从upload中获取文件
const upload = multer({
	storage: multer.diskStorage({
		// 定义上传文件的文件夹
		destination: function (req, file, cb) {
			console.log(file)
			if (imgReg.test(file.originalname)) {
				cb(null, './img/');
			} else if (mdReg.test(file.originalname)) {
				cb(null, './markdown/');
			} else {
				cb(null, './other/')
			}

		},
		// 修改上传文件的名字
		filename: function (req, file, cb) {
			cb(null, file.originalname);
		}
	})
});


app.all('*', (req, res, next) => {
	// 设置是否运行客户端设置 withCredentials
	// 即在不同域名下发出的请求也可以携带 cookie
	res.header("Access-Control-Allow-Credentials", true)
	// 第二个参数表示允许跨域的域名，* 代表所有域名  
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS') // 允许的 http 请求的方法
	// 允许前台获得的除 Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma 这几张基本响应头之外的响应头
	res.header('Access-Control-Allow-Headers', 'Content-Type, token,Content-Length, X-Requested-With')
	if (req.method == 'OPTIONS') {
		return res.sendStatus(204)
	} else {
		next()
	}

})

// 全部的路由匹配 
app.use(async (req, res, next) => {
	let urls = ['/user/login', '/user/register'];
	if (!urls.includes(req.url)) {
		let token = req.headers.token || req.query.token || req.body.token;
		let redisRes = await redis.get(`${token}`).catch(err => {
			console.log('chucuo l ?')
		});
		console.log(redisRes, '2', token)
		if (token) {
			jwt.verify(token, 'wzf', (err, decoded) => {
				if (err) {
					res.send({
						code: '10109',
						message: ' 跳转到登录页'
					})
				} else {
					req.decoded = decoded
					next()
				}
			})
		} else {
			return res.send({
				code: '10109',
				message: '没有找到token',
			})
		}
	} else {
		next()
	}
})


app.post('/upload/single', upload.single('file'), (req, res) => {
	console.log('999')
	res.send({
		data: '上传成功'
	})
});


// 注册路由
app.use('/user', userRooter);
app.use('/article', articleRooter);


app.listen(3030)