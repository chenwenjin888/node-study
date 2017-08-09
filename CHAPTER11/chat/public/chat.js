let socket = io('http://localhost:3001'),
    input = document.getElementById('input');

socket.on('connect', () => {
    // 通过join事件发送昵称
    socket.emit('join', prompt('你的昵称？'));

    // 显示聊天窗口
    document.getElementById('chat').style.display = 'block';
    input.focus();

    socket.on('announcement', (msg) => {
        let li = document.createElement('li');
        li.className = 'announcement';
        li.innerHTML = msg;
        document.getElementById('message').appendChild(li);
    });
});

function addMessage(from, text) {
    let li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = '<b>' + from + '</b>: ' + text;
    document.getElementById('message').appendChild(li);
    return li;
}

function sendMsg() {
    let li = addMessage('我', input.value);
    // 发送文本内容
    socket.emit('text', input.value, date=>{
        li.style.color = 'blue';
        li.title = date;
    });

    //重置文本框
    input.value = '';
    input.focus();

}
function getKey() {
    let e = window.event;
    if (e.keyCode == 13) {
        sendMsg();
    }
}

socket.on('text', addMessage);