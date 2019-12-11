import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import fetchCreateAdminAction from '../actions/CreateAdmin';

import '../App.css';
import "../assets/js/plugins/nucleo/css/nucleo.css";
import "../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/argon-dashboard.css";

const localStorage = require('localStorage');

class CreateAdminView extends React.Component {

    constructor(props) {
        super(props);
        if (localStorage.getItem('user') === null) {
            window.location.href = '/login';
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { fetchCreateAdmin, history } = this.props;

        const entity = {
            email: e.target.email.value,
            password: e.target.password.value,
            fullname: e.target.fullname.value,
            address: e.target.address.value,
        };

        Promise.resolve(
            fetchCreateAdmin(entity)
        ).then(() => {
            history.push('/');
        });
    };

    render() {

        const { AdminState } = this.props;
        const { user } = AdminState;

        return (
            <div className="main-content">
                <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
                    <div className="container-fluid">
                        <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="../index.html">Create a new Admin</a>
                        <ul className="navbar-nav align-items-center d-none d-md-flex">
                            <li className="nav-item dropdown">
                                <a className="nav-link pr-0" href="/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div className="media align-items-center">
                                        <span className="avatar avatar-sm rounded-circle">
                                            {/* <img alt="Image placeholder" src="../assets/img/theme/team-4-800x800.jpg" /> */}
                                        </span>
                                        <div className="media-body ml-2 d-none d-lg-block">
                                            <span className="mb-0 text-sm  font-weight-bold">{user.fullname}</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ height: '100px', backgroundImage: 'url(profile-cover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
                    <span className="mask bg-gradient-default opacity-8"/>

                </div>
                <div className="container-fluid mt--7">
                    <div className="row">
                        <div style={{ marginRight: '16%', marginLeft: '16%' }} className="col-xl-8 order-xl-1">
                            <div className="card bg-secondary shadow">
                                <div className="card-header bg-white border-0">
                                    <div className="row align-items-center">
                                        <div className="col-8">
                                            <h3 className="mb-0">User information</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>

                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="input-email">Email address</label>
                                                    <input type="email" name="email" id="input-email" className="form-control form-control-alternative" placeholder="1612@example.com" />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="input-username">Password</label>
                                                    <input type="password" name="password" id="input-username" className="form-control form-control-alternative" placeholder="Password" />
                                                </div>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="fullname">Full name</label>
                                                    <input type="text" name="fullname" id="fullname" className="form-control form-control-alternative" placeholder="Full name" />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="input-address">Address</label>
                                                    <input id="input-address" name="address" className="form-control form-control-alternative" placeholder="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" type="text" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 text-center" style={{ marginTop: '10px' }}>
                                            <button type="submit" className="btn btn-sm btn-success">Submit</button>
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
                                    &copy; 2019 <a href="https://www.creative-tim.com" className="font-weight-bold ml-1" >Web advanced</a>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                                    <li className="nav-item">
                                        <a href="https://www.creative-tim.com" className="nav-link" >HCMUS</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="https://www.creative-tim.com/presentation" className="nav-link" >About Us</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="http://blog.creative-tim.com" className="nav-link" >Blog</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md" className="nav-link" >License</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>);
    }
}

const mapStateToProps = state => ({
    AdminState: state.AdminReducer
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchCreateAdmin: fetchCreateAdminAction
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CreateAdminView));
