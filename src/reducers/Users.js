import * as types from '../constants/ActionTypes';

const initialState = {
  users: [],
  page: 1
};

function Users(state = initialState, action) {
  switch (action.type) {
    case types.LIST_USERS:
      return {
        ...state,
        users: action.users,
        page: action.page
      };
    case types.CHANGE_PAGE:
      return {
        ...state,
        page: action.page
      };
    default:
      return state;
  }
}

export default Users;
