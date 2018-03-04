import * as types from './actionTypes'

export const wechatLogin = () => ({
  type: types.WECHAT_LOGIN
})

export const loginSuccess = (userInfo) => ({
  type: types.LOGIN_SUCCESS,
  userInfo
})

export const logout = () => ({
  type: types.LOGOUT
})
