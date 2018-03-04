import React from 'react'
//import ItemBarButton from './itemBarButton'
//import ItemBarContent from './itemBarContent'
import {ItemBarButton, ItemBarContent} from 'react-tuo-mobile-components'
import {wechatLogin, logout} from '../actions/index'
import {connect} from 'react-redux'

class UserComp extends React.Component{
  constructor(props){
    super(props)
    this.wechatLogin = this.wechatLogin.bind(this)
    this.logout = this.logout.bind(this)
  }


  wechatLogin(){
    this.props.wechatLogin()
  }

  logout(){
    this.props.logout()
  }

  render(){
    return <div
      style = {{
        backgroundColor: '#eaeaea',
        width: '100%',
        height: '100%',
        paddingTop: '8px'
      }}
    >
      {
        this.props.isAuth ? 
        <div>
          <ItemBarContent 
            label = {this.props.userInfo.nickName}
            content = {this.props.userInfo.headimgurl}
            contentType = 'icon'
          />
          <hr/>
          <ItemBarButton title = "注销登录" onClick = {this.logout} />
        </div> :
        <ItemBarButton title = "微信登陆" onClick = {this.wechatLogin} /> 
      }
    </div>
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.isAuth,
  userInfo: state.userInfo
})

const mapDispatchToProps = (dispatch) => ({
  wechatLogin: () => dispatch(wechatLogin()),
  logout: () => dispatch(logout())
})

const User = connect(mapStateToProps, mapDispatchToProps)(UserComp)

export default User
