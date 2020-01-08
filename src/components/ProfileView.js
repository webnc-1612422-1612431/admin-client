import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';

import { fetchListUsers } from '../actions/Users';
import {fetchPostUpdateProfile} from '../actions/Admin';

import '../App.css';
import '../assets/js/plugins/nucleo/css/nucleo.css';
import '../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/argon-dashboard.css';
import Header from './layout/Header';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    const user = localStorage.getItem('user');
    if (user === null) {
      window.location.href = '/login';
    }
  }

  handleChangePhoto = e => {
    e.preventDefault();
    document.getElementById('profileimage').click();
  };

  handleOnChangePhoto = e => {
    e.preventDefault();
    if (e.target.files[0]) {
      const {fetchPostUpdateProfileAction} = this.props;
      Promise.resolve(fetchPostUpdateProfileAction(1, e.target.files[0])).then(res => {
        if (res) {
          swal('Update photo success');
        } else {
          swal('Update photo fail');
        }
      });
    }
  };

  render() {
    const { AdminState } = this.props;
    const { user } = AdminState;
    return (
      <div className="main-content">
        <Header isDisplay={1} />

        <div className="container-fluid mt--7">
          <div className="row">
            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
              <div className="card card-profile shadow">
                <div className="row justify-content-center">
                  <div className="col-lg-3 order-lg-2">
                    <div className="card-profile-image">
                      <a href="/">
                        <img
                          alt=""
                          style={{ width: '150px', height: '150px  ' }}
                          src={user.avatar}
                          className="rounded-circle"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <form>
                      <input
                        type="file"
                        id="profileimage"
                        name="profileimage"
                        style={{ display: 'none' }}
                        onChange={this.handleOnChangePhoto}
                      />
                      <button
                        type="button"
                        onClick={this.handleChangePhoto}
                        className="btn btn-sm btn-info mr-4"
                      >
                        Upload
                      </button>
                    </form>
                  </div>
                </div>
                <div className="card-body pt-0 pt-md-4">
                  <div className="row">
                    <div className="col" style={{marginTop: '-50px'}}>
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Handled</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Role</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3>
                      {user.fullname}
                      <span className="font-weight-light">, 27</span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {user.address}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {user.major}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Science
                    </div>
                    <hr className="my-4" />
                    <p>
                      {user.introduction}
                    </p>
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
                      <button
                        type="submit"
                        form="userinfomation"
                        className="btn btn-sm btn-primary"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form id="userinfomation" onSubmit={this.hanldeSubmit}>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="fullname"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              id="fullname"
                              name="fullname"
                              className="form-control form-control-alternative"
                              placeholder={user.fullname}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="email"
                            >
                              Email address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="form-control form-control-alternative"
                              placeholder={user.email}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="password"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              className="form-control form-control-alternative"
                              placeholder="Password"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="repass"
                            >
                              Retype password
                            </label>
                            <input
                              type="password"
                              id="repass"
                              name="repass"
                              className="form-control form-control-alternative"
                              placeholder="Retype password"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              className="form-control-label"
                              htmlFor="address"
                            >
                              Address
                            </label>
                            <input
                              id="address"
                              name="address"
                              className="form-control form-control-alternative"
                              placeholder={user.address}
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Additional
                    </h6>
                    <div className="pl-lg-4">
                      <div className="form-group">
                        <label htmlFor="/">About Me</label>
                        <textarea
                          name="introduction"
                          rows="4"
                          className="form-control form-control-alternative"
                          placeholder={user.introduction}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  UsersState: state.UsersReducer,
  AdminState: state.AdminReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchListUsersAction: fetchListUsers,
      fetchPostUpdateProfileAction: fetchPostUpdateProfile
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileView));
