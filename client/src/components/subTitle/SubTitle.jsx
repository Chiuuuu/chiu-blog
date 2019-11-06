import React from 'react'
import './SubTitle.css'

class SubTitle extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      text: '我是标题'
    }
  
  }

  static getDerivedStateFromProps(props, state) {
    return {...props}
  }

  render() {
    return (
      <div className="sub-title">{this.state.text}</div>
    )
  }
}

export default SubTitle