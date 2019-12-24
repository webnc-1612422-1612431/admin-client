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

function getTopSalesTeacherSuccess(topSalesByTeacher) {
  return {
    type: types.GET_TOP_SALES_BY_TEACHER,
    topSalesByTeacher
  };
}

function getTopSalesSkillSuccess(topSalesBySkill) {
  return {
    type: types.GET_TOP_SALES_BY_SKILL,
    topSalesBySkill
  };
}

export const fetchChartData = (type) => {
  console.log(type);
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
        console.log(res.data);
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
      .get(`${domain['server-domain']}/chartdata`,{
        type
      }, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`
        }
      })
      .then(res => {
        console.log(res.data);
        dispatch(getTopSalesTeacherSuccess(res.data));
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
      .get(`${domain['server-domain']}/chartdata`,{
        type
      }, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`
        }
      })
      .then(res => {
        console.log(res.data);
        dispatch(getTopSalesSkillSuccess(res.data));
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};