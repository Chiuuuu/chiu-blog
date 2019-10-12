import React from 'react'
import './login.css'
import { connect } from 'react-redux'
import { BrowserRouter as Router , Route, Link, Switch, Redirect } from 'react-router-dom';

import { login, register } from '../../request'
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

  static getDerivedStateFromProps(props, state) {
    return {
      ...props
    }
  }

  loginToBlog() {
    let { username, password } = this.state

    let emptyName = username === ''
    let emptyPass = password === ''

    // 校验是否有空选项
    if (!emptyName && !emptyPass) {
      login({
        username,
        password
      })
        .then(res => {
          window.localStorage.setItem('user', JSON.stringify(res))
        })
        .catch(err => console.log(err))
    }else {
      this.setState({
        emptyName,
        emptyPass
      })
      // let text = ''
      // if (!!emptyName && !emptyPass) {
      //   text = '请输入用户名'
      // }else if (!emptyName && !!emptyPass) {
      //   text = '请输入密码'
      // }else {
      //   text = '请输入用户名和密码'
      // }
      // TopModal({
      //   title: '抱歉',
      //   text: text,
      //   showCancel: false
      // })
    }
  }

  changeUsername(target) {
    let username = target.value.trim()
    let emptyName = false
    this.setState({
      username,
      emptyName
    })
  }
  changePassword(target) {
    let password = target.value.trim()
    let emptyPass = false
    password = MD5(password + this.props.salt)
    this.setState({
      password,
      emptyPass
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

  static getDerivedStateFromProps(props, state) {
    return {
      ...props
    }
  }

  // 根据传入的type值判断是哪个输入框的值
  changeInput(value, type) {
    value = value.trim()
    let salt = this.state.salt
    switch(type*1) {
      case 1:
        this.setState({
          username: value,
          emptyName: false
        })
        break;
      case 2:
        this.setState({
          password: MD5(value + salt),
          emptyPass: false
        })
        break;
      case 3:
        this.setState({
          confirmPassword: MD5(value + salt),
          emptyConfirm: false
        })
        break;
      case 4:
        this.setState({
          email: value,
          emptyEmail: false
        })
        break;
      case 5:
        this.setState({
          phone: value,
          emptyPhone: false
        })
        break;
      default: 
        return;
    }
  }

  // 点击注册
  registerBlog() {
    let { username, password, confirmPassword, email, phone } = this.state
    console.log(username, password, confirmPassword, email, phone)

    if (password !== confirmPassword) {
      return TopModal({
        text: '两次输入的密码不一致！'
      })
    }

    let emptyName = username === ''
    let emptyPass = password === ''
    let emptyConfirm = confirmPassword === ''
    let emptyEmail = email === ''
    let emptyPhone = phone === ''

    // 校验是否有空选项
    if (!emptyName && !emptyPass && !emptyConfirm && !emptyEmail && !emptyPhone) {
      register({ username, password, email, phone })
        .then(res => {
          window.localStorage.setItem('user', res)
        })
        .catch(err => console.log(err))

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
    let { emptyName, emptyPass, emptyConfirm, emptyEmail, emptyPhone } = this.state
    return (
      <div className="register-window">
        <input className={emptyName ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 1)} placeholder="请输入用户名" type="text"/>
        <input className={emptyPass ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 2)} placeholder="请输入密码" type="password"/>
        <input className={emptyConfirm ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 3)} placeholder="请确认密码" type="password"/>
        <input className={emptyEmail ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 4)} placeholder="请输入邮箱" type="text"/>
        <input className={emptyPhone ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 5)} placeholder="请输入手机号" type="text"/>
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
            <Redirect exact path="/" to="/login" />
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