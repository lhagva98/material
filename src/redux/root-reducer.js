import { combineReducers } from 'redux';

import user from './user-reducer';
import employee from "./employee-reducer";

export default combineReducers({
    user,
    employee,
    
});