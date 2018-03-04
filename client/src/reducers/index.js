import * as types from '../actions/actionTypes'

const reducer = (state, action) => {
  switch(action.type){
    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {isAuth: true, userInfo: action.userInfo})

    case types.LOGOUT:
      return Object.assign({}, state, {isAuth: false, userInfo: {}})

    default:
      return state
  }
}

export default reducer
