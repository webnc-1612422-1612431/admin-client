import * as types from '../constants/ActionTypes';

const initialState = {
  contracts: [],
  page: 0
};

function Contracts(state = initialState, action) {
  switch (action.type) {
    case types.LIST_CONTRACTS:
      return {
        ...state,
        contracts: action.contracts,
        page: action.page
      };
    case types.CHANGE_PAGE:
      return {
        ...state,
        page: action.page
      };
    case types.UPDATE_CONTRACTS_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default Contracts;
