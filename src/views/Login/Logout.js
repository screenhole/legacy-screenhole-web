import React, { Component } from 'react';
import { logoutAction } from '../../actions';
import { connect } from 'react-redux';

class Logout extends Component {
  componentWillMount = () => {
    this.props.logoutAction(this.props.history);
  }

  render() {
    return (
      <div />
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, { logoutAction })(Logout);
