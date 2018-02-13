import React, { Component } from 'react';

class Logout extends Component {
  componentWillMount = () => {
    localStorage.removeItem('user_token');
    window.location = '/';
  }

  render() {
    return (
      <div />
    );
  }
}

export default Logout;
