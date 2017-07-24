var qs = require('querystring');
require('http').createServer(function (req, res) {
    var body = '';
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        "use strict";
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<p>你的姓名是: ' + qs.parse(body).name + '</p>');
        console.log(qs.parse(body));
    });
}).listen(3001);