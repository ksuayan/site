/*
 * action types
 */

export const C = {
  GET_TRACKS: 'GET_TRACKS',
  UPDATE_TRACKS: 'UPDATE_TRACKS',
  SET_TERM: 'SET_TERM'
}

/*
 * action creators
 */

export function getTracks(term) {
  return { type: C.GET_TRACKS, term }
}
