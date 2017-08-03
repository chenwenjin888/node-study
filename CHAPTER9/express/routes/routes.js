// 引入模块
const express = require('express'),
    search = require('../search'),
    router = express.Router();

// 创建APP
const app = express();
// 定义路由
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/search', (req, res, next) => {
    search(req.query.q, (err, books) => {
        if (err) return next(err);
        res.render('search', { results: books, search: req.query.q });
    });
});

module.exports = router;