import { 
    FETCH_COMPANY_SUCCESS, 
} from '../types';

const INITIAL_STATE = {
}

const companyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COMPANY_SUCCESS:
      return { ...state, ...action.payload}
    default: return state;
  }
}

export default companyReducer;