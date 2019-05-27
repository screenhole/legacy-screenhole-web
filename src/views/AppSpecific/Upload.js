import React, { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";

import { MobileWebUploader } from "../../components/Upload/WebUploader";

export default class AppUpload extends Component {
  render() {
    return (
      <div>
        <HideNav />
        <MobileWebUploader token={this.props.match.params.token} />
      </div>
    );
  }
}

const HideNav = createGlobalStyle`
  nav {
    display: none !important;
  }
  .App {
    padding-top: 0 !important;
  }
`;
