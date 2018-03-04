import {WECHAT_LOGIN} from '../actions/actionTypes'
import fetch from 'isomorphic-fetch'
import {loginSuccess} from '../actions/index'

var baseUrl = 'http://192.168.0.2:8001'

const wechatMiddleware = store => next => action => {
  if(action.type == WECHAT_LOGIN){
    var scope = "snsapi_userinfo",
    state = "_" + (+new Date());
    Wechat.auth(scope, state, function (response) {
    // you may use response.code to get the access token.
      console.log('respose:', response)
      //fetch get /auth/wechat/callback code ...
      let config = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }
      let url = baseUrl + '/auth/wechat/callback?' + 'code=' + response.code 
        + '&state=' + state
      fetch(url, config)
        .then(res => res.json())
        .then(json => {
          if(json.loginResult === true)
            store.dispatch(loginSuccess(json.userInfo))
        })
    }, function (reason) {
      alert('failed')
    });
  }
  else
    next(action)
}

export default wechatMiddleware
