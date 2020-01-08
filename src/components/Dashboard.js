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
  fetchTopSalesByTeacher,
  fetchSummaryReport
} from '../actions/Dashboard';
import Footer from './layout/Footer';
import Header from './layout/Header';

const localStorage = require('localStorage');

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const user = localStorage.getItem('user');
    console.log(user);
    if (user === null) {
      window.location.href = '/login';
    }

    const {
      fetchChartDataAction,
      fetchTopSalesByTeacherAction,
      fetchTopSalesBySkillAction,
      fetchSummaryReportAction
    } = this.props;
    fetchChartDataAction('date');
    fetchTopSalesByTeacherAction(1);
    fetchTopSalesBySkillAction(1);
    fetchSummaryReportAction();
  }

  handleChangeTypeChart = type => {
    const { fetchChartDataAction } = this.props;
    fetchChartDataAction(type);
  };

  handleChangeTypeTeacher = type => {
    const { fetchTopSalesByTeacherAction } = this.props;
    fetchTopSalesByTeacherAction(type);
  };

  handleChangeTypeSkill = type => {
    const { fetchTopSalesBySkillAction } = this.props;
    fetchTopSalesBySkillAction(type);
  };

  render() {
    const { DashboardState } = this.props;
    const {
      chartData,
      typeChart,
      topSalesByTeacher,
      typeTeacher,
      topSalesBySkill,
      typeSkill,
      summaryReport
    } = DashboardState;

    // start of teacher
    const listTypeTeacher = [];
    const typeTeacherArray = [1, 7, 30, 90];
    for (let i = 0; i < typeTeacherArray.length; i += 1) {
      if (typeTeacher === typeTeacherArray[i]) {
        listTypeTeacher.push(
          <li className="nav-item mr-2 mr-md-0">
            <button
              type="button"
              className="nav-link py-2 px-3 active"
              data-toggle="tab"
            >
              <span className="d-none d-md-block">
                {typeTeacherArray[i]} day
              </span>
              <span className="d-md-none">{typeTeacherArray[i]}</span>
            </button>
          </li>
        );
      } else {
        listTypeTeacher.push(
          <li className="nav-item mr-2 mr-md-0">
            <button
              type="button"
              onClick={this.handleChangeTypeTeacher.bind(
                this,
                typeTeacherArray[i]
              )}
              className="nav-link py-2 px-3"
              data-toggle="tab"
            >
              <span className="d-none d-md-block">
                {typeTeacherArray[i]} day
              </span>
              <span className="d-md-none">{typeTeacherArray[i]}</span>
            </button>
          </li>
        );
      }
    }

    const listItemTeacher = [];
    for (let i = 0; i < topSalesByTeacher.length; i += 1) {
      listItemTeacher.push(
        <tr>
          <td className="text-center">{i + 1}</td>
          <th scope="row">
            <div className="media align-items-center">
              <a href="/" className="avatar rounded-circle mr-3">
                <img alt="" style={{width: '47px', height: '47px'}} src={topSalesByTeacher[i].avatar} />
              </a>
              <div className="media-body">
                <span className="mb-0 text-sm">
                  {topSalesByTeacher[i].email}
                </span>
              </div>
            </div>
          </th>
          <td>{topSalesByTeacher[i].fullname}</td>
          <td>{topSalesByTeacher[i].sales}</td>
        </tr>
      );
    }
    // end of teacher

    // start of chart
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
          margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
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

    const typeChartArray = ['date', 'week', 'month', 'year'];
    const listItemChart = [];
    for (let i = 0; i < typeChartArray.length; i += 1) {
      if (typeChart === typeChartArray[i]) {
        listItemChart.push(
          <li className="nav-item mr-2 mr-md-0">
            <button
              type="button"
              className="nav-link py-2 px-3 active"
              data-toggle="tab"
            >
              <span className="d-none d-md-block">
                {typeChartArray[i][0].toLocaleUpperCase() +
                  typeChartArray[i].slice(1)}
              </span>
              <span className="d-md-none">
                {typeChartArray[i].substring(0, 1).toLocaleUpperCase()}
              </span>
            </button>
          </li>
        );
      } else {
        listItemChart.push(
          <li className="nav-item mr-2 mr-md-0">
            <button
              type="button"
              onClick={this.handleChangeTypeChart.bind(this, typeChartArray[i])}
              className="nav-link py-2 px-3"
              data-toggle="tab"
            >
              <span className="d-none d-md-block">
                {typeChartArray[i][0].toLocaleUpperCase() +
                  typeChartArray[i].slice(1)}
              </span>
              <span className="d-md-none">
                {typeChartArray[i].substring(0, 1).toLocaleUpperCase()}
              </span>
            </button>
          </li>
        );
      }
    }
    // end of chart

    // start of skill
    const listTypeSkill = [];
    const typeSkillArray = [1, 7, 30, 90];
    for (let i = 0; i < typeSkillArray.length; i += 1) {
      if (typeSkill === typeSkillArray[i]) {
        listTypeSkill.push(
          <li className="nav-item mr-2 mr-md-0">
            <button
              type="button"
              className="nav-link py-2 px-3 active"
              data-toggle="tab"
            >
              <span className="d-none d-md-block">{typeSkillArray[i]} day</span>
              <span className="d-md-none">{typeSkillArray[i]}</span>
            </button>
          </li>
        );
      } else {
        listTypeSkill.push(
          <li className="nav-item mr-2 mr-md-0">
            <button
              type="button"
              onClick={this.handleChangeTypeSkill.bind(this, typeSkillArray[i])}
              className="nav-link py-2 px-3"
              data-toggle="tab"
            >
              <span className="d-none d-md-block">{typeSkillArray[i]} day</span>
              <span className="d-md-none">{typeSkillArray[i]}</span>
            </button>
          </li>
        );
      }
    }

    const listItemSkill = [];
    for (let i = 0; i < topSalesBySkill.length; i += 1) {
      listItemSkill.push(
        <tr>
          <td className="text-center">{i + 1}</td>
          <th scope="row">
            <div className="media align-items-center">
              <div className="media-body">
                <span className="mb-0 text-sm">{topSalesBySkill[i].skill}</span>
              </div>
            </div>
          </th>
          <td>{topSalesBySkill[i].contract}</td>
          <td>{topSalesBySkill[i].users}</td>
          <td>{topSalesBySkill[i].sales}</td>
        </tr>
      );
    }
    // end of skill

    return (
      <div className="main-content">
        <Header isDisplay={0} />
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
                            SALES
                          </h5>
                          <span className="h2 font-weight-bold mb-0">
                            {summaryReport.sales}$
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
                            Users
                          </h5>
                          <span className="h2 font-weight-bold mb-0">
                            {summaryReport.users}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-users" />
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
                            Contract
                          </h5>
                          <span className="h2 font-weight-bold mb-0">
                            {summaryReport.contracts}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-file" />
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
                            Skill
                          </h5>
                          <span className="h2 font-weight-bold mb-0">
                            {summaryReport.skills}
                          </span>
                        </div>
                        <div className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fa fa-android" />
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
            <div className="col-xl-12 mb-5 mb-xl-0">
              <div className="card shadow">
                <div className="card-header border-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Top 5 sales by teacher</h3>
                    </div>
                    <div className="col text-right">
                      <ul className="nav nav-pills justify-content-end">
                        {listTypeTeacher}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" className="text-center">
                          Rank
                        </th>
                        <th scope="col">Email</th>
                        <th scope="col">Fullname</th>
                        <th scope="col">Sales</th>
                      </tr>
                    </thead>
                    <tbody>{listItemTeacher}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-xl-12 mb-5 mb-xl-0">
              <div className="card shadow">
                <div className="  card-header border-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Top 5 sales by skill</h3>
                    </div>
                    <div className="col text-right">
                      <ul className="nav nav-pills justify-content-end">
                        {listTypeSkill}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" className="text-center">
                          Rank
                        </th>
                        <th scope="col">Skill name</th>
                        <th scope="col">Total contract</th>
                        <th scope="col">Total user</th>
                        <th scope="col">Sales</th>
                      </tr>
                    </thead>
                    <tbody>{listItemSkill}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Footer />
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
      fetchTopSalesByTeacherAction: fetchTopSalesByTeacher,
      fetchSummaryReportAction: fetchSummaryReport
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard));
