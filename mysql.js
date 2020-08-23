let mysql = require('mysql');
let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'wzf19971108', 
    database:'blog',
})
connection.connect();

module.exports = connection;