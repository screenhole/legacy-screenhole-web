import 'babel-polyfill'; // required for prerendering & OG tags!
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';
import registerServiceWorker from './registerServiceWorker';

import { AUTHENTICATED } from './actions';
import { refreshUserTokenAction } from './actions';
import reducers from './reducers';

import App from './App';

import 'minireset.css';
import './variables.css';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// rehydrate state from localStorage
if (localStorage.getItem('user_token')) {
  store.dispatch({ type: AUTHENTICATED });
  store.dispatch(refreshUserTokenAction());
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <ScrollMemory />
        <App />
      </div>
    </Router>
  </Provider>,
  document.getElementById('app')
);
registerServiceWorker();
