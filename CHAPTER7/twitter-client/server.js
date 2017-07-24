
var qs = require('querystring');

require('http').createServer(function (req, res) {
    var body = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {
        res.writeHead(200);
        res.end('Done');

        console.log('\n  获取名称： \033[90m' + qs.parse(body).name + '\033[39m');
    });
}).listen(3001);
