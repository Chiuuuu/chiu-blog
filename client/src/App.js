import React from 'react';
import './App.css'

import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LoginPage from './pages/login/'
import MainPage from './pages/main/Main'
import AddPage from './pages/add/AddArticle';
import UserPage from './pages/user/User';
import { getUserInfo } from './request/user'
import { message } from 'antd';

class App extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    showSearch: PropTypes.bool
  } 

  constructor(props) {
    super(props);

    this.state = {
      isInit: false
    }
    
  }
  
  UNSAFE_componentWillMount() {
    const props = this.props
    if (props.loginState == 0) {
      this.setState({ isInit: true })
    } else if (props.loginState == 1) {
      if (props.userId) {
        getUserInfo({ id: props.userId })
          .then(res => {
            if (res.code == 0) {
              props.getUserInfo(res.data)
              this.setState({ isInit: true })
            } else {
              props.history.replace('/sign/login')
              this.setState({ isInit: true })
            }
          })
          .catch(err => {
            console.log(err)
            message.error('您太久没进行操作了, 请重新登录')
            props.history.replace('/sign/login')
            this.setState({ isInit: true })
          })
      } else {
        props.history.replace('/sign/login')
        this.setState({ isInit: true })
      }
    } else if (props.loginState == -1) {
      props.history.replace('/sign/login')
      this.setState({ isInit: true })
    }
  }
  
  render() {
    if (!this.state.isInit) return null
    return (
      <div className="App">
        <Switch>
          <Redirect exact path="/" to="/sign/login" />
          <Route path="/sign" component={LoginPage} />
          <Route path="/main" component={MainPage} />
          <Route path="/add" component={AddPage} />
          <Route path="/user" component={UserPage} />
        </Switch>
      </div>
    );
  }
}

App = withRouter(App)

const mapStateToProps = (state) => {
  return {
    loginState: state.loginState,
    userId: state.userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo(data) {
      dispatch({
        type: 'getUserInfo',
        payload: data
      })
    }
  }
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
