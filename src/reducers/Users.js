import * as types from '../constants/ActionTypes';

const initialState = {
  users: [],
  page: 0
};

function Users(state = initialState, action) {
  switch (action.type) {
    case types.LIST_USERS:
      return {
        ...state,
        users: action.users,
        page: action.page
      };
    case types.CHANGE_PAGE_USERS:
      return {
        ...state,
        page: action.page
      };
    default:
      return state;
  }
}

export default Users;
