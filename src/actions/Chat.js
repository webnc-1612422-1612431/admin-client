import * as types from '../constants/ActionTypes';

export function addChat(message) {
  return {
    type: types.ADD_CHAT,
    message
  };
}

export function addBox(box) {
  return {
    type: types.ADD_BOX,
    box
  };
}

export function clearChat() {
  return {
    type: types.CLEAR_CHAT
  };
}

export function clearBox() {
  return {
    type: types.CLEAR_BOX
  };
}