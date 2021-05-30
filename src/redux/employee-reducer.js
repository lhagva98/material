import { 
    FETCH_EMPLOYEES_SUCCESS, 
} from '../types';

const INITIAL_STATE = {
}

const employeeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_SUCCESS:
      return { ...state, data: action.payload.ddata, array: action.payload.darray}
    default: return state;
  }
}

export default employeeReducer;