import React from 'react'
import './User.css'

import TopNav from '../../components/topNav/TopNav'

class User extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  
  }

  render() {
    return (
      <div className="user-box">
        <TopNav />
      </div>
    )
  }
}

export default User