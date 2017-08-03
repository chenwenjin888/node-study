// 引入模块
const express = require('express'),
    // 日志
    logger = require('morgan'),
    // 路由
    routes = require('./routes/routes');

// 创建APP
const app = express();

// 配置项
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });

// 输出日志
app.use(logger('dev'));

// 配置路由
app.use('/', routes);
app.use('/search', routes);




// 监听
app.listen(3001);