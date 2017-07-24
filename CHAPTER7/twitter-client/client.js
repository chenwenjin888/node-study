
var http = require('http')
    , qs = require('querystring')

function send (theName) {
    http.request({ host: '127.0.0.1', port: 3001, url: '/', method: 'POST' }, function (res) {
        res.setEncoding('utf8');
        // res.on('end', function () { // 特殊修改，书上有此一行代码， 但是会导致下面的代码不会执行
            console.log('\n  \033[90m✔ request complete!\033[39m');
            process.stdout.write('\n  你的名称: ');
        // });
    }).end(qs.stringify({ name: theName }));
}

process.stdout.write('\n  你的名称: ');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function (name) {
    send(name.replace('\n', ''));
});
