// 模块依赖
const connect = require('connect'),
    serveStatic = require('serve-static'),// 静态资源
    morgan = require('morgan'),// 日志打印 logger
    fs = require('fs');

const app = connect();

app.use(morgan('dev'));// 输出日志 combined dev
// 处理静态文件
app.use(serveStatic(__dirname + '/website'));
app.use(function (req, res, next) {
    console.error(' %s %s', req.method, req.url);
    next();
});
app.use(function (req, res, next) {
    if ('GET' == req.method && '/images' == req.url.substr(0, 7)) {
        fs.stat(__dirname + req.url, function (err, stat) {
            if (err || !stat.isFile()) {
                res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
                res.end('图片未找到！');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/jpg' + ';charset=utf-8' });
            fs.createReadStream(__dirname + req.url).pipe(res);
        })
    } else {
        next();
    }
});
app.use(function (req, res, next) {
    if ('GET' == req.method && '/' == req.url) {
        res.writeHead(200, { 'Content-Type': 'text/html' + ';charset=utf-8' });
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    } else {
        next();
    }
});
app.use(function (req, res, next) {
    res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
    res.end('页面未找到！！！');
});

app.listen(3001);