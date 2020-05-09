import { combineReducers } from 'redux';

import user from './user-reducer';
import employee from "./employee-reducer";
import app from './app-reducer';
import company from './company-reducer';

export default combineReducers({
    user,
    employee,
    app,
    company,
});