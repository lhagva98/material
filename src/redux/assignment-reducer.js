import { 
    FETCH_ASSIGNMENT_SUCCESS, 
} from '../types';

const INITIAL_STATE = {
}

const assignmentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ASSIGNMENT_SUCCESS:
      return { ...state, array: action.payload.array, data: action.payload.data }
    default: return state;
  }
}

export default assignmentReducer;