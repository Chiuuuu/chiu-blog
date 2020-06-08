import React from 'react'
import './Sidebar.css'
import '../../main/mainComponents/sideInfo/sideInfoUser/SideInfoUser.css'

import { connect } from 'react-redux'
import { Avatar, Button } from 'antd';
import { UserOutlined, SettingOutlined, MessageOutlined } from '@ant-design/icons'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      active: 0
    }
  
  }

  changeActive = active => {
    this.props.changeActive(active)
    this.setState({
      active
    })
  }

  render() {
    return (
      <div className="side-info-box">
        {/* 头像 */}
        <div className="side-info-user">
          <Avatar className="side-info-avatar" size={160} icon="user" />
          <div className="side-info-name">{ this.props.userInfo.nickname }</div>
        </div>

        {/* 选项 */}
        <div className="sidebar-options">
          <div className={'sidebar-item' + (this.state.active === 0 ? ' active' : '')}>
            <Button type="link" onClick={() => this.changeActive(0)}>
              <UserOutlined />
              <span>个人信息</span>
            </Button>
          </div>
          <div className={'sidebar-item' + (this.state.active === 1 ? ' active' : '')}>
            <Button type="link" onClick={() => this.changeActive(1)}>
              <SettingOutlined />
              <span>账号设置</span>
            </Button>
          </div>
          <div className={'sidebar-item' + (this.state.active === 2 ? ' active' : '')}>
            <Button type="link" onClick={() => this.changeActive(2)}>
              <MessageOutlined />
              <span>消息提醒</span>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}


Sidebar = connect(mapStateToProps)(Sidebar)
export default Sidebar