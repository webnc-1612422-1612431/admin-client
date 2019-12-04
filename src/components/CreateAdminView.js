import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import fetchCreateAdminAction from '../actions/CreateAdmin';

import '../App.css';
import "../assets/js/plugins/nucleo/css/nucleo.css";
import "../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/argon-dashboard.css";

class CreateAdminView extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        const { fetchCreateAdmin, history } = this.props;

        const entity = {
            email: e.target.email.value,
            password: e.target.password.value,
            fullname: e.target.fullname.value,
            address: e.target.address.value,
        }

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
            <div class="main-content">
                <nav class="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
                    <div class="container-fluid">
                        <a class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="../index.html">Create a new Admin</a>
                        <ul class="navbar-nav align-items-center d-none d-md-flex">
                            <li class="nav-item dropdown">
                                <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div class="media align-items-center">
                                        <span class="avatar avatar-sm rounded-circle">
                                            {/* <img alt="Image placeholder" src="../assets/img/theme/team-4-800x800.jpg" /> */}
                                        </span>
                                        <div class="media-body ml-2 d-none d-lg-block">
                                            <span class="mb-0 text-sm  font-weight-bold">{user.fullname}</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{ height: '100px', backgroundImage: 'url(profile-cover.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
                    <span class="mask bg-gradient-default opacity-8"></span>

                </div>
                <div class="container-fluid mt--7">
                    <div class="row">
                        <div style={{ marginRight: '16%', marginLeft: '16%' }} class="col-xl-8 order-xl-1">
                            <div class="card bg-secondary shadow">
                                <div class="card-header bg-white border-0">
                                    <div class="row align-items-center">
                                        <div class="col-8">
                                            <h3 class="mb-0">User information</h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <form onSubmit={this.handleSubmit}>

                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="form-control-label" for="input-email">Email address</label>
                                                    <input type="email" name="email" id="input-email" class="form-control form-control-alternative" placeholder="1612@example.com" />
                                                </div>
                                            </div>

                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="form-control-label" for="input-username">Password</label>
                                                    <input type="password" name="password" id="input-username" class="form-control form-control-alternative" placeholder="Password" />
                                                </div>

                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="form-control-label" for="fullname">Full name</label>
                                                    <input type="text" name="fullname" id="fullname" class="form-control form-control-alternative" placeholder="Full name" />
                                                </div>
                                            </div>

                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <label class="form-control-label" for="input-address">Address</label>
                                                    <input id="input-address" name="address" class="form-control form-control-alternative" placeholder="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" type="text" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-12 text-center" style={{ marginTop: '10px' }}>
                                            <button type="submit" class="btn btn-sm btn-success">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer class="footer">
                        <div class="row align-items-center justify-content-xl-between">
                            <div class="col-xl-6">
                                <div class="copyright text-center text-xl-left text-muted">
                                    &copy; 2019 <a href="https://www.creative-tim.com" class="font-weight-bold ml-1" target="_blank">Web advanced</a>
                                </div>
                            </div>
                            <div class="col-xl-6">
                                <ul class="nav nav-footer justify-content-center justify-content-xl-end">
                                    <li class="nav-item">
                                        <a href="https://www.creative-tim.com" class="nav-link" target="_blank">HCMUS</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="https://www.creative-tim.com/presentation" class="nav-link" target="_blank">About Us</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="http://blog.creative-tim.com" class="nav-link" target="_blank">Blog</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md" class="nav-link" target="_blank">License</a>
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
