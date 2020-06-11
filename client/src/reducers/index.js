import { createStore } from 'redux'

let initialState = {
  loginState: sessionStorage.getItem('loginState') || -1,     // 登录状态 -1.未登录   0.游客登录   1. 用户登录
  userId: sessionStorage.getItem('userId') || '',
  salt: '123!@#',
  userInfo: null   // 用户信息对象
}

const mainReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'changeLoginState':
      sessionStorage.setItem('loginState', action.payload)
      return {
        ...state,
        loginState: action.payload
      }
    case 'getUserId':
      sessionStorage.setItem('userId', action.payload)
      return {
        ...state,
        userId: action.payload
      }
    case 'getUserInfo':
      return {
        ...state,
        userInfo: action.payload
      }
    default:
      return state
  }
}

const store = createStore(mainReducer)

export default store