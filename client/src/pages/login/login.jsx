import React from 'react'
import './login.css'
import { connect } from 'react-redux'
import { BrowserRouter as Router , Route, Link, Switch } from 'react-router-dom';

import { login } from '../../request'
import md5 from 'js-md5'

class Login extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      username: '',
      password: '',
      userId: '',
      salt: ''
    }
  
  }

  static getDerivedStateFromProps(props, state) {
    return {
      userId: props.userId,
      salt: props.salt
    }
  }

  loginToBlog() {
    let { username, password } = this.state
    console.log(username, password)
    // login({
    //   username,
    //   password
    // })
    //   .then(res => {
    //     window.localStorage.setItem('user', res)
    //   })
    //   .catch(err => console.log(err))
  }

  changeUsername(target) {
    let username = target.value.trim()
    this.setState({
      username
    })
  }
  changePassword(target) {
    let password = target.value.trim()
    password = md5(password + this.state.salt)
    this.setState({
      password
    })
  }

  render() {
    return (
      <div className="sign-bg">
        <div className="login-window">
          <h3>欢迎登陆</h3>
          <input onInput={({target}) => this.changeUsername(target)} placeholder="请输入用户名" type="text"/>
          <input onInput={({target}) => this.changePassword(target)} placeholder="请输入密码" type="password"/>
          <div className="service">
            <Link to="/register">点击注册</Link>
            <Link to="/reset">忘记密码?</Link>
          </div>
          <button className="sign-btn" onClick={() => this.loginToBlog()}>登录</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    salt: state.salt
  }
}

Login = connect(mapStateToProps)(Login)

class Register extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      phone: '',
    }
  
  }

  // 根据传入的type值判断是哪个输入框的值
  changeInput(value, type) {
    value = value.trim()
    switch(type) {
      case 'username':
        this.setState({
          username: value
        })
        break;
      case 'password':
        this.setState({
          password: value
        })
        break;
      case 'confirmPassword':
        this.setState({
          confirmPassword: value
        })
        break;
      case 'email':
        this.setState({
          email: value
        })
        break;
      case 'phone':
        this.setState({
          phone: value
        })
        break;
      default: 
        return;
    }
  }

  render() {
    return (
      <div className="sign-bg">
        <div className="register-window">
          <h3>欢迎注册</h3>
          <input onInput={({target}) => this.changeInput(target.value, 'username')} placeholder="请输入用户名" type="text"/>
          <input onInput={({target}) => this.changeInput(target.value, 'password')} placeholder="请输入密码" type="password"/>
          <input onInput={({target}) => this.changeInput(target.value, 'confirmPassword')} placeholder="请确认密码" type="password"/>
          <input onInput={({target}) => this.changeInput(target.value, 'email')} placeholder="请输入邮箱" type="text"/>
          <input onInput={({target}) => this.changeInput(target.value, 'phone')} placeholder="请输入手机号" type="text"/>
          <button className="sign-btn" onClick={() => this.registerBlog()}>注册</button>
        </div>
      </div>
    )
  }
}

class Reset extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/reset" component={ Reset } />
      </Router>
    )
  }
}

export default LoginPage