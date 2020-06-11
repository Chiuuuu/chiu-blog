import axios  from 'axios'
import Qs from 'qs'
import { message } from 'antd'
import jwt from 'jwt-simple'
import store from '../reducers'

const service = axios.create({
  baseURL: 'http://118.25.183.85:7458',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
service.interceptors.request.use(
  config => {
    const path = config.url
    if (!/(\/login)|(\/register)|(\/reset)/.test(path)) {
      const tokenInfo = window.localStorage.getItem('tokenInfo')
      if (tokenInfo) {
        config.headers['Authorization'] = tokenInfo
      }
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

// 获取token方法
function getToken() {
  console.log(store)
  return service({
    method: 'get',
    url: '/getToken',
    params: {
      userId: store.getState().userId
    }
  })
}

async function saveToken() {
  let res
  try {
    res = await getToken()
    if (res.code === 0) {
      window.localStorage.setItem('tokenInfo', res.tokenInfo)
    } else {
      return Promise.reject(res.msg)
    }
  } catch (error) {
    console.log('获取token失败:', error)
    return Promise.reject(error)
  }
}

// token初始化
async function handleToken() {
  let tokenInfo = window.localStorage.getItem('tokenInfo')
  if (tokenInfo) {
    tokenInfo = jwt.decode(tokenInfo, 'chiuuuuuu')
    if (tokenInfo.express) { // 获取过token
      if (Number(tokenInfo.express) - (+new Date()) <= 1000 * 60 * 5 && Number(tokenInfo.express) - (+new Date()) > 0) { // token即将过期, 重新获取
        return saveToken()
      } else if (Number(tokenInfo.express) < (+new Date())) {
        message('您太久没进行操作了, 请重新登录')
        window.history.replaceState('/sign')
      }
    }
    return Promise.resolve(tokenInfo)
  } else { // 初始化
    return saveToken()
  }
}

function requestGet(url, params, headers = {}) {
  if (/(\/login)|(\/register)|(\/reset)/.test(url)) {
    return service({
      method: 'get',
      url,
      headers,
      params
    })
  }
  return handleToken()
          .then(res => {
            return service({
              method: 'get',
              url,
              headers,
              params
            })
          })
          .catch(err => {
            // message.error('身份验证失败')
            console.log('----token缺失----', err)
          })
}

function requestPost(url, data, headers = {}) {
  if (/(\/login)|(\/register)|(\/reset)/.test(url)) {
    return service({
      method: 'post',
      transformRequest: [function(data) {
        // 对 data 进行任意转换处理(针对post请求,需要手动stringify参数)
        return Qs.stringify(data)
      }],
      url,
      headers,
      data,
    })
  }
  return handleToken()
          .then(res => {
            return service({
              method: 'post',
              transformRequest: [function(data) {
                // 对 data 进行任意转换处理(针对post请求,需要手动stringify参数)
                return Qs.stringify(data)
              }],
              url,
              data,
            })
          })
          .catch(err => {
            // message.error('身份验证失败')
            console.log('----token缺失----', err)
          })
}

export {
  service,
  requestGet,
  requestPost
}
