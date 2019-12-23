import { combineReducers } from 'redux';
import AdminReducer from './Admin';
import UsersReducer from './Users';
import SkillsReducer from './Skills';
import ContractsReducer from './Contracts';
import HandlerComplainReducer from './HandlerComplain';
import ChatReducer from './Chat';

export default combineReducers({
  AdminReducer,
  UsersReducer,
  SkillsReducer,
  ContractsReducer,
  HandlerComplainReducer,
  ChatReducer
});
