import React from 'react';
import './App.css'

import LoginPage from './pages/login/login'

let user = JSON.parse(window.localStorage.getItem('user'))
let username, password
if (!!user) {
  username = user.username
  password = user.password
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <LoginPage />
      </div>
    );
  }
}

export default App;
