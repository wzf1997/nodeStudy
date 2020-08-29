let log4js = require('log4js');

log4js.configure({
    appenders: {
        // type 表示 输入的日志 是以什么形式存在   file 就会新建一个文件  console 就是会在
        // 控制台输出
       out: {
           type: 'file',
           filename:'./log/test1.log'
       }, // 控制台输出 默认是关闭对的
      console: { type: 'console', filename: './log/test.log' },
      httpLog: {
          type: 'dateFile',
          filename:'./log/http.log',
          pattern: '-yyyy-MM-dd.log',// 输入的日志 以什么的模式
          keepFileExt: true,
      },
      file: { type: 'file', filename: './log/cheese.log' }
    },
    categories: {
      default: { appenders: ['console','out'], level: 'debug' },
      http: { appenders: ['httpLog','out'], level: 'info' }
    }
});
let httpLog = log4js.getLogger('http');
let consoleLog = log4js.getLogger('console');
module.exports = {
    httpLog,
    consoleLog,
};