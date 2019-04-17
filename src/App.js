import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Subscribe } from "unstated";
import Media from "react-media";
import { Link } from "react-router-dom";

import api from "./utils/api";
import subdomain from "./utils/subdomain";

import Routes from "./Routes.js";
import AuthContainer from "./utils/AuthContainer";
import HideChat from "./utils/HideChat";
import DebugMenu from "./utils/DebugMenu";

import Nav from "./components/Nav/Nav";
import MobileNav from "./components/Nav/MobileNav";
import Chat from "./views/Chat/Chat";
import MrHole from "./components/MrHole/MrHole";
import MrHoleSolo from "./components/MrHole/MrHoleSolo";
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
    unauthorized: false,
    loadingCover: true,
  };

  componentDidMount = async () => {
    window.ClientRequestsGracefulRefresh = () => {
      // TODO: check if MainContent is scrolled past a threshold
      window.location = window.location;
    };

    if (subdomain) {
      let res = await api.get(`/api/v2/holes/${subdomain}`);

      if (res.ok) {
        // Save this for re-use later
        sessionStorage.setItem("current_hole", JSON.stringify(res.data.hole));

        // Set state here with the hole data
        this.setState({
          hole: res.data.hole,
          subdomain,
          loadingCover: false,
        });
      } else {
        // If you’re not logged in you will hit a roadblock
        // NOTE: not currently cause we let this one be public for now
        this.setState({
          unauthorized: true,
        });
      }
    } else {
      // Defaults for root hole
      this.setState({
        hole: {
          rules: {
            chat_enabled: true,
            web_upload_enabled: false,
          },
        },
        subdomain: false,
        loadingCover: false,
      });
    }
  };

  removeCover = () => {
    this.setState({
      unauthorized: false,
      loadingCover: false,
    });
  };

  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {auth => (
          <div className="App">
            <Nav
              holeName={this.state.hole ? this.state.hole.name : false}
              webUpload={
                this.state.hole
                  ? this.state.hole.rules.web_upload_enabled
                  : false
              }
            />
            <MainContent>
              <Routes subdomain={this.state.subdomain} />
            </MainContent>

            <WebUploader />

            {/* Render global Chat and Mr. Hole on desktop */}
            <Media query="(min-width: 791px)">
              {matches =>
                matches && (
                  <Fragment>
                    {this.state.hole && this.state.hole.rules.chat_enabled ? (
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

            {subdomain && this.state.loadingCover && !auth.state.current && (
              <LoadingCover>
                <MrHoleSolo />
                {this.state.unauthorized && (
                  <Message>
                    You don't have access to this hole.{" "}
                    <Link to="/login" onClick={this.removeCover}>
                      Log in
                    </Link>{" "}
                    or say bye to Mr. Hole.
                  </Message>
                )}
              </LoadingCover>
            )}

            {window.location.search === "?debug" && <DebugMenu />}
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

const LoadingCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--body-bg-color);
  z-index: 9999999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Message = styled.p`
  text-align: center;
  color: white;
  font-size: 1.25rem;
`;
