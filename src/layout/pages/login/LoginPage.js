import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// POST /authentication/login
// payload = { login: 'email_address', password: 'password'}

class LoginPage extends PureComponent {
  render() {
    return (
      <p>LOGIN PAGE</p>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
