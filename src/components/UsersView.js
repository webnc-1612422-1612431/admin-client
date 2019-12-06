import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import fetchCreateAdminAction from '../actions/CreateAdmin';

import '../App.css';
import "../assets/js/plugins/nucleo/css/nucleo.css";
import "../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/argon-dashboard.css";
// import "../assets/js/plugins/jquery/dist/jquery.min.js";
// import "../assets/js/plugins/bootstrap/dist/js/bootstrap.bundle.min.js";

class UsersView extends React.Component {
    // handleSubmit = e => {
    //     e.preventDefault();
    //     const { fetchCreateAdmin, history } = this.props;

    //     const entity = {
    //         email: e.target.email.value,
    //         password: e.target.password.value,
    //         fullname: e.target.fullname.value,
    //         address: e.target.address.value,
    //     }

    //     Promise.resolve(
    //         fetchCreateAdmin(entity)
    //     ).then(() => {
    //         history.push('/');
    //     });
    // };
    componentDidMount () {
        const script = document.createElement("script");
    
        script.src = "../assets/js/plugins/jquery/dist/jquery.min.js";
        script.async = true;
    
        document.body.appendChild(script);

        const script2 = document.createElement("script");
        script2.src = "../assets/js/plugins/bootstrap/dist/js/bootstrap.bundle.min.js";
        script2.async = true;
    
        document.body.appendChild(script2);
    }

    render() {

        const { AdminState } = this.props;
        const { user } = AdminState;

        return (
            <div className="main-content">
                <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
                    <div className="container-fluid">
                        <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="../index.html">Users</a>
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
                        <div className="col">
                            <div className="card shadow">
                                <div className="card-header border-0">
                                    <h3 className="mb-0">User tables</h3>
                                </div>
                                <div className="table-responsive">
                                    <table className="table align-items-center table-flush">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">Email</th>
                                                <th scope="col">Fullname</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Contract</th>
                                                <th scope="col">Rate</th>
                                                <th scope="col" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">
                                                    <div className="media align-items-center">
                                                        <a href="/" className="avatar rounded-circle mr-3">
                                                            <img alt="" src="../assets/img/theme/bootstrap.jpg" />
                                                        </a>
                                                        <div className="media-body">
                                                            <span className="mb-0 text-sm">tbngoc.khtn@gmail.com</span>
                                                        </div>
                                                    </div>
                                                </th>
                                                <td>
                                                    Tran Ba Ngoc
                    </td>
                                                <td>
                                                    Admin
                                                </td>

                                                <td>
                                                    1400
                                                </td>
                                                {/* <td>
                                                    <div className="avatar-group">
                                                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Ryan Tompson">
                                                            <img alt="" src="../assets/img/theme/team-1-800x800.jpg" className="rounded-circle" />
                                                        </a>
                                                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Romina Hadid">
                                                            <img alt="" src="../assets/img/theme/team-2-800x800.jpg" className="rounded-circle" />
                                                        </a>
                                                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Alexander Smith">
                                                            <img alt="" src="../assets/img/theme/team-3-800x800.jpg" className="rounded-circle" />
                                                        </a>
                                                        <a href="#" className="avatar avatar-sm" data-toggle="tooltip" data-original-title="Jessica Doe">
                                                            <img alt="" src="../assets/img/theme/team-4-800x800.jpg" className="rounded-circle" />
                                                        </a>
                                                    </div>
                                                </td> */}
                                                <td>

                                                     <div className="d-flex align-items-center">
                                                        <div>
                                                            <div className="progress">
                                                                <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "60%"}} />
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </td>
                                                <td className="text-right">
                                                    <div className="dropdown">
                                                        <a className="btn btn-sm btn-icon-only text-light" href="/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i className="fas fa-ellipsis-v" />
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                                            <a className="dropdown-item" href="/">Action</a>
                                                            <a className="dropdown-item" href="/">Another action</a>
                                                            <a className="dropdown-item" href="/">Something else here</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer py-4">
                                    <nav aria-label="...">
                                        <ul className="pagination justify-content-end mb-0">
                                            <li className="page-item disabled">
                                                <a className="page-link" href="/" tabIndex="-1">
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
                                                </a>
                                            </li>
                                            <li className="page-item active">
                                                <a className="page-link" href="/">1</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="/">2 <span className="sr-only">(current)</span></a>
                                            </li>
                                            <li className="page-item"><a className="page-link" href="/">3</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="/">
                                                    <i className="fas fa-angle-right" />
                                                    <span className="sr-only">Next</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="footer">
                        <div className="row align-items-center justify-content-xl-between">
                            <div className="col-xl-6">
                                <div className="copyright text-center text-xl-left text-muted">
                                    &copy; 2018 <a href="https://www.creative-tim.com" className="font-weight-bold ml-1">Creative Tim</a>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                                    <li className="nav-item">
                                        <a href="https://www.creative-tim.com" className="nav-link">Creative Tim</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="https://www.creative-tim.com/presentation" className="nav-link">About Us</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="http://blog.creative-tim.com" className="nav-link">Blog</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md" className="nav-link">MIT License</a>
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
)(withRouter(UsersView));
