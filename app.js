let express=require("express");
let app = express();
let bodyParser = require('body-parser');
const userRooter = require('./router/user');
let mysql  = require('./mysql');

app.use(bodyParser.urlencoded({
  extended: true
}))

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
app.post('/login',(req,res,next) => {
  if(!req.body) { 
      res.send({data:'数据没有填',status:'400'});
  }else {
      const {name,password} = req.body
      let sql =  `select * from user where name = ${name} and password = ${password}`;
      mysql.query(sql, (err,result) => {
          if(err){
              res.send('请先注册')
          }else {
              res.send({
                  status:200, 
                  data:result
              })
          }
      })
  }
  
})
// 注册路由
app.use('/user',userRooter);

app.listen(3030)
