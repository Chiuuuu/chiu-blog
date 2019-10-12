import { createStore } from 'redux'

let initialState = {
  userId: '',
  salt: '123!@#',
}

const mainReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'getUserId':
      return {
        ...state,
        userId: action.payload
      }
    default:
      return state
  }
}

const store = createStore(mainReducer)

export default store