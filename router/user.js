const express = require('express'); 
const router = express.Router();
const util = require('../utils');
// 用户唯一标识的id
const uuid  = require('node-uuid');
// 密码加密级别 
let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10); // 加密级别



// 登录接口
router.post('/login', async (req,res,next) => {
    if(!req.body) { 
        res.send({data:'数据没有填',status:'400'});
    }else {
        const {name,password} = req.body
        let sql =  `select * from user where name = ${name} and password = ${password}`;
        let result = await  util.query(sql);
        res.send(result);
    }
    
})

// 注册接口 
router.post('/register',(req,res,next) => {
    const { name, password } = req.body
    let sql = `INSERT INTO user values('${name}','${password}')`;
    let findSql = `select * from user where name = '${name}' `;
    let result = await  util.query(findSql);
    if(result.status ) {
        let _inset = await  util.query(sql);
        res.send (_inset);
    }else {
       res.send(result)
    }
    
    
})

module.exports = router;