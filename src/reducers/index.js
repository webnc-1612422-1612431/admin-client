import {combineReducers} from 'redux';
import AdminReducer from './Admin';
import UsersReducer from './Users';
import SkillsReducer from './Skills';
import ContractsReducer from './Contracts';


export default combineReducers({
    AdminReducer, UsersReducer, SkillsReducer, ContractsReducer
});
