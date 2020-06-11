const Koa = require('koa');
const KoaBodyParser = require('koa-bodyparser');
const KoaStatic = require('koa-static');
const koaJwt = require('koa-jwt')

const path = require('path');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
// 跨域处理
const cors = require('koa2-cors');
app.use(cors({
    origin: function (ctx) {
      return ctx.header.origin;
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(KoaBodyParser());
app.use(KoaStatic(path.join(__dirname, '/client/public/index.html')));

// 用户模块接口
const userRouter = require('./routers/user');
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

// 消息模块接口
const messageRouter = require('./routers/message');
app.use(messageRouter.routes());
app.use(messageRouter.allowedMethods());

const secret = require('./authorize.js').jwtSecret
app.use(koaJwt({ secret }).unless({
  path: [/^\/getToken/, /^\/login/, /^\/reset/, /^\/register/]
}));

// 在端口7458监听:
app.listen(7458);
console.log('app started at port 7458...');