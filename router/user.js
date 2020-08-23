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
module.exports = router;