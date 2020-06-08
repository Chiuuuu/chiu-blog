import React from 'react'
import './TopNav.css'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Button, Icon, Input } from 'antd';

const { Search } = Input;

class TopNav extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    showSearch: PropTypes.bool
  } 

  constructor(props) {
    super(props)
  
    this.state = {
      shouldUpdate: true,
      showSearch: false
    }
  
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...props,
      showSearch: props.showSearch
    }
  }

  switchNav(path) {
    if (path === '/sign') {
      this.props.history.replace(path)
    }else {
      this.props.history.push(path)
    }
  }

  render() {
    return (
      <div className="top-nav-box">
        <div className="top-nav-left">
          { this.props.loginState == 0 ? '欢迎参观' : this.props.userInfo.nickname + '的博客'}
        </div>
        <div className="top-nav-center">
          { !!this.state.showSearch ? <Search className="top-nav-search" placeholder="搜索文章" size="default" onSearch={value => console.log(value)} /> : null }
        </div>
        <div className="top-nav-right">
          { this.props.loginState == 0 ? null : <Button type="link" onClick={() => this.switchNav('/main')}><Icon type="home" />首页</Button> }
          { this.props.loginState == 0 ? null : <Button type="link" onClick={() => this.switchNav('/add')}><Icon type="edit" />新建</Button> }
          { this.props.loginState == 0 ? null : <Button type="link" onClick={() => this.switchNav('/user')}><Icon type="user" />个人</Button> }
          <Button type="link" onClick={() => { this.switchNav('/sign'); this.props.changeLoginState(-1) }}><Icon type="logout" />退出</Button>
        </div>
      </div>
    )
  }
}

TopNav = withRouter(TopNav)

const mapStateToProps = (state) => {
  return {
    loginState: state.loginState,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoginState(type) {
      dispatch({
        type: 'changeLoginState',
        payload: type
      })
    }
  }
}

TopNav = connect(mapStateToProps, mapDispatchToProps)(TopNav)

export default TopNav