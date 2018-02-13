import { Container } from 'unstated';

class AuthContainer extends Container {
  state = {
    authenticated: true,
  };

  authenticate = () => {
    this.setState({ authenticated: true });
  };

  unauthenticate = () => {
    this.setState({ authenticated: false });
  };
}

export default AuthContainer;
