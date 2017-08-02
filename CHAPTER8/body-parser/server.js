// 模块依赖
const express = require('express'),
    serveStatic = require('serve-static'),// 静态资源
    morgan = require('morgan'),// 日志打印 logger
    bodyParser = require('body-parser'),
    multer = require('multer'),
    upload = multer(), // for parsing multipart/form-data
    fs = require('fs');

const app = express();

// 输出日志 combined dev
app.use(morgan('dev'));
// 处理form提交
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())
// 处理静态文件
app.use(serveStatic(__dirname + '/static'));
app.use(function (req, res, next) {
    console.error(' %s %s', req.method, req.url);
    next();
});
app.post('/',upload.single('file'), function (req, res, next) {
    console.log('------------------------------------')
    console.log(req.body);
    console.log('------------------------------------')
    res.json(req.body);
})

app.listen(3001);