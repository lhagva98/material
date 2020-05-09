import Axios from "axios";
import store from '../redux/store';
import {
  FETCHING,
  FETCHING_DONE,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_COMPANY_SUCCESS,
} from '../types';

import { employeeRoles } from "../constants";

const user = store.getState().user.currentUser;

export const fetchEmployee = () => {
  return function (dispatch) {
    dispatch({ type: FETCHING });

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
        });
        dispatch({ type: FETCHING_DONE });
      })
      .catch(err => {
        console.log('EMP_DATA_FETCH_', err);
        dispatch({ type: FETCHING_DONE });
      })
  }
}

export const fetchCompany = () => {
  return function (dispatch) {
    dispatch({type: FETCHING});

    Axios.get(`/companies/find/${user.companyId}`)
    .then( res => {
      dispatch({ type: FETCHING_DONE });
      dispatch({type: FETCH_COMPANY_SUCCESS, payload: res.data.company});
    })
    .catch(err => {
      console.log('COMPANY_DATA_FETCH_', err);
      dispatch({ type: FETCHING_DONE });
    })
  }
}