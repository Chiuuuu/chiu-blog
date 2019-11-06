import React from 'react'
import './SideInfo.css'

import SideInfoUser from './sideInfoUser/SideInfoUser'
import SideInfoArticle from './sideInfoArticle/SideInfoArticle'

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
        <SideInfoArticle />
      </div>
    )
  }
}

export default SideInfo