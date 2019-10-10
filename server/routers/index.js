const Router = require('koa-router');

const router = new Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/data')
const db = mongoose.connection
db.on('error', console.error.bind(console, '连接数据库失败'));

let Schema, User
db.on('open', function() {
  Schema = new mongoose.Schema({
      name: String, 
      password:String
    }
  );
  User = mongoose.model('users', Schema);
})

router.get('/login/:name', async(ctx, next) => {
  ctx.response.type = 'text/html';
  ctx.response.body = `<h1>Hello, ${ctx.params.name}</h1>`;
})

module.exports = router