import {
  FETCHING,
  FETCHING_DONE,
} from '../types';

const INITIAL_STATE = {
  loading: false
}

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING:
      return { ...state, loading: true }
    case FETCHING_DONE:
      return { ...state, loading: false }
    default: return state;
  }
}

export default appReducer;