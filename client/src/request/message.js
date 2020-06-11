import { requestGet, requestPost } from './index'

// 获取消息列表
export function getMessageList(userId) {
  return requestPost('/getMessageList', { userId })
}

// 获取消息列表
export function updateMessageCheck(id) {
  return requestPost('/updateMessageCheck', { id })
}