import React from 'react'
import './Login.css'
import { withRouter } from "react-router";
import { Form, Input, Radio, Modal, message } from 'antd';
import PropTypes from 'prop-types';

import { register } from '../../request'
import MD5 from 'js-md5'

class Register extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {

    }
  
    this.formRef = React.createRef();
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
    this.props.switchEnterFunction(this.registerBlog.bind(this))
  }

  // 点击注册
  registerBlog = async() => {
    let salt = this.state.salt
    try {
      await this.formRef.current.validateFields()
    } catch (error) {
      return console.log('注册表单校验不通过: ', error)
    }
    const params = this.formRef.current.getFieldsValue()
    register({
      username: params.username,
      password: MD5(params.password + salt),
      gender: params.gender,
      nickname: params.nickname,
      phone: params.phone,
      email: params.email,
    })
      .then(res => {
        if (res.code == 1) {
          window.localStorage.setItem('user', res)
          this.props.switchLogin(1)
          this.props.history.push('/sign/login')
          message.success('注册成功！')
        }else {
          const modal = Modal.warning()
          modal.update({
            content: res.msg,
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
      <Form ref={this.formRef}>
        <Form.Item 
          name="username" 
          label="用户名" 
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input autoComplete="off" placeholder="请输入用户名" type="text"/>
        </Form.Item>
        <Form.Item 
          name="password" 
          label="密码" 
          rules={[
            { required: true, message: '请输入密码' },
            { min: 8, message: '密码长度不能少于8位' },
            ]}>
          <Input autoComplete="off" placeholder="请输入密码" type="password"/>
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
        <Form.Item 
          name="nickname" 
          label="昵称" 
          rules={[{ required: true, message: '请输入昵称' }]}
        >
          <Input autoComplete="off" placeholder="请输入昵称" type="text"/>
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
          name="gender" 
          label="性别" 
          style={{textAlign: 'left'}}
          initialValue={1}
        >
          <Radio.Group defaultValue={1} buttonStyle="solid">
            <Radio.Button value={1}>男</Radio.Button>
            <Radio.Button value={0}>女</Radio.Button>
            <Radio.Button value={2}>保密</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item 
          name="email" 
          label="邮箱"
          rules={[{ type: 'email', message: '请输入正确的邮箱' }]}
        >
          <Input autoComplete="off" placeholder="请输入邮箱" type="text"/>
        </Form.Item>
        <Form.Item>
          <button className="sign-btn" onClick={() => this.registerBlog()}>注册</button>
        </Form.Item>
      </Form>
    )
  }
}
Register = withRouter(Register)
export default Register