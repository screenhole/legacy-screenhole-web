import React, { Component } from "react";
import { Tooltip as Tippy } from "react-tippy";

import "react-tippy/dist/tippy.css";
import "./tooltips.css";

export default class Tooltip extends Component {
  render() {
    return (
      <Tippy
        title={this.props.title}
        theme="screenhole"
        position={this.props.position || "bottom"}
        followCursor
        inertia={true}
        animateFill={false}
        animation="scale"
        duration={400}
        distance={10}
        {...this.props}
      >
        {this.props.children}
      </Tippy>
    );
  }
}
