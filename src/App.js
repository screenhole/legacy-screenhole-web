import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Subscribe } from "unstated";
import Media from "react-media";

import api from "./utils/api";

import Routes from "./Routes.js";
import AuthContainer from "./utils/AuthContainer";
import HideChat from "./utils/HideChat";

import Nav from "./components/Nav/Nav";
import MobileNav from "./components/Nav/MobileNav";
import Chat from "./views/Chat/Chat";
import MrHole from "./components/MrHole/MrHole";
import WebUploader from "./components/Upload/WebUploader";

class App extends Component {
  state = {
    hole: {
      rules: {
        chat_enabled: false,
        web_upload_enabled: false,
      },
    },
    subdomain: false,
  };

  componentDidMount = async () => {
    window.ClientRequestsGracefulRefresh = () => {
      // TODO: check if MainContent is scrolled past a threshold
      window.location = window.location;
    };

    // Check if we’re on a subdomain
    const subdomain = window.location.host.split(".")[1]
      ? window.location.host.split(".")[0]
      : false;

    if (subdomain) {
      let res = await api.get(`/api/v2/holes/${subdomain}`);

      // Save this for re-use later
      sessionStorage.setItem("current_hole", JSON.stringify(res.data.hole));

      // Set state here with the hole data
      this.setState({
        hole: res.data.hole,
        subdomain,
      });
    } else {
      this.setState({
        hole: {
          rules: {
            chat_enabled: true,
            web_upload_enabled: false,
          },
        },
        subdomain: false,
      });
    }
  };

  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <div className="App">
            <Nav
              holeName={this.state.hole.name}
              webUpload={this.state.hole.rules.web_upload_enabled}
            />
            <MainContent>
              <Routes subdomain={this.state.subdomain} />
            </MainContent>

            <WebUploader />

            {/* Render global Chomments and Mr. Hole on desktop */}
            <Media query="(min-width: 791px)">
              {matches =>
                matches && (
                  <Fragment>
                    {this.state.hole.rules.chat_enabled ? (
                      <Chat />
                    ) : (
                      <HideChat />
                    )}
                    <MrHole />
                  </Fragment>
                )
              }
            </Media>

            {/* Render bottom nav bar for mobile */}
            <Media query="(max-width: 790px)">
              {matches =>
                matches && (
                  <MobileNav
                    chat={this.state.hole.rules.chat_enabled}
                    webUpload={this.state.hole.rules.web_upload_enabled}
                  />
                )
              }
            </Media>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default App;

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
