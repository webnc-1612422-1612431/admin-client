/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './assets/js/plugins/nucleo/css/nucleo.css';
import './assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css';

import './App.css';
import LoginView from './components/LoginView';
import Dashboard from './components/Dashboard';
import CreateAdminView from './components/CreateAdminView';
import UsersView from './components/UsersView';
import UserInfoView from './components/UserInfoView';
import SkillsView from './components/SkillsView';

const ls = require('localStorage');

class App extends React.Component {
  handleLogout = () => {
    ls.removeItem('user');
    window.location.href = '/login';
  };

  render() {
    const component = [];
    const user = ls.getItem('user');
    if (user != null) {
      component.push(
        <nav key="nav"
          className="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white"
          id="sidenav-main"
        >
          <div className="container-fluid">
            <Link className="navbar-brand pt-0" to="/dashboard" key="link1">
              <img src="logo.png" className="navbar-brand-img" alt="..." />
            </Link>
            <div className="collapse navbar-collapse" id="sidenav-collapse-main">
              <ul className="navbar-nav">
                <li className="nav-item " key="dashboad">
                  <Link className=" nav-link active" to="/dashboard" key="link2">
                    {' '}
                    <i className="ni ni-tv-2 text-primary"/> Dashboard
                  </Link>
                </li>
                <li className="nav-item true" key="createadmin">
                  <Link className="nav-link " to="/createadmin" key="link3">
                    <i className="ni ni-user-run text-blue"/> Create new admin
                  </Link>
                </li>
                <li className="nav-item" key="users">
                  <Link className="nav-link " to="/users" key="link4">
                    <i className="ni ni-user-run text-blue"/> Users
                  </Link>
                </li>

                <li className="nav-item" key="users">
                  <Link className="nav-link " to="/skills" key="link5">
                    <i className="ni ni-user-run text-blue"/> Skills
                  </Link>
                </li>

                <li className="nav-item" onClick={this.handleLogout} key="logout">
                  <Link className="nav-link" key="link6">
                    <i className="ni ni-button-power text-blue"/> Logout
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
          <Route exact path="/users">
            <UsersView />
          </Route>
          <Route exact path="/userInfo/:row">
            <UserInfoView />
          </Route>
          <Route exact path="/skills">
            <SkillsView />
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

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
