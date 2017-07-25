// 获取豆书籍的id,title   node tweets.js js[python...]
/*var qs = require('querystring'),
    http = require('http');

var search = process.argv.slice(2).join(' ').trim();

if (!search.length) {
    return console.log('\n 请输入搜索关键字，如：node tweets.js js \n');
}

console.log('搜索关键字: \033[96m' + search + '\033[39m\n');
http.get({
    host: 'api.douban.com',
    path: '/v2/book/search?' + qs.stringify({fields: 'id,title', q: search}),
    headers: {
        'Content-Type': 'application/json'
    }
}, function (res) {
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        body += chunk;
    });
    res.on('end', function () {
        // var obj = JSON.parse(body);
        console.log(body);
        /!*obj.results.forEach(function(tweet){
         console.log(' \033[96m' + tweet.text + '\033[39m');
         console.log(' \033[96m' + tewwt.from_user + '\033[39m');
         console.log('--');
         })*!/
    })
});*/


require('superagent').get('https://api.douban.com/v2/book/search')
    .send({fields: 'id,title', q: 'js'})
    .end(function(res){
        console.log(res.body);
    });
