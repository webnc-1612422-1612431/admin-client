import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchListUsers } from '../actions/Users';

import '../App.css';
import '../assets/js/plugins/nucleo/css/nucleo.css';
import '../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/argon-dashboard.css';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    // const { UsersState, history } = this.props;
    // const { users } = UsersState;
    console.log(123);
  }

  //   rowHandleClick = i => {
  // const {history} = this.props;
  // history.push(`/users/${  i}`);
  // window.location.href = `a${i}`;
  // console.log(i);
  //   };

  render() {
    const { AdminState } = this.props;
    const { user } = AdminState;
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
                    <img alt="" style={{width: '150px', height: '150px  '}} src="profile-cover.jpg" className="rounded-circle"/>
                  </a>
                </div>
              </div>
            </div>
            <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div className="d-flex justify-content-between">
                <a href="/" className="btn btn-sm btn-info mr-4">Connect</a>
              </div>
            </div>
            <div className="card-body pt-0 pt-md-4">
              <div className="row">
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span className="heading">22</span>
                      <span className="description">Friends</span>
                    </div>
                    <div>
                      <span className="heading">10</span>
                      <span className="description">Photos</span>
                    </div>
                    <div>
                      <span className="heading">89</span>
                      <span className="description">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3>
                  Jessica Jones<span className="font-weight-light">, 27</span>
                </h3>
                <div className="h5 font-weight-300">
                  <i className="ni location_pin mr-2"/>Bucharest, Romania
                </div>
                <div className="h5 mt-4">
                  <i className="ni business_briefcase-24 mr-2"/>Solution Manager - Creative Tim Officer
                </div>
                <div>
                  <i className="ni education_hat mr-2"/>University of Computer Science
                </div>
                <hr className="my-4" />
                <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
                <a href="/">Show more</a>
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
                  <button type="submit" form="userinfomation" className="btn btn-sm btn-primary">Update</button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <form id="userinfomation" onSubmit={this.hanldeSubmit}>
                <h6 className="heading-small text-muted mb-4">User information</h6>
                <div className="pl-lg-4">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="fullname">Name</label>
        <input type="text" id="fullname" name="fullname" className="form-control form-control-alternative" placeholder={user.fullname}/>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="email">Email address</label>
                        <input type="email" id="email" name="email" className="form-control form-control-alternative" placeholder={user.email}/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" className="form-control form-control-alternative" placeholder="Password"/>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="repass">Retype password</label>
                        <input type="password" id="repass" name="repass" className="form-control form-control-alternative" placeholder="Retype password"/>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <h6 className="heading-small text-muted mb-4">Contact information</h6>
                <div className="pl-lg-4">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="address">Address</label>
                        <input id="address" name="address" className="form-control form-control-alternative" placeholder={user.address} type="text"/>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />
                <h6 className="heading-small text-muted mb-4">Additional</h6>
                <div className="pl-lg-4">
                  <div className="form-group">
                    <label htmlFor="/">About Me</label>
                    <textarea name="introduction" rows="4" className="form-control form-control-alternative" placeholder={user.introduction}/>
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
      fetchListUsersAction: fetchListUsers
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileView));
