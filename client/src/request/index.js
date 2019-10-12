const axios = require('axios')
const Qs = require('qs')

const mainPage = axios.create({
  baseURL: 'http://172.16.23.92:8888',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 封装get方法url
function formatGetUrl(url, data) {
  url = url + '?'
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      url += `${key}=${element}&`
    }
  }
  return url.slice(0,-1)
}

// 用户注册
function register(data) {
  return mainPage.post('/register', Qs.stringify(data))
}

// 用户登录
function login(data) {
  return mainPage.post('/login', Qs.stringify(data))
}

// 获取用户信息
function getUserInfo(data) {
  return mainPage.get(formatGetUrl('/getUserInfo', Qs.stringify(data)))
}

export {
  register,
  login,
  getUserInfo,
}