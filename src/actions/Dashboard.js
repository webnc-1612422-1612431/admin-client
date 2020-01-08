import axios from 'axios';
import * as types from '../constants/ActionTypes';
import domain from '../constants/config';

function getChartDataSuccess(chartData, typeChart) {
  return {
    type: types.GET_CHART_DATA,
    chartData,
    typeChart
  };
}

function getTopSalesTeacherSuccess(topSalesByTeacher, typeTeacher) {
  return {
    type: types.GET_TOP_SALES_BY_TEACHER,
    topSalesByTeacher,
    typeTeacher
  };
}

function getTopSalesSkillSuccess(topSalesBySkill, typeSkill) {
  return {
    type: types.GET_TOP_SALES_BY_SKILL,
    topSalesBySkill,
    typeSkill
  };
}

function getSummarySuccess(summaryReport) {
  return {
    type: types.GET_SUMMARY_REPORT,
    summaryReport
  };
}

export const fetchChartData = (type) => {
  return dispatch => {
        return axios
      .post(`${domain['server-domain']}/chartdata`,{
        type
      }, {  
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`
        }
      })
      .then(res => {
        dispatch(getChartDataSuccess(res.data, type));
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};

export const fetchTopSalesByTeacher = (type) => {
  return dispatch => {
    return axios
      .post(`${domain['server-domain']}/salesbyteacher`,{
        type
      }, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`
        }
      })
      .then(res => {
        dispatch(getTopSalesTeacherSuccess(res.data, type));
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};

export const fetchTopSalesBySkill = (type) => {
  return dispatch => {
    return axios
      .post(`${domain['server-domain']}/salesbyskill`,{
        type
      }, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`
        }
      })
      .then(res => {
        dispatch(getTopSalesSkillSuccess(res.data, type));
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};

export const fetchSummaryReport = () => {
  return dispatch => {
    return axios
      .get(`${domain['server-domain']}/summaryreport`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`
        }
      })
      .then(res => {
        dispatch(getSummarySuccess(res.data));
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};