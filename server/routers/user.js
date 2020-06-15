const db = require('./index').db
const mongoose = require('./index').mongoose
let Schema, User
db.on('open', function() {
  Schema = new mongoose.Schema({
    username: String, 
    password: String,
    nickname: String,
    gender: Number,
    email: String,
    phone: String,
  });
  User = mongoose.model('users', Schema);
})
const Router = require('koa-router');
const router = new Router();
const jwt = require('jwt-simple');
const secret = require('../authorize.js').jwtSecret

// 发放token
router.get('/getToken', async(ctx, next) => {
  let userId = ctx.query.userId
  console.log(userId)
  try {
    user = await User.find({'_id': userId})
    
    ctx.response.body = {
      code: 0,
      tokenInfo: jwt.encode({
        username: user[0].username,
        phone: user[0].phone,
        // tkoen设置一天过期
        express: +new Date() + 24 * 60 * 60 * 1000
      }, secret)
    }
  } catch (error) {
    ctx.response.body = {
      code: 1,
      msg: '未找到该用户'
    }
  }
  next()
})

// 登录接口
router.post('/login', async(ctx, next) => {
  let body = ctx.request.body
  console.log(body)
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
            userInfo: {
              id: user[0]._id,
              email: user[0].email,
              nickname: user[0].nickname,
              phone: user[0].phone,
              gender: user[0].gender,
              username: user[0].username
            },
            tokenInfo: jwt.encode({
              username: user[0].username,
              phone: user[0].phone,
              // token设置一天过期
              express: +new Date() + 24 * 60 * 60 * 1000
            }, secret)
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
  let { username, password, gender, nickname, email = '', phone } = body
  ctx.response.type = 'application/json'

  // 搜索数据库是否已经有该用户名
  let users = null
  try {
    users = await User.find({'username': username, 'nickname': nickname})
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
    doc = await User.create({ username, password, gender, nickname, email, phone })
  } catch (error) {
    console.log(error)
    ctx.response.status = 500
    return next()
  }
  ctx.response.body = { code: 1, msg: 'success' }
})

// 重置密码接口
router.post('/reset', async(ctx, next) => {
  let body = ctx.request.body
  let { username, password, phone } = body
  ctx.response.type = 'application/json'

  // 搜索数据库是否已经有该用户名
  let users = null
  try {
    users = await User.findOneAndUpdate({ username, phone }, { password }, { new: true })
    if (!!users) {
      ctx.response.body = { code: 1, msg: 'success' }
    }else {
      ctx.response.body = { code: 0, msg: '手机验证失败', data: {} }
    }
  } catch (error) {
    console.log(error)
    ctx.response.status = 500
    return next()
  }
})

// 修改用户信息
router.post('/changeUserInfo', async(ctx, next) => {
  const id = ctx.request.body.userId
  ctx.response.status = 200
  ctx.response.type = 'application/json';

  let user
  try {
    user = await User.findByIdAndUpdate(id, ctx.request.body, { new: true })
    if (user) {
      ctx.response.body = {
        code: 0,
        data: user
      }
    } else {
      ctx.response.body = {
        code: 1,
        msg: '无该用户信息'
      }
    }
  } catch(err) {
    ctx.response.body = {
      code: 1,
      msg: '系统错误'
    }
  }
})

// 获取用户信息
router.get('/getUserInfo', async(ctx, next) => {
  const id = ctx.request.query.id
  ctx.response.status = 200
  ctx.response.type = 'application/json';

  let user
  try {
    user = await User.find({'_id': id})
    ctx.response.body = {
      code: 0,
      data: user[0]
    }
  } catch(err) {
    console.log(err)
    ctx.response.body = {
      code: 1,
      msg: '无该用户信息'
    }
  }
})

module.exports = router