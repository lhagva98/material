import { combineReducers } from 'redux';

import user from './user-reducer';
import employee from "./employee-reducer";
import app from './app-reducer';

export default combineReducers({
    user,
    employee,
    app,
});