import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import Nav from './components/Nav/Nav';
import ChommentStream from './views/ChommentStream/ChommentStream';
import GrabStream from './views/GrabStream/GrabStream';
import Manual from './views/Manual/Manual';
import NotFound from './views/NotFound/NotFound';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <MainContent>
          <Switch>
            <Route exact path="/" component={GrabStream} />
            <Route exact path="/manual" component={Manual} />
            <Route path="*" component={NotFound} />
          </Switch>
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
