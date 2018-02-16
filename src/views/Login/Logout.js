import React, { Component } from 'react';

import api from '../../utils/api';

class Logout extends Component {
  componentWillMount = () => {
    api.resetLocalStorage();
    window.location = '/';
  };

  render() {
    return <div />;
  }
}

export default Logout;
