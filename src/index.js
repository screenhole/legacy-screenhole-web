import "babel-polyfill"; // required for prerendering & OG tags!
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as UnstatedProvider } from "unstated";
import { ActionCableProvider } from "react-actioncable-provider";
import Analytics from "react-router-ga";
import { unregister } from "./registerServiceWorker";

import api from "./utils/api";

import App from "./App";

import "minireset.css";
import "./variables.css";
import "./index.css";

ReactDOM.render(
  <UnstatedProvider>
    <ActionCableProvider url={`${api.websocketURL}/cable`}>
      <Router>
        <Analytics id="UA-108383158-1" debug={false}>
          <div>
            <App />
          </div>
        </Analytics>
      </Router>
    </ActionCableProvider>
  </UnstatedProvider>,
  document.getElementById("app"),
);

// Not now
// registerServiceWorker();
unregister();
