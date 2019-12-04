import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "./assets/css/argon-dashboard.css?v=1.1.0";
import "./assets/js/plugins/nucleo/css/nucleo.css";
import "./assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css";
// import { connect } from 'react-redux';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Game from './components/Game';
// import LoginView from './components/LoginView';
// import RegisterView from './components/RegisterView';

// import * as action from './actions/Game';
import './App.css';
import LoginView from './components/LoginView'
import Dashboard from './components/Dashboard';
import { connect } from 'react-redux';
import CreateAdminView from './components/CreateAdminView';


const ls = require('localStorage');

class App extends React.Component {
  handleLogout = () => {
    alert('abc');
    ls.removeItem('user');
    window.location.href = '/login';
  };

  render() {

    const component = [];
    const user = ls.getItem('user');
    if (user != null) {
      component.push(
        <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
          <div class="container-fluid">

            <Link class="navbar-brand pt-0" to="/dashboard">
              <img src="logo.png" class="navbar-brand-img" alt="..." />
            </Link>
            <div class="collapse navbar-collapse" id="sidenav-collapse-main">

              <ul class="navbar-nav">
                <li class="nav-item  class=" active>
                  <Link class=" nav-link active " to="/dashboard" > <i class="ni ni-tv-2 text-primary"></i> Dashboard
            </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link " to="/createadmin">
                    <i class="ni ni-user-run text-blue"></i> Create new admin
            </Link>
                </li>

                <li class="nav-item" onClick={this.handleLogout}>
                  <Link class="nav-link " >
                    <i class="ni ni-button-power text-blue"></i> Logout
            </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }

    return (
      <Router>
        {component}
        <Switch>
          <Route exact path="/login">
            <LoginView />
          </Route>
          <Route exact path="/createadmin">
            <CreateAdminView />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  AdminState: state.AdminReducer
});

const mapDispatchToProps = dispatch => {
  return {
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

