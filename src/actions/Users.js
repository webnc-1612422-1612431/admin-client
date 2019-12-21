import axios from 'axios';
import * as types from '../constants/ActionTypes';
import domain from '../constants/config';

function getUsersSuccess(users) {
  return {
    type: types.LIST_USERS,
    users,
    page: 0
  };
}

function updateUserStateSuccess(users) {
  return {
    type: types.UPDATE_USER_STATE_SUCCESS,
    users,
    page: 0
  };
}

export const changePage = (page) => {
  return {
    type: types.CHANGE_PAGE,
    page
  };
};

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

export const updateUserState = (user) => {
  return dispatch => {
    return axios
      .post(`${domain['server-domain']}/updateuser`,
      {
          user
      }, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`
        }
      })
      .then(res => {
        dispatch(updateUserStateSuccess(res.data));
        return true;
      })
      .catch(() => {
        return false;
      });
  };
};
