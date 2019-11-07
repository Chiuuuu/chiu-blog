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
    if (path === '/') {
      this.props.history.replace(path)
    }else {
      this.props.history.push(path)
    }
  }

  render() {
    return (
      <div className="top-nav-box">
        <div className="top-nav-left">
          chiu的博客
        </div>
        <div className="top-nav-center">
          { !!this.state.showSearch ? <Search className="top-nav-search" placeholder="搜索文章" size="default" onSearch={value => console.log(value)} /> : null }
        </div>
        <div className="top-nav-right">
          { !!+this.props.isVisitor ? null : <Button type="link" onClick={() =>this.switchNav('/main')}><Icon type="home" />首页</Button> }
          { !!+this.props.isVisitor ? null : <Button type="link" onClick={() =>this.switchNav('/add')}><Icon type="edit" />新建</Button> }
          { !!+this.props.isVisitor ? null : <Button type="link" onClick={() =>this.switchNav('/user')}><Icon type="user" />个人</Button> }
          <Button type="link" onClick={() =>this.switchNav('/')}><Icon type="logout" />退出</Button>
        </div>
      </div>
    )
  }
}

TopNav = withRouter(TopNav)

const mapStateToProps = (state) => {
  return {
    isVisitor: state.isVisitor
  }
}

TopNav = connect(mapStateToProps)(TopNav)

export default TopNav