const express = require('express'),
    wsio = require('websocket.io');

const app = express(),
    server = wsio.attach(app);

app.use(express.static('public'));

server.on('connection', socket => {
    socket.on('message', msg => {
        console.log(' \033[96mgot:\033[39m' + msg);
        socket.send('pong');
    });
});

app.listen(3001);