import React from 'react';
import './App.css'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './pages/login/Login'
import MainPage from './pages/main/Main'
import AddPage from './pages/add/AddArticle';
import UserPage from './pages/user/User';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Redirect exact path="/" to="/main" />
            <Route path="/sign" component={LoginPage} />
            <Route path="/main" component={MainPage} />
            <Route path="/add" component={AddPage} />
            <Route path="/user" component={UserPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
