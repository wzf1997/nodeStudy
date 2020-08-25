const express = require('express'); 
const router = express.Router();
const mysql = require('../mysql');
// 登录接口
router.post('/login',(req,res,next) => {
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

// 注册接口 
router.get('/register',(req,res,next) => {
    const { name, password } = req.query;
    let sql = `INSERT INTO user values('${name}','${password}')` 
    mysql.query(sql,(err,result) =>{
        if(err){
            res.send('插入失败')
        }else {
            res.send({
                status:200,
                data:'插入成功',
            })
        }
    })

})
module.exports = router;