import axios from 'axios';
import * as types from '../constants/ActionTypes';
import domain from '../constants/config';

function getContractsSuccess(contracts) {
  return {
    type: types.LIST_CONTRACTS,
    contracts,
    page: 0
  };
}

function updateContractsSuccess() {
  return {
    type: types.UPDATE_CONTRACTS_SUCCESS,
  };
}

export const changePage = (page) => {
  return {
    type: types.CHANGE_PAGE,
    page
  };
};

export const fetchListContracts = () => {
  return dispatch => {
    return axios
      .get(`${domain['server-domain']}/contracts`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`
        }
      })
      .then(res => {
        console.log(res.data);
        dispatch(getContractsSuccess(res.data));
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};

export const fetchUpdateContract = (complain) => {
  return dispatch => {
    return axios
      .post(`${domain['server-domain']}/complain`,
      {
        complain
      }, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`
        }
      })
      .then(() => {
        dispatch(updateContractsSuccess());
        console.log('thanhf coong');
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};