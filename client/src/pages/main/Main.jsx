import React from 'react'
import './Main.css'

import TopNav from './mainComponents/topNav/TopNav'
import SideInfo from './mainComponents/sideInfo/SideInfo'

class MainPage extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  
  }

  render() {
    return (
      <div className="main-page-box">
        <TopNav />
        <div className="main-page-body">
          <SideInfo />
        </div>
      </div>
    )
  }
}

export default MainPage