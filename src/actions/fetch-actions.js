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

export const fetchEmployee = () => {
  return function (dispatch, getState) {
    dispatch({ type: FETCHING });
    const { departmentId, role, companyId } = getState().user.currentUser;
    var URL = '';

    if (role === "1") URL = `employees/findAll/${companyId}`
    if (role === "2") URL = `employees/findbyDepartment/${departmentId}`;
    console.log("FETCH_URL", URL);
    Axios.get(URL)
      .then(res => {
        var ddata = res.data.emp;
        var darray = Object.keys(ddata).map(key => {
          var cname;
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
  return function (dispatch, getState) {
    dispatch({ type: FETCHING });
    const { companyId } = getState().user.currentUser;

    Axios.get(`/companies/find/${companyId}`)
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
  return function (dispatch, getState) {
    dispatch({ type: FETCHING });
    const { id, role } = getState().user.currentUser;
    var URL = '';

    if (role === "2" || role === "1") URL = `/assign/findbyCreater/${id}`;
    if (role === "3") URL = `/assign/findbyEmployee/${id}`;
    console.log("FETCH_URL", URL);
    Axios.get(URL)
      .then(res => {
        var ddata = res.data;
        var darray = Object.keys(ddata).map(key => {
          var cname = '';
          if (ddata[key]) {
            cname = `${ddata[key]["employee.lastname"]} ${ddata[key]["employee.firstname"]}`;
          } else {
            cname = '';
          }
          const date = `${ddata[key].startDate} - ${ddata[key].endDate}`
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
          }
        });
        dispatch({ type: FETCHING_DONE });
      })
      .catch(err => {
        console.log('ASSIGNMENT_DATA_FETCH_', err);
        dispatch({ type: FETCHING_DONE });
      })
  }
}

export const fetchDepartment = () => {
  return function (dispatch, getState) {
    return function (dispatch, getState) {
      dispatch({ type: FETCHING });
      const { departmentId, role, companyId } = getState().user.currentUser;
      var URL = '';

      if (role === "1") URL = `employees/findAll/${companyId}`
      if (role === "2") URL = `employees/findbyDepartment/${departmentId}`;
      console.log("FETCH_URL", URL);
      Axios.get(URL)
        .then()
        .catch()
    }
  }
}
