import * as types from '../constants/ActionTypes';

function GetInitialState() {
  const state = {
    user: null,
    error: null,
    pending: false
  };

  const userInfo = JSON.parse(localStorage.getItem('user'));
  
  if (userInfo !== null) {
    const {user} = userInfo;
    return {
      ...state,
      user
    };
  }
  return state;
}

const initialState = GetInitialState();

function Admin(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_FAIL:
      return {
        ...state,
        error: action.error,
        pending: false
      };
    case types.LOGIN_PENDING:
      return {
        ...state,
        pending: true,
        error: null
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        user: action.user
      };
    case types.CREATE_ADMIN_PENDING:
      return {
        ...state,
        pending: true,
        error: null
      };
    case types.CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null
      };
    case types.CREATE_ADMIN_FAIL:
      return {
        ...state,
        pending: false,
        error: action.error
      };

    case types.LOGOUT:
      return {
        initialState,
        error: null
      };

    default:
      return state;
  }
}

export default Admin;
