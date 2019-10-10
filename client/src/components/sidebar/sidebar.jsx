import React from 'react'
import './sidebar.css'

import { getUserInfo } from '../../request'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      avatar: ''
    }

    static getDerivedStateFromProps(props, state) {
      request.getUserInfo({
        userId: 
      })
        .then(res => {

        })
        .catch(err => console.log(err))
    }
  
  }

  render() {
    return (
      <div className="blog-sidebar">
        <div className="avatar">
          <img src={this.state.avatar} alt="头像"/>
        </div>
      </div>
    )
  }
}

export default Sidebar