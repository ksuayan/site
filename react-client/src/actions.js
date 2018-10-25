/*
 * action types - are like commands 
 */

export const C = {
  SET_TERM:    'SET_TERM',
  SET_RESULTS: 'SET_RESULTS',
  ADD_RESULT:  'ADD_RESULT',
  ADD_ERROR:   'ADD_ERROR'
}

/*
 * action creators
 */

export const setTerm = (term) => {
  return { type: C.SET_TERM, payload: term }
}

export const setResults = (results) => {
  return { type: C.SET_RESULTS, payload: results }
}


export const someCall = () => (dispatch, getState) => {

  dispatch({
    type: C.SET_TERM,
    payload: 'someCall'
  })

  // call async stuff for example
  fetch("/test")
  .then(response => response.json())
  .then(results => {
    dispatch({
      type: C.SET_RESULTS,
      payload: results
    })
  })
  .catch(error => {
    dispatch({
      type: C.ADD_ERROR,
      payload: error.message
    })
  });

}