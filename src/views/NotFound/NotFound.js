import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <main>
        <h1>404 biatch</h1>
        <Link to="/">Take me back to the Grabs</Link>
      </main>
    );
  }
}

export default NotFound;
