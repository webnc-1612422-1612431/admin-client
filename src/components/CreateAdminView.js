/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import fetchCreateAdminAction from '../actions/CreateAdmin';

import '../App.css';
import "../assets/js/plugins/nucleo/css/nucleo.css";
import "../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/argon-dashboard.css";
import Footer from './layout/Footer';
import Header from './layout/Header';

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

    handleProfile = e => {
        e.preventDefault();
        const {history} = this.props;
        history.push("/profile");
    }

    render() {
        return (
            <div className="main-content">
                <Header isDisplay={1}/>
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
                    <Footer/>
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
