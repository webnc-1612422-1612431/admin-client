import axios from 'axios';
import * as types from '../constants/ActionTypes';
import domain from '../constants/config';

export const getListSuccess = messages => {
  return {
    type: types.LIST_MESSAGES,
    messages
  };
};

export const fetchAddMessage = message => {
    return {
        type: types.ADD_MESSAGE,
        message
    };
};

export const fetchClearMessage = () => {
  return {
      type: types.CLEAR_MESSAGE,
  };
};

export const fetchListMessageSuccess = (messages) => {
  return {
    type: types.GET_MESSAGES_SUCCESS,
    messages
  };
};

export function fetchListMessages(email1, email2) {
  return dispatch => {
    // dispatch(LoginPending());
    return axios
      .get(`${domain['server-domain']}/chatcontent/${email1}/${email2}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`
        }
      })
      .then(res => {
        console.log(res.data.messages);
        dispatch(fetchListMessageSuccess(res.data.messages));
        return true;
      })
      .catch(() => {
        // dispatch(LoginFail("Đăng nhập thất bại"));
        return false;
      });
  };
}