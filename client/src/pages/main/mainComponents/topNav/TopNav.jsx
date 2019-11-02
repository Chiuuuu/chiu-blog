import React from 'react'
import './TopNav.css'

import { Button, Icon } from 'antd';

class TopNav extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  
  }

  render() {
    return (
      <div className="top-nav-box">
        <div className="top-nav-left">
          chiu的博客
        </div>
        <div className="top-nav-right">
          <Button type="link"><Icon type="home" />首页</Button>
          <Button type="link"><Icon type="edit" />新建</Button>
        </div>
      </div>
    )
  }
}

export default TopNav