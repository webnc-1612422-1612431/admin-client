import * as types from '../constants/ActionTypes'
import axios from 'axios';

const localStorage = require('localStorage');

function LoginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
}

function LoginFail(error) {
  return {
    type: types.LOGIN_FAIL,
    error
  };
}

function LoginPending() {
  return {
    type: types.LOGIN_PENDING,
  };
}


function fetchLogin(email, password) {
  return dispatch => {
    dispatch(LoginPending());
    return axios
      .post(`http://localhost:4000/admin/login`, {
        email,
        password
      })
      .then(res => {
        if (!res.data.token) {
          dispatch(LoginFail("Đăng nhập thất bại"));
          return false;
        }

        localStorage.setItem(
          'user',
          JSON.stringify({
            fullname: res.data.user.fullname,
            token: res.data.token
          })
        );
        dispatch(LoginSuccess(res.data.user));
        return true;
      })
      .catch(error => {
        dispatch(LoginFail("Đăng nhập thất bại"));
        return false;
      });
  };
}

export default fetchLogin;
