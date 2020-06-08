import { createStore } from 'redux'

let initialState = {
  loginState: localStorage.getItem('loginState') ? localStorage.getItem('loginState') : -1,     // 登录状态 -1.未登录   0.游客登录   1. 用户登录
  userId: '',
  salt: '123!@#',
  userInfo: !!sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : { nickname: '' }   // 用户信息对象
}

const mainReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'changeLoginState':
      localStorage.setItem('loginState', action.payload)
      return {
        ...state,
        loginState: action.payload
      }
    case 'getUserId':
      return {
        ...state,
        userId: action.payload
      }
    case 'getUserInfo':
      sessionStorage.setItem('userInfo', action.payload)
      return {
        ...state,
        userInfo: JSON.parse(action.payload)
      }
    default:
      return state
  }
}

const store = createStore(mainReducer)

export default store