var net = require('net'),
    count = 0, //people total
    users = {};
var server = net.createServer(function (conn) {
    conn.setEncoding('utf8'); //设置读取的文字编码
    console.log('新用户接入！');
    var nickname;
    count++; //记录连接终端数
    conn.on('data', function (data) {
        data = data.replace('\r\n', '');//删除回车符
        console.log(data);
        if (!nickname) { //判断昵称是否存在
            if (users[data]) {
                conn.write('\033[93m>昵称已经存在,请重试:\033[39m');
                return;
            } else {
                nickname = data;
                users[nickname] = conn;
                for (var i in users) {
                    users[i].write('\033[90m >' + nickname + ' 加入聊天室 \033[39m\r\n');
                }
            }
        } else {
            for (var i  in users) {
                if (i != nickname) {
                    users[i].write('\033[94m> ' + nickname + ' 说: \033[39m' + data + '\r\n');
                }
            }
        }
    });
    conn.on('close', function () {
        count--;
        // 给其他用户发送当前人退出信息
        for (var i  in users) {
            if (i != nickname) {
                console.log(i + " --- "+nickname);
                console.log(i == nickname);
                users[i].write('\033[94m> ' + nickname + ' 退出聊天室。 \033[39m\r\n');
            }
        }
        delete users[nickname];  //删除退出昵称
    });

    conn.write('\r\n>欢迎来到node聊天室~~~'
        + '\r\n > 共有' + count + '用户在线.'
        + '\r\n > 请输入您的昵称 : '
    );


});

server.listen(4000, function (conn) {
    console.log('服务监听 *:4000')
});