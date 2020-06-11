const db = require('./index').db
const mongoose = require('./index').mongoose
let Schema, Message
db.on('open', function() {
  Schema = new mongoose.Schema({
    userId: String, 
    title: String,
    content: String,
    isCheck: Number,
    createTime: Date
  });
  Message = mongoose.model('message', Schema);
})
const Router = require('koa-router');
const router = new Router();

router.post('/getMessageList', async(ctx, next) => {
  const userId = ctx.request.body.userId
  let list
  try {
    list = await Message.find({ userId })
    if (list.length < 5) {
      await Message.create({
        userId: userId,
        title: '我是新消息',
        content: '我是内容',
        isCheck: 0,
        createTime: +new Date()
      })
      list = await Message.find({ userId })
    }
    ctx.response.body = {
      code: 0,
      data: list
    }
  } catch (error) {
    ctx.response.body = {
      code: 1,
      msg: '系统错误'
    }
  }
})

router.post('/updateMessageCheck', async(ctx, next) => {
  const id = ctx.request.body.id
  let message
  try {
    message = await Message.findByIdAndUpdate(id, { isCheck: 1 }, { new: true })
    ctx.response.body = {
      code: 0,
      data: message
    }
  } catch (error) {
    ctx.response.body = {
      code: 1,
      msg: '系统错误'
    }
  }
})

module.exports = router