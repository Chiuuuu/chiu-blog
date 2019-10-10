const axios = require('axios')

const mainPage = axios.create({
  baseURL: '/',
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
  return mainPage.post('/register', data)
}

// 用户登录
function login(data) {
  return mainPage.post('/login', data)
}

// 获取用户信息
function getUserInfo(data) {
  return mainPage.get(formatGetUrl('/getUserInfo', data))
}

export {
  register,
  login,
  getUserInfo,
}