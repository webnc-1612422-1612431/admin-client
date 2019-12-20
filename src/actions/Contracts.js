import axios from 'axios';
import * as types from '../constants/ActionTypes';
import domain from '../constants/config';

function getContractsSuccess(contracts) {
  return {
    type: types.LIST_CONTRACTS,
    contracts,
    page: 1
  };
}

// function updateContractStateSuccess(users) {
//   return {
//     type: types.UPDATE_USER_STATE_SUCCESS,
//     users
//   };
// }

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
        dispatch(getContractsSuccess(res.data));
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};
