import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'typeface-ibm-plex-sans';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById("root")
);

registerServiceWorker();
