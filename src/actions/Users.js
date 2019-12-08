import axios from 'axios';
import * as types from '../constants/ActionTypes';
import domain from '../constants/config';

function getUsersSuccess(users) {
  return {
    type: types.LIST_USERS,
    users
  };
}

export const fetchListUsers = () => {
  return dispatch => {
    return axios
      .get(`${domain['server-domain']}/users`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`
        }
      })
      .then(res => {
        dispatch(getUsersSuccess(res.data));
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};

export const fetchUserByID = (id) => {
  return dispatch => {
    return axios
      .get(`${domain['server-domain']}/users/${  id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`
        }
      })
      .then(res => {
        dispatch(getUsersSuccess(res.data));
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};

