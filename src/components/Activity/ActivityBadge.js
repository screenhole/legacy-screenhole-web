import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Tooltip from "../Tooltip/Tooltip";

export default class ActivityBadge extends Component {
  render() {
    return (
      <Tooltip title="sup with you" className="activity-badge-nav">
        <Link to="/sup">
          <Badge>SUP?</Badge>
        </Link>
      </Tooltip>
    );
  }
}

const Badge = styled.div`
  display: inline-block;
  background: linear-gradient(HSLA(255, 83%, 58%, 1), HSLA(255, 83%, 48%, 1));
  box-shadow: inset 0 1px 0 0 HSLA(255, 83%, 65%, 1);
  color: #fff;
  font-family: "Menlo", monospace;
  font-size: 0.75rem;
  line-height: 1;
  border-radius: 40em;
  padding: 0.25em 0.5em;
  cursor: pointer;
  margin-left: 2rem;
`;
