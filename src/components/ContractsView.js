import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import {
    fetchListContracts,
    fetchChangePage
} from '../actions/Contracts';


import '../App.css';
import '../assets/js/plugins/nucleo/css/nucleo.css';
import '../assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/argon-dashboard.css';
import Footer from './layout/Footer';
import Header from './layout/Header';

const ls = require('localStorage');

class ContractView extends React.Component {
  constructor(props) {
    super(props);
    const { fetchListContractsAction } = this.props;
    const user = JSON.parse(ls.getItem('user'));
    if (user === null) {
      window.location.href = '/login';
    }
    fetchListContractsAction();
  }

  handleClickPage = page => {
    const { fetchChangePageAction } = this.props;
    fetchChangePageAction(page);
  };

  rowHandleClick = (teacher, student, contractid) => {
    const {history} = this.props;
    history.push(`/hanlercomplain/${teacher}/${student}/${contractid}`);
  }

  render() {
    const { ContractsState } = this.props;
    const { contracts, page } = ContractsState;
    const tableContent = [];
    const pagination = [];

    if (contracts.length === 0) {
      this.end = 0;
    } else if (page === Math.floor(contracts.length / 5)) {
      this.end = contracts.length;
    } else {
      this.end = 5 * (page + 1);
    }

    for (let i = 5 * page; i < this.end; i += 1) {
      tableContent.push(
        <tr onClick={this.rowHandleClick.bind(this, contracts[i].teacheremail, contracts[i].studentemail, contracts[i].contractid)}>
          <th scope="row">
            <div className="media align-items-center">
              
              <div className="media-body">
                <span className="mb-0 text-sm">{contracts[i].teachername}</span>
              </div>
            </div>
          </th>
          <th scope="row">
            <div className="media align-items-center">
              
              <div className="media-body">
                <span className="mb-0 text-sm">{contracts[i].studentname}</span>
              </div>
            </div>
          </th>
          <td>{contracts[i].revenue}$/h</td>
          <td>{contracts[i].startdate.toString().substring(0,10)}</td>
          <td>{contracts[i].enddate.toString().substring(0,10)}</td>
          <td>
            <i className={contracts[i].numbercomplain === 0 ? "ni ni-bell-55 text-green text-center" : "ni ni-bell-55 text-red"}/>
          </td>
        </tr>
      );
    }

    for (let i = 0; i < contracts.length / 5; i += 1) {
      if (i === page){
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
      );} else {
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
                        <th scope="col">Teacher</th>
                        <th scope="col">Student</th>
                        <th scope="col">Revenue</th>
                        <th scope="col">Start</th>
                        <th scope="col">End</th>
                        <th scope="col"> </th>
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
}}

const mapStateToProps = state => ({
  ContractsState: state.ContractsReducer,
  AdminState: state.AdminReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        fetchListContractsAction: fetchListContracts,
        fetchChangePageAction: fetchChangePage
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContractView));
