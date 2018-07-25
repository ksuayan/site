import { combineReducers } from 'redux';
import { C } from './actions';

/**
 * Should be returning the new state 
 * for every given incoming action.
 */
export const tracks = (state = [], action) => {
  switch (action.type) {
    case C.GET_TRACKS:
      return action.payload;
    case C.UPDATE_TRACKS:
      return action.payload;
    case C.ADD_TRACK:
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
  tracks,
  term
})

export default mainApp;