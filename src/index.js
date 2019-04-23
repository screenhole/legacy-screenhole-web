import "react-app-polyfill/ie11"; // For IE 11 support
import "babel-polyfill"; // required for prerendering & OG tags!
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as UnstatedProvider } from "unstated";
import { ActionCableProvider } from "react-actioncable-provider";
import Analytics from "react-router-ga";
import ScrollMemory from "react-router-scroll-memory";

import api from "./utils/api";

import App from "./App";

import "minireset.css";
import "./fonts.css";
import "./variables.css";
import "./index.css";

class ScreenholeWeb extends React.Component {
  render() {
    let { authenticated } = api;

    var cableSocketUrl;

    if (authenticated && api.headers) {
      let token = api.headers.Authorization.split(/ /)[1];
      token = btoa(token);
      cableSocketUrl = `${api.websocketURL}/cable?token=${token}`;
    } else {
      let token = btoa("guest");
      cableSocketUrl = `${api.websocketURL}/cable?token=${token}`;
    }

    return (
      <UnstatedProvider>
        <ActionCableProvider url={cableSocketUrl}>
          <Router>
            <Analytics id="UA-108383158-1" debug={false}>
              <div>
                <ScrollMemory />
                <App />
              </div>
            </Analytics>
          </Router>
        </ActionCableProvider>
      </UnstatedProvider>
    );
  }
}

ReactDOM.render(<ScreenholeWeb />, document.getElementById("app"));
