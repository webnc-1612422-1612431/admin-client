import * as types from '../constants/ActionTypes';

const initialState = {
    contracts: [],
    page: 1,
};

function Contracts(state = initialState, action) {
    switch (action.type) {
      case types.LIST_CONTRACTS:
          return {
              ...state,
              contracts: action.contracts,
              page: action.page
          };
      default:
        return state;
    }
  }
  
  export default Contracts;
  