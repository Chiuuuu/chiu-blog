import React from 'react'
import './Login.css'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { Route, Link, Redirect } from 'react-router-dom';
import { Input, Modal, message } from 'antd';
import PropTypes from 'prop-types';

import { login, register, reset } from '../../request'
import MD5 from 'js-md5'

class Login extends React.Component {

  static propTypes = {
    hideTab: PropTypes.func,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  
    this.state = {
      username: '',
      password: '',
      userId: '',
      salt: '',
      emptyName: false,
      emptyPass: false,
      hideTab: null
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
          if (res.code == 0) {
            const modal = Modal.warning()
            modal.update({
              content: '该用户还未注册',
              onOk() {
                modal.destroy()
              }
            })
          }else if (res.code == 1) {    // 成功登陆, 储存用户信息
            message.success('欢迎')
            window.localStorage.setItem('user', JSON.stringify({ username, password }))
            this.props.changeVisite(0)
            this.props.history.push('/main')
          }else if (res.code == 2) {   // 密码错误
            const modal = Modal.warning()
            modal.update({
              content: '密码错误！请重试',
              onOk() {
                modal.destroy()
              }
            })
          }
        })
        .catch(err => console.log(err))
    }else {
      this.setState({
        emptyName,
        emptyPass
      })
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
        <Input className={emptyName ? 'alert' : ''} onInput={({target}) => this.changeUsername(target)} placeholder="请输入用户名" type="text"/>
        <Input className={emptyPass ? 'alert' : ''} onInput={({target}) => this.changePassword(target)} placeholder="请输入密码" type="password"/>
        <div className="service">
          <Link to="/main" onClick={() => this.props.changeVisite(1)}>游客进入</Link>
          <Link to="/sign/reset" onClick={this.state.hideTab}>忘记密码?</Link>
        </div>
        <button className="sign-btn" onClick={() => this.loginToBlog()}>登录</button>
      </div>
    )
  }
}

Login = withRouter(Login)

const mapLoginStateToProps = (state) => {
  return {
    isVisitor: state.isVisitor
  }
}

const mapLoginDispatchToProps = (dispatch) => {
  return {
    changeVisite(type) {
      dispatch({
        type: 'visitorIn',
        payload: type
      })
    }
  }
}

Login = connect(mapLoginStateToProps, mapLoginDispatchToProps)(Login)

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

    if (password !== confirmPassword) {
      return Modal({
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
        <Input className={emptyName ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 1)} placeholder="请输入用户名" type="text"/>
        <Input className={emptyPass ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 2)} placeholder="请输入密码" type="password"/>
        <Input className={emptyConfirm ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 3)} placeholder="请确认密码" type="password"/>
        <Input className={emptyEmail ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 4)} placeholder="请输入邮箱" type="text"/>
        <Input className={emptyPhone ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 5)} placeholder="请输入手机号" type="text"/>
        <button className="sign-btn" onClick={() => this.registerBlog()}>注册</button>
      </div>
    )
  }
}
class Reset extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      phone: ''
    }
  
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  static getDerivedStateFromProps(props, state) {
    return {
      ...props
    }
  }

  backwards() {
    this.props.history.goBack()
    this.props.backwards()
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

  // 点击找回密码
  reset() {
    let { username, password, confirmPassword, email, phone } = this.state

    if (password !== confirmPassword) {
      return Modal.update({
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
      reset({ username, password, email, phone })
        .then(res => {
          if (res.code == 1) {
            message.success('找回密码成功！')
            this.backwards()
            window.localStorage.setItem('user', JSON.stringify({ username, password }))
          }else if (res.code == 0) {
            Modal.warning({
              content: res.msg
            })
          }
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
        <Input className={emptyName ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 1)} placeholder="请输入用户名" type="text"/>
        <Input className={emptyEmail ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 4)} placeholder="请输入邮箱" type="text"/>
        <Input className={emptyPhone ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 5)} placeholder="请输入手机号" type="text"/>
        <Input className={emptyPass ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 2)} placeholder="请输入新密码" type="password"/>
        <Input className={emptyConfirm ? 'alert' : ''} onInput={({target}) => this.changeInput(target.value, 3)} placeholder="请确认新密码" type="password"/>
        <div className="btn-group">
        <button className="confirm-btn" onClick={() => this.reset()}>重置</button>
        <button className="cancel-btn" onClick={() => this.backwards()}>取消</button>
        </div>
      </div>
    )
  }
}

Reset = withRouter(Reset)

class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      salt: '',
      isLogin: true,
      showTab: true
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      userId: props.userId,
      salt: props.salt
    }
  }

  hideTab = () => {
    this.setState({
      showTab: false
    })
  }

  backwards = () => {
    this.setState({
      showTab: true
    })
  }

  switchLogin(state) {
    this.setState({
      isLogin: !!state,
      showTab: true
    })
  }

  render() {
    let isLogin = this.state.isLogin

    return (
      <div className="sign-bg">
        <div className="sign-window">
          {
            this.state.showTab 
            ? <div className="sign-switch">
                <Link onClick={() => this.switchLogin(1)} className={isLogin ? 'active' : ''} to="/sign/login">账号登录</Link>
                <Link onClick={() => this.switchLogin(0)} className={!isLogin ? 'active' : ''} to="/sign/register">快速注册</Link>
              </div>
            : null
          }
          <Redirect exact path="/sign" to="/sign/login" />
          <Route exact path="/sign/login" render={ () => (<Login hideTab={this.hideTab} {...this.state} />) } />
          <Route exact path="/sign/register" render={ () => (<Register {...this.state} />) } />
          <Route exact path="/sign/reset" render={ () => (<Reset backwards={this.backwards} {...this.state} />) } />
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

LoginPage = connect(mapStateToProps)(LoginPage)

export default LoginPage