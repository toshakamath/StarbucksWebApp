import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import "antd/dist/antd.css"
import Login from './Components/Login/Login'
import Sidebar from './Components/Sidebar/Sidebar'
import Signup from './Components/Signup/Signup'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Sidebar} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
