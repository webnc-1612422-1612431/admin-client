import * as types from '../constants/ActionTypes';

const initialState = {
    user: null,
    pending: false,
    error: null
};

function UserInfo(state = initialState, action) {
    switch (action.type) {
      case types.UPDATE_USER_STATE_SUCCESS:
          return {
              ...state,
              user: action.user
          };
      default:
        return state;
    }
  }
  
  export default UserInfo;
  