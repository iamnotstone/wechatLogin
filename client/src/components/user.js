import React from 'react'
import ItemBarButton from './itemBarButton'
import ItemBarContent from './itemBarContent'

class User extends React.Component{
  constructor(props){
    super(props)
    this.wechatLogin = this.wechatLogin.bind(this)
    this.nameClick = this.nameClick.bind(this)
  }

  wechatLogin(){

  }

  nameClick(){

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
      <ItemBarButton title = "微信登陆" onClick = {this.wechatLogin}/>

      <ItemBarContent label = "昵称" content = "足知足不知" onClick = {this.nameClick}/>
    </div>
  }
}

export default User
