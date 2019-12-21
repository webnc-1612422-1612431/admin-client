import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchListUsers, updateUserState } from '../actions/Users';

import '../App.css';
import '../assets/js/plugins/nucleo/css/nucleo.css';
import '../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/argon-dashboard.css';

class UserInfoView extends React.Component {
  constructor(props) {
    super(props);
    const { UsersState, history } = this.props;
    const { users } = UsersState;
    if (users.length === 0) {
      console.log(users.length);
      history.push('/');
    }
  }

  hanleUpdateState = (id, state) => {
    const { fetchUpdateUserState, fetchListUsersAction } = this.props;
    const user = {
      id,
      state: state === 1 ? 0 : 1
    };
    Promise.resolve(fetchUpdateUserState(user)).then(() => {
      fetchListUsersAction();
    });
  };

  render() {
    const { AdminState, UsersState, match } = this.props;
    const { user } = AdminState;
    const { users } = UsersState;
    const { row } = match.params;
    const userInfomation = users[row];

    return (
      <div className="main-content">
        <nav
          className="navbar navbar-top navbar-expand-md navbar-dark"
          id="navbar-main"
        >
          <div className="container-fluid">
            <a
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              href="/"
            >
              User information
            </a>
            <ul className="navbar-nav align-items-center d-none d-md-flex">
              <li className="nav-item dropdown">
                <a
                  className="nav-link pr-0"
                  href="/"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="media align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img alt="Placeholder" src={user.avatar} />
                    </span>
                    <div className="media-body ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm  font-weight-bold">
                        {user.fullname}
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            height: '100px',
            backgroundImage: 'url(/profile-cover.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }}
        >
          <span className="mask bg-gradient-default opacity-8" />
        </div>
        <div className="container-fluid mt--7">
          <div className="row">
            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
              <div className="card card-profile shadow">
                <div className="row justify-content-center">
                  <div className="col-lg-3 order-lg-2">
                    <div className="card-profile-image">
                      <a href="/">
                        <img
                          style={{ width: '170px', height: '170px' }}
                          src={userInfomation.avatar}
                          alt="Ảnh cover"
                          className="rounded-circle"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-sm btn-default float-right"
                    >
                      Message
                    </button>

                    {userInfomation.state ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-danger float-right"
                        onClick={this.hanleUpdateState.bind(
                          this,
                          userInfomation.id,
                          userInfomation.state
                        )}
                      >
                        Inactive
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-sm btn-success float-right"
                        onClick={this.hanleUpdateState.bind(
                          this,
                          userInfomation.id,
                          userInfomation.state
                        )}
                      >
                        Active
                      </button>
                    )}
                  </div>
                </div>

                <div className="card-body pt-0 pt-md-4">
                  <div className="row">
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">Role</span>
                          <span className="description">
                            {userInfomation.role}
                          </span>
                        </div>
                        <div>
                          <span className="heading">Contract</span>
                          <span className="description">{100}</span>
                        </div>
                        <div>
                          <span className="heading">Rate</span>
                          <span className="description">5 stars</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {userInfomation.major}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Science HCMC
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 order-xl-1">
              <div className="card bg-secondary shadow">
                <div className="card-header bg-white border-0">
                  <div className="row align-items-center">
                    <div className="col-8">
                      <h3 className="mb-0">My account</h3>
                    </div>
                    <div className="col-4 text-right">
                      Price: {userInfomation.price}$
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="input-email"
                              className="form-control form-control-alternative"
                              value={userInfomation.email}
                              disabled
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Fullname
                            </label>
                            <input
                              type="email"
                              id="input-email"
                              className="form-control form-control-alternative"
                              value={userInfomation.fullname}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <input
                              id="input-address"
                              className="form-control form-control-alternative"
                              value={userInfomation.address}
                              type="text"
                              disabled
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="introduction"
                            >
                              Introduction
                            </label>
                            <textarea
                              style={{ height: 'auto' }}
                              className="form-control form-control-alternative"
                              disabled
                            >
                              {userInfomation.introduction}
                            </textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="row align-items-center justify-content-xl-between">
              <div className="col-xl-6">
                <div className="copyright text-center text-xl-left text-muted">
                  &copy; 2018{' '}
                  <a
                    href="https://www.creative-tim.com"
                    className="font-weight-bold ml-1"
                  >
                    Creative Tim
                  </a>
                </div>
              </div>
              <div className="col-xl-6">
                <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                  <li className="nav-item">
                    <a href="https://www.creative-tim.com" className="nav-link">
                      Creative Tim
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://www.creative-tim.com/presentation"
                      className="nav-link"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="http://blog.creative-tim.com" className="nav-link">
                      Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md"
                      className="nav-link"
                    >
                      MIT License
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  UsersState: state.UsersReducer,
  AdminState: state.AdminReducer,
  UserInfoState: state.UserInfoReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchListUsersAction: fetchListUsers,
      fetchUpdateUserState: updateUserState
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserInfoView));
