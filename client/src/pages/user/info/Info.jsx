import React from 'react'
import './Info.css'

import { connect } from 'react-redux'
import { Descriptions } from 'antd';

class Info extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  
  }

  render() {
    return (
      <Descriptions className="user-info-box" title="基本信息" column={2}>
        <Descriptions.Item label="昵称">{this.props.nickname}</Descriptions.Item>
        <Descriptions.Item label="性别">{this.props.sex}</Descriptions.Item>
        <Descriptions.Item label="手机号">{this.props.phone}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{this.props.email}</Descriptions.Item>
      </Descriptions>
    )
  }
}

const mapState = (state) => {
  let sex = '未知'
  if (state.userInfo.sex == 1) {
    sex = '男'
  } else if (state.userInfo.sex == 2) {
    sex = '女'
  }
  return {
    nickname: state.userInfo.nickname,
    sex: sex,
    email: state.userInfo.email,
    phone: state.userInfo.phone
  }
}

Info = connect(mapState)(Info)
export default Info