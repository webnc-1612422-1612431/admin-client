import * as types from '../constants/ActionTypes';

const initialState = {
  messages: [],
  pending: false
};

function HandlerComplain(state = initialState, action) {
  switch (action.type) {
    case types.LIST_MESSAGES:
      return {
        ...state,
        messages: action.messages
      };
    case types.ADD_MESSAGE:
      state.messages.push(action.message);
      return {
        ...state
      };
    case types.CLEAR_MESSAGE:
      return {
          ...state,
          messages: [],
          pending: false
      };
      case types.GET_MESSAGES_SUCCESS:
        return {
          ...state,
          messages: action.messages
        };
    default:
      return state;
  }
}

export default HandlerComplain;
