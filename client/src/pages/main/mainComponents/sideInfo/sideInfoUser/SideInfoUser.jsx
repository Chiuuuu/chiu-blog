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
        <Avatar className="side-info-avatar" size={180} icon="user" />
        <div className="side-info-name">chiu</div>
      </div>
    )
  }
}

export default SideInfoUser