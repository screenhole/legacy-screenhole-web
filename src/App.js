import React, { Component, Fragment } from "react";
import { hot } from 'react-hot-loader'
import styled from "styled-components";
import Media from "react-media";

import Routes from "./Routes.js";

import Nav from "./components/Nav/Nav";
import NavTabs from "./components/Nav/NavTabs";
import ChommentStream from "./views/ChommentStream/ChommentStream";
import MrHole from "./components/MrHole/MrHole";
import WebUploader from "./components/Upload/WebUploader";

class App extends Component {
  componentDidMount() {
    window.ClientRequestsGracefulRefresh = () => {
      // TODO: check if MainContent is scrolled past a threshold
      window.location = window.location;
    };
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <MainContent>
          <Routes />
        </MainContent>

        <WebUploader />

        {/* Render global Chomments and Mr. Hole on desktop */}
        <Media query="(min-width: 791px)">
          {matches =>
            matches && (
              <Fragment>
                <ChommentStream />
                <MrHole />
              </Fragment>
            )
          }
        </Media>

        {/* Render bottom nav bar for mobile */}
        <Media query="(max-width: 790px)">
          {matches => matches && <NavTabs />}
        </Media>
      </div>
    );
  }
}

export default hot(module)(App);

const MainContent = styled.main`
  width: 100%;
  padding: var(--app-padding);
  padding-left: calc(var(--app-padding) + var(--sidebar-width));
  @media (min-width: 791px) {
    padding: 3rem;
    padding-top: var(--app-padding);
    padding-left: calc(3rem + var(--sidebar-width));
  }

  @media (max-width: 790px) {
    padding-left: var(--app-padding);
    padding-bottom: calc(var(--nav-height) * 1.5);
  }
`;
