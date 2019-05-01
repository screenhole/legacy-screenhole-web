import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import defaultAvatar from "./default-avatar.png";

class Avatar extends Component {
  gravatar = () => {
    let origin =
      window.location.hostname === "localhost"
        ? "https://screenhole.net"
        : window.location.origin;

    return (
      "https://www.gravatar.com/avatar/" +
      this.props.gravatar +
      "?size=" +
      encodeURIComponent(this.props.size || 100) +
      "&d=" +
      encodeURIComponent(origin + defaultAvatar)
    );
  };

  render() {
    return (
      <Link to={`/${this.props.username}`}>
        <Image
          src={this.gravatar()}
          alt={this.props.username}
          className="user-avatar"
        />
      </Link>
    );
  }
}

export default Avatar;

const Image = styled.img`
  border-radius: 100%;
  height: 2.25rem;
  display: block;
  object-fit: cover;
  background-color: #111;
`;
