let express=require("express");
let app = express();
let log4js = require('log4js');
let jwt = require('jsonwebtoken');
let bodyParser = require('body-parser');
const userRooter = require('./router/user');
const mockRooter = require('./router/mock');
const { httpLog } = require('./log');

// 将每个请求的日志 都记录下来
app.use(log4js.connectLogger(httpLog, { level: 'info' }));
// 参数解析
app.use(bodyParser.json()); // 数据json 类型
app.use(bodyParser.urlencoded({
  extended: false
}))


// 全部的路由匹配 

app.use( (req,res,next) => {
    let urls = ['/user/login','/user/register'];
    console.log(req.url)
    if(!urls.includes(req.url)) {
       let token = req.headers.token || req.query.token || req.body.token;
       console.log(req, '999')
       if(token){
           jwt.verify(token, 'wzf', (err, decoded) => {
             if(err){
               res.send({
                 code:'10109',
                 message:' 跳转到登录页'
               })
             }else{
               req.decoded = decoded
               next()
             }
           })
       }else {
         res.send({
            code:'10109',
            message:'没有找到token',
         })
       }
    }else {
      next()
    }
})

// 注册路由
app.use('/user',userRooter);


app.listen(3030)
