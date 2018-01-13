import 'babel-polyfill'; // required for prerendering & OG tags!
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import ScrollToTop from './utils/ScrollToTop';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

import 'minireset.css';
import './variables.css';
import './index.css';

ReactDOM.render(
  <Router>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </Router>,
  document.getElementById('app')
);
registerServiceWorker();
