const Koa = require('koa');
const KoaBodyParser = require('koa-bodyparser');
const KoaStatic = require('koa-static');

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
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(KoaBodyParser());
app.use(KoaStatic(path.join(__dirname, '/client/public/index.html')));

const router = require('./routers');
app.use(router.routes());
app.use(router.allowedMethods());

// 在端口7458监听:
app.listen(7458);
console.log('app started at port 7458...');