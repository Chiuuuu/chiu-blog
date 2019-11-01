import React from 'react';
import './App.css'

import { BrowserRouter as Router , Route, Link, Switch, Redirect } from 'react-router-dom';

import LoginPage from './pages/login/Login'
import MainPage from './pages/main/Main'

const globalContext = React.createContext({
  color: "green"
})
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
            <Redirect exact path="/" to="/sign" />
            <Route path="/sign" component={LoginPage} />
            <Route path="/main" component={MainPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
