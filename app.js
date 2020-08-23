let express=require("express");
let app = express();
let bodyParser = require('body-parser');
const userRooter = require('./router/user');

// 解析application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

app.get('/list', function(req, res, next) {
  
  res.send([...Array(100).keys()]);
  next();
});


app.get('/api/getMock',  (req,res, next)=>{
  res.setHeader('Cache-Control', 'public, max-age=10000');

     let   list =[];
    // 生成指定个数的随机字符串
    function genrateRandomWords(n) {
      let words = 'abcdefghijklmnopqrstuvwxyz你是好的嗯气短前端后端设计产品网但考虑到付款啦分手快乐的分类开发商的李开复封疆大吏师德师风吉林省附近',
          len = words.length,
          ret = ''
      for(let i=0; i< n; i++) {
        ret += words[Math.floor(Math.random() * len)]
      }
      return ret
    }


    
     // 生成10万条数据的list
     for(let i = 0; i< 100000; i++) {
      list.push({
        name: `xu_0${i}`,
        title: genrateRandomWords(12),
        text: `我是第${i}项目, 赶快🌀吧~~`,
        tid: `xx_${i}`
      })
    }
    res.send({
      list
    });
    next();
})
// 注册路由
app.use('/user',userRooter);
app.use(express.static("public",options))
app.listen(3030)
