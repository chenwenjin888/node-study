// 引入模块
const express = require('express'),
    // 数据库
    mongoose = require('mongoose'),
    // 解析器
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    // 日志
    logger = require('morgan');

// 创建APP
const app = express();

// 加载express中间件
// app.use(express.static('public'));// 静态资源
app.use(bodyParser.json()); // 解析 application/json
app.use(bodyParser.urlencoded({ extended: true })); // 解析 application/x-www-form-urlencoded
app.use(cookieParser());
app.use(session({ secret: 'my secret' }));

// 配置项
app.set('view engine', 'jade');
// app.set('views', __dirname + '/views');
// app.set('view options', { layout: false });

// 输出日志
app.use(logger('dev'));

// 认证中间件
app.use((req, res, next) => {
    console.log('认证中间件: req==', req.session);
    if (req.session.loggedIn) {
        res.locals.authenticated = true;
        User.findById(req.session.loggedIn, function (err, doc) {
            if (err) return next(err);
            res.locals.me = doc;
            next();
        });
    } else {
        res.locals.authenticated = false;
        next();
    }
});


// 默认路由
app.get('/', (req, res) => {
    res.render('index');
});

// 登陆路由
app.post('/login', (req, res) => {
    User.findOne({ email: req.body.user.email, password: req.body.user.password }, (err, doc) => {
        if (err) return next(err);
        if (!doc) return res.send('<p>User not found. Go back and try again');
        req.session.loggedIn = doc._id.toString();
        res.redirect('/');
    });
});
app.get('/login/:signupEmail', (req, res) => {
    res.render('login', { signupEmail: req.params.signupEmail })
});
app.get('/login', (req, res) => {
    res.render('login')
});

// 注册路由(页面)
app.get('/signup', (req, res) => {
    res.render('signup')
});
// 注册路由(form)
app.post('/signup', (req, res, next) => {
    console.log('参数', req.body.user);

    // 插入一条用户信息
    let user = new User(req.body.user);
    user.save((err) => {
        if (err) return next(err);
        res.redirect('/login/' + user.email);
    });
})

// 退出
app.get('/logout', (req, res) => {
    req.session.loggedIn = null;
    res.redirect('/');
});

// 监听
app.listen(3001, () => {
    console.log('端口监听：3001');
});

// 链接数据库
mongoose.connect('mongodb://127.0.0.1/my-website');

// 定义用户模型
var Schema = mongoose.Schema,
    User = mongoose.model('User', new Schema({
        name: String,
        email: { type: String, unique: true },
        password: { type: String, index: true }
    }));