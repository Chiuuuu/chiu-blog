import React from 'react'
import './SideInfo.css'

import { Avatar } from 'antd';

import SideInfoUser from './sideInfoUser/SideInfoUser'

class SideInfo extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  
  }

  render() {
    return (
      <div className="side-info-box">
        <SideInfoUser />

      </div>
    )
  }
}

export default SideInfo