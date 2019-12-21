import * as types from '../constants/ActionTypes';

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


