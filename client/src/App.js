import React from 'react';
import './App.css'

import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginPage from './pages/login/Login'
import MainPage from './pages/main/Main'
import AddPage from './pages/add/AddArticle';
import UserPage from './pages/user/User';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginState: 1
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loginState < 0 && prevState.loginState >= 0) {   // 避免递归
      nextProps.history.replace('/sign/login')
      return {
        ...prevState,
        ...nextProps
      }
    }else {
      return prevState
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.loginState !== nextState.loginState
  }
  
  render() {
    return (
      <div className="App">
        <Switch>
          <Redirect exact path="/" to="/sign" />
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
    loginState: state.loginState
  }
}

App = connect(mapStateToProps)(App)

export default App;
