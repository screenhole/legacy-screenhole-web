import { Container } from 'unstated';

import api from './api';

class AuthContainer extends Container {
  state = {
    authenticated: api.hasAuthHeader(),
  };

  authenticate = () => {
    this.setState({ authenticated: true });
  };

  unauthenticate = () => {
    this.setState({ authenticated: false });
  };
}

export default AuthContainer;
