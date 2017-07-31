// 模块依赖
var http = require('http'),
    fs = require('fs');

// 创建服务器
var server = http.createServer(function (req, res) {
    req.setEncoding("utf8");
    if ('GET' == req.method && '/images' == req.url.substr(0, 7) && '.jpg' == req.url.substr(-4)) {
        fs.stat(__dirname + req.url, function (err, stat) {
            if (err || !stat.isFile()) {
                res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
                res.end('图片未找到！');
                return;
            }
            serve(__dirname + req.url, 'application/jpg');
        })
    } else if ('GET' == req.method && '/' == req.url) {
        serve(__dirname + '/index.html', 'text/html');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
        res.end('页面未找到！');
    }

    function serve(path, type) {
        res.writeHead(200, { 'Content-Type': type + ';charset=utf-8' });
        fs.createReadStream(path).pipe(res);
    }
});

// 监听
server.listen(3001);