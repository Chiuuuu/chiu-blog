import React from 'react'
import './User.css'

import PropTypes from 'prop-types'
import { withRouter, Route, Switch, } from 'react-router'
import TopNav from '../../components/topNav/TopNav'
import Sidebar from './sidebar/Sidebar'

import Info from './info/Info'
import Setting from './setting/Setting'
import Message from './message/Message'

class User extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  
    this.state = {
      active: 0
    }
  
  }

  static getDerivedStateFromProps(nextProps, preState) {
    const pathname = nextProps.history.location.pathname
    let active = 0
    if (pathname.indexOf('info') > -1) {
      active = 0
    } else if (pathname.indexOf('setting') > -1) {
      active = 1
    } else if (pathname.indexOf('message') > -1) {
      active = 2
    } else {
      nextProps.history.push('/user/info')
    }
    return {
      active
    }
  }

  changeRoute = (active = 0) => {
    if (active === 0) {
      this.props.history.push('/user/info')
    } else if (active === 1) {
      this.props.history.push('/user/setting')
    } else if (active === 2) {
      this.props.history.push('/user/message')
    }
  }

  render() {
    return (
      <div className="page-box">
        <TopNav />
        <div className="page-body">
          <Sidebar active={this.state.active} changeActive={active => this.changeRoute(active)} />
          <div className="user-content">
            <Switch>
              <Route path="/user/info" component={Info} />
              <Route path="/user/setting" component={Setting} />
              <Route path="/user/message" component={Message} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

User = withRouter(User)

export default User