import { Container } from 'unstated';

import api from './api';

class AuthContainer extends Container {
  state = {
    authenticated: api.authenticated,
    current: api.currentUser,
  };

  authenticate = (user) => {
    this.setState({
      authenticated: true,
      currentUser: user,
    });
  };

  unauthenticate = () => {
    this.setState({
      authenticated: false,
      currentUser: null,
    });
  };
}

export default AuthContainer;
