import React from 'react'
import './MainContent.css'

import { Icon } from 'antd'
import PropTypes from 'prop-types'

import MainContext from '../../mainContext'
import MainContentItem from './MainContentItem'

class MainContent extends React.Component {

  static propTypes = {
    contentItems: PropTypes.array,
    scrollTop: PropTypes.number
  }

  constructor(props) {
    super(props)
  
    this.state = {
      scrollTo: scrollTop => { // 页面滚动方法
        if (this.mainContent.current) {
          this.mainContent.current.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          })
        }
      }
    }
  
    this.mainContent = React.createRef()
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (nextProps.scrollTop !== preState.scrollTop) {
      preState.scrollTo(nextProps.scrollTop)
      return null
    }
    return {
      ...nextProps
    }
  }

  render() {
    return (
      <div ref={this.mainContent} className="main-content">
        <div className="main-content-title"><Icon style={{color: '#fcacb9', marginRight: '10px'}} type="read" theme="filled" />全部文章</div>
        <MainContext.Consumer>
          {itemList => itemList.map(item => {
            return <MainContentItem {...item} key={item.id} />
          })}
        </MainContext.Consumer>
      </div>
    )
  }
}

export default MainContent