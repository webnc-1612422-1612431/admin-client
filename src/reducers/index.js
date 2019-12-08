import {combineReducers} from 'redux';
import AdminReducer from './Admin';
import UsersReducer from './Users';

export default combineReducers({
    AdminReducer, UsersReducer
});
