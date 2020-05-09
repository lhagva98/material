import Axios from "axios";
import store from '../redux/store';
import { FETCH_EMPLOYEES_SUCCESS } from '../types';

import { employeeRoles } from "../constants";

const user = store.getState().user.currentUser;

export const setCurrentUser = user => {
  console.log("IN_ACTION ", user);
  return ({
    type: 'SET_CURRENT_USER',
    payload: user
  })
};

export const fetchEmployee = () => {
  return function (dispatch) {
    console.log("FETCH_EMP_ACTION_", user)
    Axios.get(`employees/findAll/${user.companyId}`)
      .then(res => {
        var ddata = res.data.emp;
        var darray = Object.keys(ddata).map(key => {
          var cname = '';
          if (ddata[key].department)
            if (ddata[key].department.name !== 0) {
              cname = ddata[key].department.name;
            } else {
              cname = '';
            }
          return [ddata[key].lastname, ddata[key].firstname, cname, employeeRoles[ddata[key].role - 1].name, ddata[key].id];
        });

        dispatch({
          type: FETCH_EMPLOYEES_SUCCESS,
          payload: {
            darray,
            ddata
          }
        })
      })
      .catch(err => { console.log('EMP_DATA_FETCH_', err) })
  }
}