import { requestGet, requestPost } from './index'

// 登录接口
export function login(data) {
  return requestPost('/login', data)
}
// 用户注册
export function register(data) {
  return requestPost('/register', data)
}

// 用户重置密码
export function reset(data) {
  return requestPost('/reset', data)
}

// 获取用户信息
export function getUserInfo(data) {
  return requestGet('/getUserInfo', data)
}

// 修改个人信息
export function changeUserInfo(data) {
  return requestPost('/changeUserInfo', data)
}