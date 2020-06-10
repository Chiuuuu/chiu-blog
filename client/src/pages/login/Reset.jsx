import React from 'react'
import './Login.css'
import { withRouter } from "react-router";
import { Form, Input, Radio, Modal, message } from 'antd';
import PropTypes from 'prop-types';

import { reset } from '../../request'
import MD5 from 'js-md5'

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
    this.formRef = React.createRef()
  
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

  componentDidMount() {
    this.props.switchEnterFunction(this.reset.bind(this))
  }

  backwards() {
    this.props.history.goBack()
    this.props.backwards()
  }

  // 点击找回密码
  reset = async() => {
    let salt = this.state.salt
    try {
      await this.formRef.current.validateFields()
    } catch (error) {
      return console.log('注册表单校验不通过: ', error)
    }
    const params = this.formRef.current.getFieldsValue()
    reset({
      username: params.username,
      password: MD5(params.password + salt),
      phone: params.phone
    })
      .then(res => {
        if (res.code == 1) {
          message.success('找回密码成功！')
          this.backwards()
          window.localStorage.setItem('user', JSON.stringify({ username: params.username, password: params.password }))
        }else if (res.code == 0) {
          Modal.warning({
            content: res.msg
          })
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Form className="reset-window" ref={this.formRef}>
        <Form.Item 
          name="username" 
          label="用户名" 
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input autoComplete="off" placeholder="请输入用户名" type="text"/>
        </Form.Item>
        <Form.Item 
          name="phone" 
          label="手机号" 
          rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1\d{10}$/, message: '请输入正确的手机号' }
          ]}
        >
          <Input autoComplete="off" placeholder="请输入手机号" type="text"/>
        </Form.Item>
        <Form.Item 
          name="password" 
          label="新密码" 
          rules={[
            { required: true, message: '请输入新密码' },
            { min: 8, message: '密码长度不能少于8位' },
            ]}>
          <Input autoComplete="off" placeholder="请输入新密码" type="password"/>
        </Form.Item>
        <Form.Item 
          name="confirmPassword" 
          label="密码确认"
          rules={[
            { required: true, message: '请再次输入密码' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('2次输入的密码不一致');
              },
            })
            ]}>
          <Input autoComplete="off" placeholder="请确认密码" type="password"/>
        </Form.Item>
        <div className="btn-group">
          <button className="confirm-btn" onClick={() => this.reset()}>重置</button>
          <button className="cancel-btn" onClick={() => this.backwards()}>取消</button>
        </div>
      </Form>
    )
  }
}
Reset = withRouter(Reset)
export default Reset