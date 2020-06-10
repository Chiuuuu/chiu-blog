import React from 'react'
import './Login.css'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { Form, Input, Modal, message } from 'antd';
import PropTypes from 'prop-types';

import { login } from '../../request'
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
      userId: '',
      salt: '',
      emptyName: false,
      emptyPass: false,
      hideTab: null
    }

    this.formRef = React.createRef()
  
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...props
    }
  }

  componentDidMount() {
    this.props.switchEnterFunction(this.loginToBlog.bind(this))
  }

  loginToBlog = async() => {
    let salt = this.state.salt
    try {
      await this.formRef.current.validateFields()
    } catch (error) {
      return console.log('注册表单校验不通过: ', error)
    }
    const params = this.formRef.current.getFieldsValue()
    params.password = MD5(params.password + salt)
    login(params)
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
          window.localStorage.setItem('user', JSON.stringify(params))
          this.props.changeLoginState(1)
          this.props.getUserInfo(JSON.stringify(res.data))
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
  }

  render() {
    return (
      <Form className="login-window" ref={this.formRef}>
        <Form.Item
          name="username" 
          label="用户名"
          rules={[
            () => ({
              validator(rule, value) {
                if (value !== '') {
                  return Promise.resolve();
                }
                return Promise.reject('请输入用户名');
              },
            })
          ]}
        >
          <Input placeholder="请输入用户名" type="text"/>
        </Form.Item>
        <Form.Item
          name="password" 
          label="密码"
          rules={[
            () => ({
              validator(rule, value) {
                if (value !== '') {
                  return Promise.resolve();
                }
                return Promise.reject('请输入密码');
              },
            })
        ]}
        >
          <Input placeholder="请输入密码" type="password"/>
        </Form.Item>
        <div className="service">
          <Link to="/main" onClick={() => this.props.changeLoginState(0)}>游客进入</Link>
          <Link to="/sign/reset" onClick={this.state.hideTab}>忘记密码?</Link>
        </div>
        <button className="sign-btn" onClick={() => this.loginToBlog()}>登录</button>
      </Form>
    )
  }
}

const mapLoginStateToProps = (state) => {
  return {
    loginState: state.loginState
  }
}

const mapLoginDispatchToProps = (dispatch) => {
  return {
    changeLoginState(type) {
      dispatch({
        type: 'changeLoginState',
        payload: type
      })
    },
    getUserInfo(data) {
      dispatch({
        type: 'getUserInfo',
        payload: data
      })
    }
  }
}
Login = connect(mapLoginStateToProps, mapLoginDispatchToProps)(withRouter(Login))
export default Login