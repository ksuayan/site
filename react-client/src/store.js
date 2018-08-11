import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainApp from './reducers';

const consoleMessages = store => next => action => {
  let result
  console.groupCollapsed(`dispatching action => ${action.type}`);
  console.log('state', store.getState());
  result = next(action);
  console.groupEnd()
  return result;
}

const store = createStore(
  mainApp,
  applyMiddleware(thunk, consoleMessages)
);

export default store;