import * as types from '../constants/ActionTypes';

const initialState = {
  messages: [],
  messageBoxs: []
};

function Chat(state = initialState, action) {
  switch (action.type) {
    case types.ADD_CHAT:
      state.messages.push(action.message);
      return {
        ...state
      };
    case types.ADD_BOX:
      state.messageBoxs.push(action.box);
      return {
        ...state
      };
    case types.CLEAR_CHAT:
      return {
        ...state,
        messages: []
      };
    case types.CLEAR_BOX:
      return {
        ...state,
        messageBoxs: []
      };
    default:
      return state;
  }
}

export default Chat;
