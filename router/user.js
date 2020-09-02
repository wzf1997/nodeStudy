const express = require('express'); 
const router = express.Router();
const util = require('./utils');
// 用户唯一标识的id
const uuid  = require('node-uuid');
const { consoleLog }  = require('../log');
let jwt = require('jsonwebtoken');
// 密码加密级别 
let bcrypt = require('bcryptjs');
let redis = require('../redis');
let salt = bcrypt.genSaltSync(10); // 加密级别


// 登录接口
router.post('/login', async (req,res,next) => {
    if(!req.body) { 
        res.send({data:'数据没有填',status:'400'});
    }else {
        const {name,password} = req.body
        let sql =  `select * from user where name = '${name}' `;
        let dataBaseres = await  util.query(sql);
        if(dataBaseres.result.length > 0){
            const { result } = dataBaseres;
            const { password: pwd, name, userid } = result[0];
            console.log(result[0], '999')
            // 比较输入的密码 和 数据库中加密的密码
            let isRight =  bcrypt.compareSync(password,pwd);
            // 如果密码正确
            if(isRight){
               let token = jwt.sign({ userid, name}, 'wzf', {
                   expiresIn: 60*2  // 2
               })
               let redisResult  = await redis.set(`${token}`, `${name}`,2);
               if(redisResult){
                    res.send({
                        code:'10010',
                        data:'登录成功',
                        token
                    });
               } 
            }else {
                res.send({
                    code:'10100',
                    data:'密码错误'
                });
            }
        }else{
            res.send({
                data:'没有该用户'
            });
        }
        
    }
});

// 注册接口 
router.post('/register',async (req,res,next) => {
    let { name, password } = req.body
    console.log(name , '查看姓名')
    let findSql = `select * from user where name ='${name}' `;
    let result = await  util.query(findSql);
    console.log(result)
    if( result.length > 0) {
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
        console.log(_inset,'9999')
        if(_inset.status == 200){
            res.send({
                status:200,
                code:'注册成功'
            })
        }else {
            res.send({
                status:404,
                code:'注册失败',
            })
        }
    
    }
});
router.post('/select', async(req,res)=> {
    let findSql = `select * from user  `;
    let result = await  util.query(findSql);
    res.send(result);
})

module.exports = router;