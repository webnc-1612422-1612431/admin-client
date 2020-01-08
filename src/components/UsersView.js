/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchListUsers, changePage } from '../actions/Users';

import '../App.css';
import '../assets/js/plugins/nucleo/css/nucleo.css';
import '../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/argon-dashboard.css';
import Footer from './layout/Footer';
import Header from './layout/Header';

class UsersView extends React.Component {
  constructor(props) {
    super(props);
    const user = localStorage.getItem('user');
    if (user === null) {
      window.location.href = '/login';
    }
    const { fetchListUsersAction } = this.props;
    fetchListUsersAction();
  }

  rowHandleClick = row => {
    const { history } = this.props;
    history.push(`/userInfo/${row}`);
  };

  handleClickPage = page => {
    const { fetchChangePage } = this.props;
    fetchChangePage(page);
  };

  render() {
    const { UsersState } = this.props;
    const { users, page } = UsersState;
    const tableContent = [];
    const pagination = [];

    if (page === Math.floor(users.length / 5)) {
      this.end = users.length;
    } else {
      this.end = 5 * (page + 1);
    }

    for (let i = 5 * page; i < this.end; i += 1) {
      tableContent.push(
        <tr onClick={this.rowHandleClick.bind(this, i)}>
          <th scope="row">
            <div className="media align-items-center">
              <a href="/" className="avatar rounded-circle mr-3">
                <img alt="" src="../assets/img/theme/bootstrap.jpg" />
              </a>
              <div className="media-body">
                <span className="mb-0 text-sm">{users[i].email}</span>
              </div>
            </div>
          </th>
          <td>{users[i].fullname}</td>
          <td>{users[i].role}</td>
          <td>{users[i].contracts}</td>
          <td>
            <div className="d-flex align-items-center">
              <div>
                {Math.round(users[i].rate)} 
                <img src="star.png" alt="" style={{width: '30px', height: '30px', marginTop: '-5px'}}/>
              </div>
            </div>
          </td>
        </tr>
      );
    }

    for (let i = 0; i < users.length / 5; i += 1) {
      if (i === page) {
        pagination.push(
          <li className="page-item active">
            <button
              className="page-link"
              type="button"
              onClick={this.handleClickPage.bind(this, i)}
            >
              {i + 1}
            </button>
          </li>
        );
      } else {
        pagination.push(
          <li className="page-item">
            <button
              className="page-link"
              type="button"
              onClick={this.handleClickPage.bind(this, i)}
            >
              {i + 1}
            </button>
          </li>
        );
      }
    }

    return (
      <div className="main-content">
        <Header isDisplay={1}/>
        
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
                      </tr>
                    </thead>
                    <tbody> {tableContent}</tbody>
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
                      {pagination}
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
          <Footer/>
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
      fetchChangePage: changePage
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UsersView));
