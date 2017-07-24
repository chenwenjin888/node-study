var qs = require('querystring');
require('http').createServer(function (req, res) {
    if ('/' == req.url) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end([
            '<form method="POST" action="/url">',
            '<h1>我的表单</h1>',
            '   <fieldset>',
            '   <label>个人信息</label>',
            '   <p>你的名字?</p>',
            '   <input type="text" name="name">',
            '   <p><button>提交</button></p>',
            '</form>'
        ].join(''));
    } else if ('/url' == req.url && 'POST' == req.method) {
        var body = '';
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            "use strict";
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            console.log(qs.parse(body))
            res.end('<p>你的姓名是: ' + qs.parse(body).name + '</p>');
        });
    }else{
        res.writeHead(404);
        res.end('Not found')
    }
}).listen(3001);