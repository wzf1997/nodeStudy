let mysql = require('mysql');
let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root', 
    database:'xz',
})
connection.connect();

module.exports = connection;