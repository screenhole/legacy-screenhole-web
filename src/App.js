import React, { Component } from 'react';
import styled from 'styled-components';

import Routes from './Routes.js';

import Nav from './components/Nav/Nav';
import ChommentStream from './views/ChommentStream/ChommentStream';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <MainContent>
          <Routes />
        </MainContent>
        <ChommentStream />
      </div>
    );
  }
}

export default App;

const MainContent = styled.main`
  width: 100%;
  padding: var(--app-padding);
  padding-left: calc(var(--app-padding) + var(--sidebar-width));
`;
