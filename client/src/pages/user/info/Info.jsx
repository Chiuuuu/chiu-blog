import React from 'react'
import './Info.css'

import { connect } from 'react-redux'
import { Descriptions, Button, Form, Input, Radio, message } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import { changeUserInfo } from '../../../request/user'

class Info extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      edit: false
    }
  
    this.form = React.createRef()
  }

  saveUserInfo = async() => {
    try {
      await this.form.current.validateFields()
    } catch (error) {
      return console.log('表单验证不通过: ', error)
    }
    const params = this.form.current.getFieldsValue()
    params.userId = this.props.userId
    changeUserInfo(params)
      .then(res => {
        if (res.code == 0) {
          message.success('修改成功')
          this.setState({ edit: false })
          this.props.getUserInfo(res.data)
        } else {
          message.error('修改信息失败, 请刷新重试')
        }
      })
      .catch(err => {
        console.log('修改信息失败: ', err)
        message.error('修改信息失败, 请刷新重试')
      })

  }

  render() {
    // 编辑模式
    if (this.state.edit) {
      return (
        <Form className="user-info-box" ref={this.form}>
          <Descriptions 
            column={2}
            title="基本信息"
          >
            <Descriptions.Item>
              <Form.Item
                name="nickname" 
                label="昵称" 
                initialValue={this.props.nickname}
                rules={[{ required: true, message: '请输入昵称' }]}
              >
                <Input />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item>
              <Form.Item 
                name="gender" 
                label="性别" 
                style={{textAlign: 'left'}}
                initialValue={this.props.gender}
              >
                <Radio.Group defaultValue={this.props.gender} buttonStyle="solid">
                  <Radio.Button value={1}>男</Radio.Button>
                  <Radio.Button value={0}>女</Radio.Button>
                  <Radio.Button value={2}>保密</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item>
              <Form.Item
                name="phone"
                label="手机号"
                initialValue={this.props.phone}
                rules={[
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1\d{10}$/, message: '请输入正确的手机号' }
                ]}
              >
                <Input />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item>
              <Form.Item
                name="email" 
                label="邮箱"
                initialValue={this.props.email}
                rules={[{ type: 'email', message: '请输入正确的邮箱' }]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Descriptions.Item>
          </Descriptions>
          <div>
            <Button style={{marginRight: 50}} type="primary" onClick={() => this.saveUserInfo()}>保存</Button>
            <Button onClick={() => this.setState({edit: false})}>取消</Button>
          </div>
        </Form>
      )
    } else {
      let gender = '保密'
      if (this.props.gender == 1) {
        gender = '男'
      } else if (this.props.gender == 0) {
        gender = '女'
      } else if (this.props.gender == 2) {
        gender = '保密'
      }
      return (
        <Descriptions 
          className="user-info-box" 
          column={2}
          title={<div>基本信息 <Button type="link" onClick={() => this.setState({edit: true})}><EditOutlined /></Button></div>}
        >
          <Descriptions.Item label="昵称">{this.props.nickname}</Descriptions.Item>
          <Descriptions.Item label="性别">{gender}</Descriptions.Item>
          <Descriptions.Item label="手机号">{this.props.phone}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{this.props.email}</Descriptions.Item>
        </Descriptions>
      )
    }
  }
}

const mapState = (state) => {
  return {
    userId: state.userId,
    nickname: state.userInfo.nickname,
    gender: state.userInfo.gender,
    email: state.userInfo.email,
    phone: state.userInfo.phone
  }
}

const mapDispatch = dispatch => {
  return {
    getUserInfo(data) {
      dispatch({
        type: 'getUserInfo',
        payload: data
      })
    }
  }
}

Info = connect(mapState, mapDispatch)(Info)
export default Info