const express = require('express');
const router = express.Router();
const util = require('./utils');
const fs = require('fs');
const marked = require('marked');
const path = require('path');
const {
    consoleLog
} = require('../log');



router.post('/detail', async (req, res, next) => {
    const {
        title,
        tagName = 'leecode',
        article_title = `规范git commit的提交记录（交互式命令行)`,
    } = req.body;
    let absPath = path.join(__dirname, '../');
    fs.readFile(absPath + `markdown/${title}.md`, async (err, data) => {
        if (err) {
            console.log(err, '出错了')
            consoleLog.info(err);
        } else {
            let htmlStr = marked(data.toString());
            let currentTime = new Date();
            currentTime = currentTime.toLocaleString().replace(/\//, "-");
            article_title = `【${tagName}】` + article_title;
            let sql = `INSERT INTO  article (title,time,article_desc,tagName,article_title) values('${title}','${currentTime}','${htmlStr}','${article_title}')`;
            let _res = await util.query(sql).catch(res => {
                console.log(res, '出错的原因')
            });

            console.log(_res)
            if (_res.status == 200) {
                res.send({
                    status: 200,
                    code: '文章详情插入成功'
                })
            } else {
                res.send({
                    status: 404,
                    code: '文章插入失败'
                })
            }
        }
    })
})

router.post('/select', async (req, res, next) => {
    const {
        title
    } = req.body;
    let sql = `select * from article where title = '${title}'`
    let {
        result,
        status
    } = await util.query(sql);
    if (status == 200) {
        res.send({
            status: 200,
            code: '文章查询成功',
            result,
        })
    } else {
        res.send({
            status: 404,
            code: '文章查询失败'
        })
    }
})





module.exports = router;