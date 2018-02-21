import {WECHAT_LOGIN} from '../actions/actionTypes'
import fetch from 'isomorphic-fetch'

var baseUrl = '192.168.0.2:8080'

const wechatMiddleware = store => next => action => {
  if(action.type == WECHAT_LOGIN){
    var scope = "snsapi_userinfo",
    state = "_" + (+new Date());
    Wechat.auth(scope, state, function (response) {
    // you may use response.code to get the access token.
      alert(JSON.stringify(response));
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
        .then(res => {
          console.log(res.json())
        })
    }, function (reason) {
      alert("Failed: " + reason);
    });

  }
  else
    next(action)
}

export default wechatMiddleware
