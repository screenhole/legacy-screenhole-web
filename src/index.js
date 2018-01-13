import 'babel-polyfill'; // required for prerendering & OG tags!
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';
import registerServiceWorker from './registerServiceWorker';

import App from './App';

import 'minireset.css';
import './variables.css';
import './index.css';

ReactDOM.render(
  <Router>
    <div>
      <ScrollMemory />
      <App />
    </div>
  </Router>,
  document.getElementById('app')
);
registerServiceWorker();
