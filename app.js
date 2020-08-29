let express=require("express");
let app = express();
let log4js = require('log4js');
let bodyParser = require('body-parser');
const userRooter = require('./router/user');
const mockRooter = require('./router/mock');
const { httpLog } = require('./log');
// 将每个请求的日志 都记录下来
app.use(log4js.connectLogger(httpLog, { level: 'info' }));
// 参数解析
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/test', res=> {
   console.log('测试的');
})
// 注册路由
app.use('/user',userRooter);


app.listen(3030)
