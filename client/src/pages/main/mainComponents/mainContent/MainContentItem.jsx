import React from 'react'
import './MainContent.css'

import { LikeFilled, PushpinFilled } from '@ant-design/icons';
import PropTypes from 'prop-types'

class MainContentItem extends React.Component {

  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    content: PropTypes.string,
    read: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    comment: PropTypes.array,
    like: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    createTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  constructor(props) {
    super(props)
  
    this.state = {
      id: '',
      title: '',
      content: '',
      read: '',
      comment: [],
      like: '',
      createTime: '',
    }
  
  }

  static getDerivedStateFromProps(props, state) {
    const date = new Date(props.createTime)
    return {
      ...props,
      createTime: date.toLocaleDateString() + ' ' + date.toLocaleTimeString().slice(2)
    }
  }

  render() {
    return (
      <div id={'item_' + this.props.id} className="main-content-item">
        <div className="main-content-item-title cursor-underline">
          <PushpinFilled style={{color: '#fcacb9', marginRight: '10px'}} />{this.props.title}
        </div>
        <div className="main-content-item-content cursor-underline text-over">
          {this.props.content}
        </div>
        <div className="main-content-item-info">
          <div className="item-read">
            阅读 ( {this.state.read} )
            </div>
          <div className="item-read">
            评论 <span className="cursor-underline">( {this.state.comment.length} )</span>
            </div>
          <div className="item-read">
            <LikeFilled style={{color: '#fcacb9', cursor: 'pointer', marginRight: '4px'}} /> 
            ( {this.state.like} )
            </div>
          <div className="item-read">{this.state.createTime}</div>
        </div>
      </div>
    );
  }
}

export default MainContentItem