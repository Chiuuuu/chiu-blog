import React from 'react'
import './login.css'
import { connect } from 'react-redux'
import { BrowserRouter as Router , Route, Link } from 'react-router-dom';

import { register } from '../../request'
import MD5 from 'js-md5'

import TopModal from '../../components/topModal'

class Login extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      username: '',
      password: '',
      userId: '',
      salt: '',
      emptyName: false,
      emptyPass: false,
    }
  
  }

  loginToBlog() {
    let { username, password } = this.state
    console.log(username, password)

    let emptyName = username === ''
    let emptyPass = password === ''

    // 校验是否有空选项
    if (!emptyName && !emptyPass) {
      // login({
      //   username,
      //   password
      // })
      //   .then(res => {
      //     window.localStorage.setItem('user', res)
      //   })
      //   .catch(err => console.log(err))
    }else {
      this.setState({
        emptyName,
        emptyPass
      })
      let text = ''
      if (!!emptyName && !emptyPass) {
        text = '请输入用户名'
      }else if (!emptyName && !!emptyPass) {
        text = '请输入密码'
      }else {
        text = '请输入用户名和密码'
      }
      TopModal({
        title: '抱歉',
        text: text,
        showCancel: false
      })
    }
  }

  changeUsername(target) {
    let username = target.value.trim()
    this.setState({
      username
    })
  }
  changePassword(target) {
    let password = target.value.trim()
    password = MD5(password + this.props.salt)
    this.setState({
      password
    })
  }

  render() {
    let { emptyName, emptyPass } = this.state
    return (
      <div className="login-window">
        <input className={emptyName ? 'alert' : ''} onInput={({target}) => this.changeUsername(target)} placeholder="请输入用户名" type="text"/>
        <input className={emptyPass ? 'alert' : ''} onInput={({target}) => this.changePassword(target)} placeholder="请输入密码" type="password"/>
        <div className="service">
          <Link to="/reset">忘记密码?</Link>
        </div>
        <button className="sign-btn" onClick={() => this.loginToBlog()}>登录</button>
      </div>
    )
  }
}

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
          password: MD5(value)
        })
        break;
      case 'confirmPassword':
        this.setState({
          confirmPassword: MD5(value)
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

  // 点击注册
  registerBlog() {
    let { username, password, confirmPassword, email, phone } = this.state

    if (password !== confirmPassword) {

    }

    let emptyName = username === ''
    let emptyPass = password === ''
    let emptyConfirm = confirmPassword === ''
    let emptyEmail = email === ''
    let emptyPhone = phone === ''

    // 校验是否有空选项
    if (!emptyName && !emptyPass && !emptyConfirm && !emptyEmail && !emptyPhone) {
      // login({
      //   username,
      //   password
      // })
      //   .then(res => {
      //     window.localStorage.setItem('user', res)
      //   })
      //   .catch(err => console.log(err))

    }else {
      this.setState({
        emptyName,
        emptyPass,
        emptyConfirm,
        emptyEmail,
        emptyPhone
      })
    }
  }

  render() {
    return (
      <div className="register-window">
        <input onInput={({target}) => this.changeInput(target.value, 'username')} placeholder="请输入用户名" type="text"/>
        <input onInput={({target}) => this.changeInput(target.value, 'password')} placeholder="请输入密码" type="password"/>
        <input onInput={({target}) => this.changeInput(target.value, 'confirmPassword')} placeholder="请确认密码" type="password"/>
        <input onInput={({target}) => this.changeInput(target.value, 'email')} placeholder="请输入邮箱" type="text"/>
        <input onInput={({target}) => this.changeInput(target.value, 'phone')} placeholder="请输入手机号" type="text"/>
        <button className="sign-btn" onClick={() => this.registerBlog()}>注册</button>
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
      userId: '',
      salt: '',
      isLogin: true
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      userId: props.userId,
      salt: props.salt
    }
  }

  switchLogin(state) {
    this.setState({
      isLogin: !!state
    })
  }

  render() {
    let isLogin = this.state.isLogin

    return (
      <div className="sign-bg">
        <Router>
          <div className="sign-window">
            <div className="sign-switch">
              <Link onClick={() => this.switchLogin(1)} className={isLogin ? 'active' : ''} to="/login">账号登录</Link>
              <Link onClick={() => this.switchLogin(0)} className={!isLogin ? 'active' : ''} to="/register">快速注册</Link>
            </div>
            <Route path="/login" render={ () => (<Login {...this.state} />) } />
            <Route path="/register" render={ () => (<Register {...this.state} />) } />
            <Route path="/reset" render={ () => (<Reset {...this.state} />) } />
          </div>
        </Router>
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

LoginPage = connect(mapStateToProps)(LoginPage)

export default LoginPage