import { createStore } from 'redux'

let initialState = {
  userId: '',
  salt: '123!@#',
  isVisitor: sessionStorage.getItem('isVisitor') ? sessionStorage.getItem('isVisitor') : 0
}

const mainReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'getUserId':
      return {
        ...state,
        userId: action.payload
      }
    case 'visitorIn':
      sessionStorage.setItem('isVisitor', action.payload)
      return {
        ...state,
        isVisitor: action.payload
      }
    default:
      return state
  }
}

const store = createStore(mainReducer)

export default store