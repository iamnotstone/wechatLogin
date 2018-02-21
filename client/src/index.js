import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import User from './components/user'
import wechatMiddleware from './middleware/wechatMiddleware'

var store = createStore(reducer, {isAuth: false}, 
    applyMiddleware(wechatMiddleware)
  )

render(
  <Provider store = {store}>
    <User />
  </Provider>,
  document.getElementById('root')
)
/*
*/
