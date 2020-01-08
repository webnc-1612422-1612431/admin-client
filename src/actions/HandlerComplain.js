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

export const fetchInformationSuccess = (information, complains) => {
  return {
    type: types.CONTRACT_DETAIL,
    information,
    complains
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

        // console.log(res.data.messages.get('-Lxj0Xw0rUgwCoWkrlUq'));
        // console.log(res.data.messages.message['-Lxj0Xw0rUgwCoWkrlUq']);
        const resKey = Object.keys(res.data.messages.message);
        const messages = [];
        for (let i = 0; i < resKey.length; i+=1) {
          messages.push(res.data.messages.message[resKey[i]]);
        }

        dispatch(fetchListMessageSuccess(messages));
        return true;
      })
      .catch(() => {
        // dispatch(LoginFail("Đăng nhập thất bại"));
        return false;
      });
  };
}


export function fetchContractDetail(id) {
  return dispatch => {
    // dispatch(LoginPending());
    return axios
      .post(`${domain['server-domain']}/contractdetail`,{
        id
      }, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`
        }
      })
      .then(res => {
        console.log(res.data.information);

        dispatch(fetchInformationSuccess(res.data.information, res.data.complains));
        return true;
      })
      .catch(() => {
        // dispatch(LoginFail("Đăng nhập thất bại"));
        console.log('bug');
        return false;
      });
  };
}

