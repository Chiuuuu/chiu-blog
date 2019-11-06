import React from 'react'
import './SideInfoUser.css'

import { Avatar } from 'antd';

class SideInfoUser extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  
  }

  render() {
    return (
      <div className="side-info-user">
        <Avatar className="side-info-avatar" size={160} icon="user" />
        <div className="side-info-name">chiu</div>
        <div className="side-info-data">
          <div>发布<span className="side-info-record">1</span></div>
          <div>阅读<span className="side-info-record">2</span></div>
          <div>点赞<span className="side-info-record">3</span></div>
        </div>
      </div>
    )
  }
}

export default SideInfoUser