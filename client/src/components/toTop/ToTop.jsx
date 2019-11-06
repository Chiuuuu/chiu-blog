import React from 'react'
import './ToTop.css'

import { Icon } from 'antd'

class ToTop extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  
  }

  render() {
    return (
      <div id="toTop" title="返回顶部" onClick={() => window.scrollTo({ top:0, behavior: 'smooth' })}>
        <Icon type="up" />
      </div>
    )
  }
}

export default ToTop