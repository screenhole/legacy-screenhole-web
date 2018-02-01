import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

class NavTabs extends Component {
  render() {
    return (
      <Container>
        <NavLink to="/view/mobile/chomments">CHOMMENTS</NavLink>
        <NavLink to="/view/mobile/feed">FEED</NavLink>
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

  [aria-current='true'] {
    color: #fff;
  }
`;
