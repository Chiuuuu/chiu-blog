const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/data')
const db = mongoose.connection
db.on('error', console.error.bind(console, '连接数据库失败'));

let Schema, User, Article
db.on('open', function() {
  Schema = new mongoose.Schema({
    username: String, 
    password: String,
    nickname: String,
    email: String,
    phone: String,
  });
  User = mongoose.model('users', Schema);
  Article = mongoose.model('articles', Schema);
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
    ctx.response.type = 'application/json';
    if (user.length > 0) {
      if (user[0].password == password) {
        ctx.response.body = {
          code: 1,
          msg: 'success',
          data: {
            userInfo: user[0]
          }
        };
      }else {
        ctx.response.body = {
          code: 2,
          msg: '密码错误'
        };
      }
    }else {
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
  let { username, password, nickname, email, phone } = body
  ctx.response.type = 'application/json'

  // 搜索数据库是否已经有该用户名
  let users = null
  try {
    users = await User.find({'username': username})
    users = await User.find({'nickname': nickname})
    if (users.length > 1 || (users[0] && users[0].username == username)) {
      ctx.response.body = { code: 0, msg: '该用户名已被注册！' }
      return
    }
    if (users.length > 1 || (users[0] && users[0].nickname == nickname)) {
      ctx.response.body = { code: 0, msg: '该昵称已存在！' }
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
    doc = await User.create({ username, password, nickname, email, phone })
  } catch (error) {
    console.log(error)
    ctx.response.status = 500
    return next()
  }
  ctx.response.body = { code: 1, msg: 'success', data: doc }
})

// 重置密码接口
router.post('/reset', async(ctx, next) => {
  let body = ctx.request.body
  let { username, password, email, phone } = body
  ctx.response.type = 'application/json'

  // 搜索数据库是否已经有该用户名
  let users = null
  try {
    users = await User.findOneAndUpdate({ username, email, phone }, { password })
    if (!!users) {
      ctx.response.body = { code: 1, msg: 'success', data: users }
    }else {
      ctx.response.body = { code: 0, msg: '手机及邮箱验证失败', data: {} }
    }
  } catch (error) {
    console.log(error)
    ctx.response.status = 500
    return next()
  }
})


module.exports = router