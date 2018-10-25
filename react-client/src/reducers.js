import { combineReducers } from 'redux';
import { C } from './actions';

/**
 * Should be returning the new state 
 * for every given incoming action.
 */
export const results = (state = [], action) => {
  switch (action.type) {
    case C.SET_RESULTS:
      return action.payload;
    case C.ADD_RESULT:
      return [ ...state, action.payload ];
    default:
      return state;
  }
}

export const term = (state="", action) => {
  if (action.type === C.SET_TERM) {
    return action.payload
  } else {
    return state
  }
}

const mainApp = combineReducers({
  results,
  term
})

export default mainApp;