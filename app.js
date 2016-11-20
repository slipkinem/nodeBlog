/**
 * Created by slipkinem on 2016/11/20.
 */

/**
 * 注意：中间件的加载顺序很重要。如上面设置静态文件目录的中间件应该放到 routes(app) 之前加载，
 * 这样静态文件的请求就不会落到业务逻辑的路由里；flash 中间件应该放到 session 中间件之后加载，
 * 因为 flash 是基于 session 的。
 */

var path = require('path'),
    express = require('express'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    config = require('config-lite'),
    routes = require('./routes'),
    pkg = require('./package.json');

var app = express();

//设置模版目录
app.set('views',path.join(__dirname,'views'));
//ejs
app.set('view engine','ejs');

//静态文件目录
app.use(express.static(path.join(__dirname,'public')));
//session 中间件
app.use(session({
    name: config.session.key, //设置cookie中保存session ID 的字段
    secret: config.session.secret, //通过设置secret来计算hash存在cookie中，让产生的signecCookie 防止篡改
    cookie: {
        maxAge:config.session.maxAge //设置cookie时效
    },
    store: new MongoStore({ //存session到mongodb
        url:config.mongodb
    })
}));
//flash 中间层
app.use(flash());

// 设置模板全局常量
app.locals.blog = {
    title:pkg.name,
    description:pkg.description
};


// 添加模板必须的三个变量
app.use((req,res,next) => {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

//路由
routes(app);

app.listen(config.port,function () {
    console.log(`${pkg.name} listening on port ${config.port}`);
});
