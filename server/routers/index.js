const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/data')
const db = mongoose.connection
db.on('error', console.error.bind(console, '连接数据库失败'));

let Schema, User
db.on('open', function() {
  Schema = new mongoose.Schema({
    username: String, 
    password: String,
    email: String,
    phone: String,
  });
  User = mongoose.model('users', Schema);
})

const Router = require('koa-router');
const router = new Router();


// 登录接口
router.post('/login', async(ctx, next) => {
  let body = ctx.request.body
  let { username, password } = body

  // code: 0 未注册, 1 成功, 2 密码错误
  let user = null 
  try {
    user = await User.find({'username': username})
    if (user.length > 0) {
      console.log(user, password)
      if (user.password == password) {
        ctx.response.type = 'application/json';
        ctx.response.body = {
          code: 1,
          msg: 'success'
        };
      }else {
        ctx.response.type = 'application/json';
        ctx.response.body = {
          code: 2,
          msg: '密码错误'
        };
      }
    }else {
      ctx.response.type = 'application/json';
        ctx.response.body = {
          code: 0,
          msg: '请先注册账户'
        };
    }
  } catch (error) {
    console.log(error)
    ctx.response.status = 500
    return next()
  }
})

// 注册接口
router.post('/register', async(ctx, next) => {
  let body = ctx.request.body
  let { username, password, email, phone } = body

  // 搜索数据库是否已经有该用户名
  let users = null
  try {
    users = await User.find({'username': username})
    if (users.length > 1 || (users[0] && users[0].username == username)) {
      ctx.response.type = 'application/json'
      ctx.response.body = { code: 0, msg: '该用户名已被注册！' }
      return
    }
  } catch (error) {
    console.log(error)
    ctx.response.status = 500
    return next()
  }

  // 注册新用户
  let doc = null
  try {
    doc = await User.create({ username, password, email, phone })
  } catch (error) {
    console.log(error)
    ctx.response.status = 500
    return next()
  }
  ctx.response.type = 'application/json'
  ctx.response.body = { code: 1, msg: 'success', data: doc }
})

module.exports = router