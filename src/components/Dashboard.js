import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  fetchChartData,
  fetchTopSalesBySkill,
  fetchTopSalesByTeacher
} from '../actions/Dashboard';

const localStorage = require('localStorage');

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const user = localStorage.getItem('user');
    // console.log(user);
    if (user === null) {
      const { history } = this.props;
      history.push('/login');
    }
    const { fetchChartDataAction } = this.props;
    fetchChartDataAction('date');
  }

  handleChangeTypeChart = type => {
    const { fetchChartDataAction } = this.props;
    fetchChartDataAction(type);
  };

  render() {
    const { DashboardState } = this.props;
    const { chartData, typeChart } = DashboardState;
    let datakey;
    switch (typeChart) {
      case 'date':
      case 'week':
        datakey = 'date';
        break;
      case 'month':
        datakey = 'month';
        break;
      case 'year':
        datakey = 'year';
        break;
      default:
        datakey = 'object';
        break;
    }

    const renderLineChart = (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData.chartData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            strokeWidth={3}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey={datakey} />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    );

    const listItemChart = [];
    if (typeChart === 'date') {
      listItemChart.push(
        <li className="nav-item mr-2 mr-md-0">
          <button
            type="button"
            onClick={this.handleChangeTypeChart.bind(this, 'date')}
            className="nav-link py-2 px-3 active"
            data-toggle="tab"
          >
            <span className="d-none d-md-block">Day</span>
            <span className="d-md-none">D</span>
          </button>
        </li>
      );
    } else {
      listItemChart.push(
        <li className="nav-item mr-2 mr-md-0">
          <button
            type="button"
            onClick={this.handleChangeTypeChart.bind(this, 'date')}
            className="nav-link py-2 px-3"
            data-toggle="tab"
          >
            <span className="d-none d-md-block">Day</span>
            <span className="d-md-none">D</span>
          </button>
        </li>
      );
    }

    if (typeChart === 'week') {
      listItemChart.push(
        <li className="nav-item mr-2 mr-md-0">
          <button
            type="button"
            onClick={this.handleChangeTypeChart.bind(this, 'week')}
            className="nav-link py-2 px-3 active"
            data-toggle="tab"
          >
            <span className="d-none d-md-block">Week</span>
            <span className="d-md-none">W</span>
          </button>
        </li>
      );
    } else {
      listItemChart.push(
        <li className="nav-item mr-2 mr-md-0">
          <button
            type="button"
            onClick={this.handleChangeTypeChart.bind(this, 'week')}
            className="nav-link py-2 px-3"
            data-toggle="tab"
          >
            <span className="d-none d-md-block">Week</span>
            <span className="d-md-none">W</span>
          </button>
        </li>
      );
    }

    if (typeChart === 'month') {
      listItemChart.push(
        <li className="nav-item mr-2 mr-md-0">
          <button
            type="button"
            onClick={this.handleChangeTypeChart.bind(this, 'month')}
            className="nav-link py-2 px-3 active"
            data-toggle="tab"
          >
            <span className="d-none d-md-block">Month</span>
            <span className="d-md-none">M</span>
          </button>
        </li>
      );
    } else {
      listItemChart.push(
        <li className="nav-item mr-2 mr-md-0">
          <button
            type="button"
            onClick={this.handleChangeTypeChart.bind(this, 'month')}
            className="nav-link py-2 px-3"
            data-toggle="tab"
          >
            <span className="d-none d-md-block">Month</span>
            <span className="d-md-none">M</span>
          </button>
        </li>
      );
    }

    if (typeChart === 'year') {
      listItemChart.push(
        <li className="nav-item mr-2 mr-md-0">
          <button
            type="button"
            onClick={this.handleChangeTypeChart.bind(this, 'year')}
            className="nav-link py-2 px-3 active"
            data-toggle="tab"
          >
            <span className="d-none d-md-block">Year</span>
            <span className="d-md-none">Y</span>
          </button>
        </li>
      );
    } else {
      listItemChart.push(
        <li className="nav-item mr-2 mr-md-0">
          <button
            type="button"
            onClick={this.handleChangeTypeChart.bind(this, 'year')}
            className="nav-link py-2 px-3"
            data-toggle="tab"
          >
            <span className="d-none d-md-block">Year</span>
            <span className="d-md-none">Y</span>
          </button>
        </li>
      );
    }

    return (
      <div className="main-content">
        <nav
          className="navbar navbar-top navbar-expand-md navbar-dark"
          id="navbar-main"
        >
          <div className="container-fluid">
            <a
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              href="./index.html"
            >
              Dashboard
            </a>
            <form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <div className="form-group mb-0">
                <div className="input-group input-group-alternative">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-search" />
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Search"
                    type="text"
                  />
                </div>
              </div>
            </form>
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
                      <img alt="" src="./assets/img/theme/team-4-800x800.jpg" />
                    </span>
                    <div className="media-body ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm  font-weight-bold">
                        Jessica Jones
                      </span>
                    </div>
                  </div>
                </a>
                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                  <div className=" dropdown-header noti-title">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </div>
                  <a href="./examples/profile.html" className="dropdown-item">
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </a>
                  <a href="./examples/profile.html" className="dropdown-item">
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </a>
                  <a href="./examples/profile.html" className="dropdown-item">
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </a>
                  <a href="./examples/profile.html" className="dropdown-item">
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </a>
                  <div className="dropdown-divider" />
                  <a href="#!" className="dropdown-item">
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8">
          <div className="container-fluid">
            <div className="header-body">
              <div className="row">
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Traffic
                          </h5>
                          <span className="h2 font-weight-bold mb-0">
                            350,897
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-chart-bar" />
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            New users
                          </h5>
                          <span className="h2 font-weight-bold mb-0">
                            2,356
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 3.48%
                        </span>
                        <span className="text-nowrap">Since last week</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Sales
                          </h5>
                          <span className="h2 font-weight-bold mb-0">924</span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>
                        <span className="text-nowrap">Since yesterday</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6">
                  <div className="card card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            Performance
                          </h5>
                          <span className="h2 font-weight-bold mb-0">
                            49,65%
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 12%
                        </span>
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt--7">
          <div className="row">
            <div className="col-xl-12 mb-5 mb-xl-0">
              <div className="card shadow">
                <div className="card-header bg-transparent">
                  <div className="row align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <ul className="nav nav-pills justify-content-end">
                        {listItemChart}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">{renderLineChart}</div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-xl-8 mb-5 mb-xl-0">
              <div className="card shadow">
                <div className="card-header border-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Page visits</h3>
                    </div>
                    <div className="col text-right">
                      <a href="#!" className="btn btn-sm btn-primary">
                        See all
                      </a>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Page name</th>
                        <th scope="col">Visitors</th>
                        <th scope="col">Unique users</th>
                        <th scope="col">Bounce rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">/argon/</th>
                        <td>4,569</td>
                        <td>340</td>
                        <td>
                          <i className="fas fa-arrow-up text-success mr-3" />{' '}
                          46,53%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/argon/index.html</th>
                        <td>3,985</td>
                        <td>319</td>
                        <td>
                          <i className="fas fa-arrow-down text-warning mr-3" />{' '}
                          46,53%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/argon/charts.html</th>
                        <td>3,513</td>
                        <td>294</td>
                        <td>
                          <i className="fas fa-arrow-down text-warning mr-3" />{' '}
                          36,49%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/argon/tables.html</th>
                        <td>2,050</td>
                        <td>147</td>
                        <td>
                          <i className="fas fa-arrow-up text-success mr-3" />{' '}
                          50,87%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/argon/profile.html</th>
                        <td>1,795</td>
                        <td>190</td>
                        <td>
                          <i className="fas fa-arrow-down text-danger mr-3" />{' '}
                          46,53%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="card shadow">
                <div className="card-header border-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Social traffic</h3>
                    </div>
                    <div className="col text-right">
                      <a href="#!" className="btn btn-sm btn-primary">
                        See all
                      </a>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Referral</th>
                        <th scope="col">Visitors</th>
                        <th scope="col"> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Facebook</th>
                        <td>1,480</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">60%</span>
                            <div>
                              <div className="progress">
                                <div
                                  className="progress-bar bg-gradient-danger"
                                  role="progressbar"
                                  aria-valuenow="60"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  style={{ width: '60%' }}
                                >
                                  {' '}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Facebook</th>
                        <td>5,480</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">70%</span>
                            <div>
                              <div className="progress">
                                <div
                                  className="progress-bar bg-gradient-success"
                                  role="progressbar"
                                  aria-valuenow="70"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  style={{ width: '70%' }}
                                >
                                  {' '}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Google</th>
                        <td>4,807</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">80%</span>
                            <div>
                              <div className="progress">
                                <div
                                  className="progress-bar bg-gradient-primary"
                                  role="progressbar"
                                  aria-valuenow="80"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  style={{ width: '80%' }}
                                >
                                  {' '}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Instagram</th>
                        <td>3,678</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">75%</span>
                            <div>
                              <div className="progress">
                                <div
                                  className="progress-bar bg-gradient-info"
                                  role="progressbar"
                                  aria-valuenow="75"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  style={{ width: '75%' }}
                                >
                                  {' '}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">twitter</th>
                        <td>2,645</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">30%</span>
                            <div>
                              <div className="progress">
                                <div
                                  className="progress-bar bg-gradient-warning"
                                  role="progressbar"
                                  aria-valuenow="30"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  style={{ width: '30%' }}
                                >
                                  {' '}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
                    target="blank"
                  >
                    Creative Tim
                  </a>
                </div>
              </div>
              <div className="col-xl-6">
                <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                  <li className="nav-item">
                    <a
                      href="https://www.creative-tim.com"
                      className="nav-link"
                      target="blank"
                    >
                      Creative Tim
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://www.creative-tim.com/presentation"
                      className="nav-link"
                      target="blank"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="http://blog.creative-tim.com"
                      className="nav-link"
                      target="blank"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md"
                      className="nav-link"
                      target="blank"
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
  AdminState: state.AdminReducer,
  DashboardState: state.DashboardReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchChartDataAction: fetchChartData,
      fetchTopSalesBySkillAction: fetchTopSalesBySkill,
      fetchTopSalesByTeacherAction: fetchTopSalesByTeacher
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
