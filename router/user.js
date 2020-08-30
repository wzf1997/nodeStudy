const express = require('express'); 
const router = express.Router();
const util = require('./utils');
// 用户唯一标识的id
const uuid  = require('node-uuid');
const { consoleLog }  = require('../log');
// 密码加密级别 
let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10); // 加密级别


// 登录接口
router.post('/login', async (req,res,next) => {
    if(!req.body) { 
        res.send({data:'数据没有填',status:'400'});
    }else {
        const {name,password} = req.body
        let sql =  `select * from user where name = '${name}' `;
        let res = await  util.query(sql);
        if(res.status){
            const { result } = res;
            consoleLog.info(result, '查看userid -----');
        }else{
            res.send({
                data:'没有该用户'
            });
        }
        
    }
});

// 注册接口 
router.post('/register',async (req,res,next) => {
    const { name, password } = req.body
    let findSql = `select * from user where name ='${name}' `;
    let result = await  util.query(findSql);
    if(result.status) {
        res.send({
             data:'你已经注册，请登录！'
        });
    }else {
        // 没有该用户  --- 继续完成注册操作 
        let  userid = 'users_' +  uuid.v1();
        consoleLog.info(userid, '查看userid -----');
        // 对密码加密
        password = bcrypt.hashSync(password,salt);
        let sql = `INSERT INTO user values('${name}','${password}','${userid}')`;
        let _inset = await  util.query(sql);
        res.send (_inset);
    }
});

module.exports = router;