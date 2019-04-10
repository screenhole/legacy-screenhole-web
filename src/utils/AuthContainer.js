import { Container } from "unstated";

import api from "./api";

class AuthContainer extends Container {
  state = {
    authenticated: api.authenticated,
    current: api.currentUser,
    buttcoins: api.currentUser ? api.currentUser.stats.buttcoins : 0,
    uploader: false,
    rules: {
      chomments: true,
      webUpload: true,
    },
  };

  authenticate = user => {
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

  updateButtcoins = amount => {
    this.setState({
      buttcoins: amount,
    });

    // Hacky hack right now 👀
    // Modify the object with new buttcoin count
    const userData = this.state.current;
    userData.stats.buttcoins = amount;
    // Inject it into localStorage so it stays between reloads
    window.localStorage.setItem("user_current", JSON.stringify(userData));
  };

  toggleUploader = bool => {
    this.setState({
      uploader: bool === "on" ? true : false,
    });
  };
}

export default AuthContainer;
