const axios = require('axios')
const Qs = require('qs')

const mainPage = axios.create({
  baseURL: 'http://localhost:7458',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

mainPage.interceptors.response.use(config => {
  // 在发送请求之前做些什么
  if (config.status === 200) {
    return config.data
  }else {
    return config
  }
}, err => {
  // 对请求错误做些什么
  return Promise.reject(err);
});

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

// 用户重置密码
function reset(data) {
  return mainPage.post('/reset', Qs.stringify(data))
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
  reset,
  getUserInfo,
}