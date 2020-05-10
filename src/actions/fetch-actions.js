import Axios from "axios";
import store from '../redux/store';
import {
  FETCHING,
  FETCHING_DONE,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_COMPANY_SUCCESS,
  FETCH_ASSIGNMENT_SUCCESS
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
    dispatch({ type: FETCHING });

    Axios.get(`/companies/find/${user.companyId}`)
      .then(res => {
        dispatch({ type: FETCH_COMPANY_SUCCESS, payload: res.data.company });
        dispatch({ type: FETCHING_DONE });
      })
      .catch(err => {
        console.log('COMPANY_DATA_FETCH_', err);
        dispatch({ type: FETCHING_DONE });
      })
  }
}

export const fetchAssignment = () => {
  return function (dispatch) {
    dispatch({ type: FETCHING });
    console.log(user.id)
    Axios.get(`/assign/findbyCreater/${user.id}`)
      .then(res => {
        var ddata = res.data;
        var darray = Object.keys(ddata).map(key => {
          var cname = '';
          if (ddata[key]) {
            cname = `${ddata[key]["employee.lastname"]} ${ddata[key]["employee.firstname"]}`;
          } else {
            cname = '';
          }
          const date =`${ddata[key].startDate} - ${ddata[key].endDate}`
          return [
            ddata[key].name,
            date,
            cname,
            ddata[key].statusId,
            ddata[key].id
          ];
        });
        dispatch({ 
          type: FETCH_ASSIGNMENT_SUCCESS, 
          payload: {
            data: ddata, 
            array: darray
          }});
        dispatch({ type: FETCHING_DONE });
      })
      .catch(err => {
        console.log('ASSIGNMENT_DATA_FETCH_', err);
        dispatch({ type: FETCHING_DONE });
      })
  }
}