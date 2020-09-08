const express = require('express'); 
const router = express.Router();
const util = require('./utils');
const fs = require('fs');
const marked = require('marked');
const path = require('path');
const { consoleLog }  = require('../log'); 


router.get('/insert',async (req,res,next) => {
    const { title, title_desc } = req.query;
    let  currentTime = new Date();
    currentTime = currentTime.toLocaleString().replace(/\//,"-");
    let  sql =  `INSERT INTO  article (title,time,title_desc) values('${title}','${currentTime}','${title_desc}')`
    let  _res = await util.query(sql)
    if(_res.status == 200) {
        res.send({
            status:200,
            code:'文章详情插入成功'
        })
    }else {
        res.send({
            status:404,
            code:'文章插入失败'
        })
    }
})



router.get('/detail', async (req,res,next) => {
    const {title } = req.query;
    let absPath = path.join(__dirname,'../');
    fs.readFile( absPath + 'markdown/docker.md', async (err,data) => {
        if(err){
            consoleLog.info(err);
        }else {
            consoleLog.info(data)
            let htmlStr =  marked(data.toString());
            let  currentTime = new Date();
            currentTime = currentTime.toLocaleString().replace(/\//,"-");
            let  sql = `INSERT INTO  article (title,time,article_desc) values('${title}','${currentTime}','${htmlStr}')`;
            let  _res = await util.query(sql);
            console.log(_res)
            if(_res.status == 200) {
                res.send({
                    status:200,
                    code:'文章详情插入成功'
                })
            }else {
                res.send({
                    status:404,
                    code:'文章插入失败'
                })
            }
        }    
    })
})



module.exports = router;
