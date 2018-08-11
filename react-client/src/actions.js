/*
 * action types - are like commands 
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

export const someCall = () => (dispatch, getState) => {

  dispatch({
    type: C.GET_TRACKS
  })

  // call async stuff for example
  fetch("/test")
  .then(response => response.json())
  .then(tracks => {
    dispatch({
      type: C.UPDATE_TRACKS,
      payload: tracks
    })
  })
  .catch(error => {
    dispatch({
      type: C.ADD_ERROR,
      payload: error.message
    })
  });



}