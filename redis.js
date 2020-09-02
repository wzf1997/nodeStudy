let redis = require('redis');
let client = redis.createClient('6379','127.0.0.1'); 

let redisDb = {};
// redis 错误监听事件
client.on('error',(err)=>{
    console.log('redis出错啦:' + err);
});

client.on('connect', ()=> {
    console.log('redis连接成功');
})

/**
 * redis set 方法
 * @param {*} key  
 * @param {*} value 
 * @param {*} exprires  单位分钟 过期时间
 */
redisDb.set = function (key,value, exprires) {
    return new Promise( resolve => {
        client.set(key,value,(err,res) => {
            // 如果有过期时间
            if(exprires){
                client.expire(key,exprires*60);
            }
            resolve(res=='OK');
        })
    })
}

/**
 * redis get 方法
 * @param {*} key 
 */
redisDb.get =  function(key) {
    return new Promise((resolve,reject) => {
        client.get(key,(err,reply)=>{
            // 获取一个不存在的值是 null 
            resolve(reply);
        })
    })
}

module.exports = redisDb;