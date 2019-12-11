import * as types from '../constants/ActionTypes';

const initialState = {
  skills: [],
  page: 1,
  pending: false
};

function Users(state = initialState, action) {
  switch (action.type) {
    case types.LIST_SKILLS_SUCCESS:
      return {
        ...state,
        skills: action.skills,
        pending: false
      };
    case types.LIST_SKILLS_PENDING:
      return {
        ...state,
        pending: true
      };
    case types.LIST_SKILLS_FAIL:
      return {
        ...state,
        pending: false
      };
    case types.ADD_NEW_SKILL:
      state.skills.push(action.skill);
      return {
        ...state,
        pending: false
      };
    case types.UPDATE_STATUS_SKILL:
      return {
        ...state,
        pending: false
      };
    case types.UPDATE_SKILL_NAME:
      return {
        ...state,
        pending: false
      };
    default:
      return state;
  }
}

export default Users;
