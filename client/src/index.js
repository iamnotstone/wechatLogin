import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import User from './components/user'

var store = createStore(reducer, {isAuth: false})

render(
  <Provider store = {store}>
    <User />
  </Provider>,
  document.getElementById('root')
)
/*
*/
