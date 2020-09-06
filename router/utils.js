const mysql = require('../mysql'); 
function query(sql) {
    return new Promise( (resolve,reject) => {
        mysql.query(sql, (err,result) =>{
            if(err){
                resolve(err)
            }else {
                resolve({result,status:200});
            }
        })
    })
};

let  util = {};
util.query = query;
module.exports = util;