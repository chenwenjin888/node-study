const request = require('superagent');

module.exports = function search(query, fn) {
    request.get('https://api.douban.com/v2/book/search')
        .send({ fields: 'id,title', q: query })
        .end((err, res) => {
        // 搜索到书籍
            if (res.body && res.body.total) {
                return fn(null, res.body.books)
            }
            fn(new Error('未找到此书籍。'))
        });
}