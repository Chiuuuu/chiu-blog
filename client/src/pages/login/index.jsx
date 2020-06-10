import React from 'react'
import './Login.css'
import { connect } from 'react-redux'
import { Redirect } from "react-router";
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from './Login'
import Register from './Register'
import Reset from './Reset'

class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      salt: '',
      isLogin: true,
      showTab: true,
      pressEnter: () => {},
      switchLogin: (state) => {
        this.setState({
          isLogin: !!state,
          showTab: true
        })
      },
      switchEnterFunction: fn => {
        this.setState({
          pressEnter: fn
        })
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      userId: props.userId,
      salt: props.salt
    }
  }

  hideTab = () => {
    this.setState({
      showTab: false
    })
  }

  backwards = () => {
    this.setState({
      showTab: true
    })
  }

  enterEventFunction = e => {
    if (e.keyCode === 13) {
      this.state.pressEnter()
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.enterEventFunction)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.enterEventFunction)
  }

  render() {
    let isLogin = this.state.isLogin

    return (
      <React.Fragment>
        <div className="sign-bg">
          <div className="sign-window">
            {
              this.state.showTab 
              ? <div className="sign-switch">
                  <Link onClick={() => this.state.switchLogin(1)} className={isLogin ? 'active' : ''} to="/sign/login">账号登录</Link>
                  <Link onClick={() => this.state.switchLogin(0)} className={!isLogin ? 'active' : ''} to="/sign/register">快速注册</Link>
                </div>
              : null
            }
            <Redirect exact path="/sign" to="/sign/login" />
            <Route exact path="/sign/login" render={ () => (<Login hideTab={this.hideTab} {...this.state} />) } />
            <Route exact path="/sign/register" render={ () => (<Register {...this.state} />) } />
            <Route exact path="/sign/reset" render={ () => (<Reset backwards={this.backwards} {...this.state} />) } />
          </div>
        </div>
        <div className="plice">京ICP备19108748号-1</div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    salt: state.salt
  }
}

LoginPage = connect(mapStateToProps)(LoginPage)

export default LoginPage