import React from 'react'
import './modal.css'

class Modal extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      title: '我是标题',
      text: '我是文本',
      confirmText: '确认',
      cancelText: '取消',
      showCancel: true
    }
  
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...props
    }
  }

  render() {
    let { title, text, confirmText, cancelText, showCancel } = this.state
    return (
      <div className="top-modal">
        <div className="title">{title}</div>
        <div className="text">{text}</div>
        <div className="top-modal-btn">
          <button onClick={() => this.props.confirm()}>{confirmText}</button>
          {showCancel ? <button onClick={() => this.props.cancel()}>{cancelText}</button> : ''}
        </div>
      </div>
    )
  }
}

export default Modal