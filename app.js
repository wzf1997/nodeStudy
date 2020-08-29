let express=require("express");
let app = express();
let bodyParser = require('body-parser');
const userRooter = require('./router/user');
const mockRooter = require('./router/mock');

// 参数解析
app.use(bodyParser.urlencoded({
  extended: true
}))

// 注册路由
app.use('/user',userRooter);

app.listen(3030)
