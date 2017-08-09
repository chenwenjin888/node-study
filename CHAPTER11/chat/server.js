// 依赖模块
const express = require('express'),
    app = express(),// 创建app
    server = require('http').Server(app),
    bodyParser = require('body-parser'),
    io = require('socket.io')(server);

// 加载express中间件
app.use(express.static('public'));// 静态资源
app.use(bodyParser.json()); // 解析 application/json
app.use(bodyParser.urlencoded({ extended: true })); // 解析 application/x-www-form-urlencoded

// 监听
server.listen(3001);

// 连接监听
io.on('connection', (socket)=> {
    console.log('用户接入');

    socket.on('join', (name) => {
        console.log('%s 加入聊天室', name);
        socket.nickname = name;
        socket.broadcast.emit('announcement', name + '加入聊天室。')// broadcast 广播
    })

    socket.on('text', (msg, fn) => {
        socket.broadcast.emit('text', socket.nickname, msg);
        // 确认消息已接收
        fn(Date.now());
    })
})