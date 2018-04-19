import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { chommentIcon } from "../Grab/Grab";

class NavTabs extends Component {
  render() {
    return (
      <Container>
        <NavLink to="/view/mobile/chomments" className="match-size">
          {chommentIcon}
        </NavLink>
        <NavLink to="/view/mobile/feed">{feedIcon}</NavLink>
        <NavLink to="/sup">{supIcon}</NavLink>
      </Container>
    );
  }
}

export default NavTabs;

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--nav-height);
  background-image: linear-gradient(to top, #000 10%, rgba(0, 0, 0, 0) 100%);

  [aria-current="true"] {
    color: #fff;
  }

  .match-size {
    width: 34px;
    transform: scale(1.425);
    transform-origin: center;
    position: relative;
    top: 2px;
  }
`;

const supIcon = (
  <svg width={34} height={34}>
    <g fill="none" fillRule="evenodd" transform="translate(0 1)">
      <rect
        width={32}
        height={30}
        x={1}
        y={1}
        stroke="currentColor"
        strokeWidth={2}
        rx={6}
      />
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M23.048 12.168l-1.8 8.508h1.884l.66-3.072h1.344c2.004-.012 3.36-1.14 3.36-3 0-1.452-1.092-2.436-2.64-2.436h-2.808zm2.328 1.632c.84 0 1.164.384 1.164.972s-.384 1.2-1.428 1.2h-.972l.468-2.172h.768zm-5.96-1.632l-1.128 5.424c-.193.936-.72 1.392-1.465 1.392-.935 0-1.307-.504-1.307-1.212 0-.156.036-.432.096-.72l1.031-4.884h-1.92l-.995 4.788c-.084.42-.144.708-.144 1.092 0 1.68 1.224 2.808 3.072 2.808 1.655 0 3.035-.972 3.455-2.916l1.224-5.772h-1.92zm-10.2 7.044c-1.044-.024-1.476-.72-1.476-1.428 0-.108.012-.216.024-.276l-1.74.3a1.869 1.869 0 0 0-.024.324c0 1.104.84 2.724 3.252 2.724 1.968 0 3.084-1.344 3.084-2.676 0-1.044-.528-1.836-1.848-2.4l-.9-.384c-.336-.144-.6-.372-.6-.804 0-.468.408-.948 1.104-.948 1.152 0 1.26.888 1.26 1.128l1.764-.288c0-.876-.6-2.484-2.94-2.484-1.644 0-3.096 1.08-3.096 2.76 0 1.02.528 1.872 1.68 2.34l.996.408c.48.204.612.48.612.816 0 .54-.42.888-1.152.888z"
      />
    </g>
  </svg>
);

const feedIcon = (
  <svg width="35" height="35" xmlns="http://www.w3.org/2000/svg">
    <g fill="currentColor" fillRule="evenodd">
      <path d="M10.256 0h14.488c3.567 0 4.86.371 6.163 1.069a7.27 7.27 0 0 1 3.024 3.024C34.63 5.396 35 6.689 35 10.256v14.488c0 3.567-.371 4.86-1.069 6.163a7.27 7.27 0 0 1-3.024 3.024C29.604 34.63 28.311 35 24.744 35H10.256c-3.567 0-4.86-.371-6.163-1.069a7.27 7.27 0 0 1-3.024-3.024C.37 29.604 0 28.311 0 24.744V10.256c0-3.567.371-4.86 1.069-6.163a7.27 7.27 0 0 1 3.024-3.024C5.396.37 6.689 0 10.256 0zm.974 2c-3.21 0-4.373.334-5.547.962a6.542 6.542 0 0 0-2.721 2.721C2.334 6.857 2 8.021 2 11.23v12.54c0 3.21.334 4.373.962 5.547a6.542 6.542 0 0 0 2.721 2.721c1.174.628 2.338.962 5.547.962h12.54c3.21 0 4.373-.334 5.547-.962a6.542 6.542 0 0 0 2.721-2.721c.628-1.174.962-2.338.962-5.547V11.23c0-3.21-.334-4.373-.962-5.547a6.542 6.542 0 0 0-2.721-2.721C28.143 2.334 26.979 2 23.77 2H11.23z" />
      <path d="M11.41 5h12.18c2.23 0 3.037.232 3.852.668a4.543 4.543 0 0 1 1.89 1.89c.436.815.668 1.623.668 3.852v12.18c0 2.23-.232 3.037-.668 3.852a4.543 4.543 0 0 1-1.89 1.89c-.815.436-1.623.668-3.852.668H11.41c-2.23 0-3.037-.232-3.852-.668a4.543 4.543 0 0 1-1.89-1.89C5.232 26.627 5 25.82 5 23.59V11.41c0-2.23.232-3.037.668-3.852a4.543 4.543 0 0 1 1.89-1.89C8.373 5.232 9.18 5 11.41 5zm.91 2c-1.85 0-2.52.193-3.197.554a3.77 3.77 0 0 0-1.569 1.569C7.193 9.799 7 10.47 7 12.32v10.36c0 1.85.193 2.52.554 3.197a3.77 3.77 0 0 0 1.569 1.569c.676.361 1.347.554 3.197.554h10.36c1.85 0 2.52-.193 3.197-.554a3.77 3.77 0 0 0 1.569-1.569c.361-.676.554-1.347.554-3.197V12.32c0-1.85-.193-2.52-.554-3.197a3.77 3.77 0 0 0-1.569-1.569C25.201 7.193 24.53 7 22.68 7H12.32z" />
      <path d="M13.846 10h7.308c1.337 0 1.822.14 2.311.4.49.262.873.646 1.134 1.135.262.489.401.974.401 2.31v7.31c0 1.336-.14 1.821-.4 2.31a2.726 2.726 0 0 1-1.135 1.134c-.489.262-.974.401-2.31.401h-7.31c-1.336 0-1.821-.14-2.31-.4a2.726 2.726 0 0 1-1.134-1.135c-.262-.489-.401-.974-.401-2.31v-7.31c0-1.336.14-1.821.4-2.31a2.726 2.726 0 0 1 1.135-1.134c.489-.262.974-.401 2.31-.401zm.957 1.765c-1.057 0-1.44.11-1.826.316-.386.207-.69.51-.896.896-.206.386-.316.77-.316 1.826v5.394c0 1.057.11 1.44.316 1.826.207.386.51.69.896.896.386.206.77.316 1.826.316h5.394c1.057 0 1.44-.11 1.826-.316.386-.207.69-.51.896-.896.206-.386.316-.77.316-1.826v-5.394c0-1.057-.11-1.44-.316-1.826a2.153 2.153 0 0 0-.896-.896c-.386-.206-.77-.316-1.826-.316h-5.394z" />
    </g>
  </svg>
);
