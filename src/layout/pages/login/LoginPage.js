import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login as loginUserAction } from 'ducks/operators/user';
import { selectIsAuthenticated } from 'ducks/selectors';
import { routes } from 'layout/routes';
import * as Sentry from '@sentry/browser';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import cn from './Login.module.scss';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import Footer from 'components/footer/Footer';

const { PUBLIC_URL } = process.env;

export class ConnectedLoginWrapper extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func,
  };

  state = {
    email_address: '',
    password: '',
    error: '',
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { email_address, password } = this.state;
    const { login, history } = this.props;

    if (!email_address) {
      this.setState({ error: 'Please input an email address' });
      return;
    }

    if (!password) {
      this.setState({ error: 'Please input a password' });
      return;
    }

    try {
      const user = await login({
        email_address,
        password,
      });

      if (user.authentication_result_id === 2) {
        this.setState({ error: 'Invalid Login or Password' });
      }
      if (user.authentication_result_id === 1) {
        history.push('/projects');
      }
    } catch (err) {
      // Only fires if the server is off line or the body isnt set correctly
      this.setState({ error: err.message });
      Sentry.captureException(err);
    }
  };

  handleOnInput = (type, value) =>
    this.setState({ [type]: value, error: null });

  render() {
    const { error, email_address, password } = this.state;

    if (this.props.isAuthenticated) {
      return <Redirect to={routes.PROJECTS} />;
    }
    return (
      <div className={cn.flexLogin}>
        <div className={cn.loginInner}>
          <img
            className={cn.imageMd}
            src={`${PUBLIC_URL}/logo-dark.svg`}
            alt="Cognitiv Logo"
          />
          <div className={cn.flexRow}>
            <form className={cn.loginContainer} onSubmit={this.handleSubmit}>
              <p className={cn.publicSubTitle}>Cognitiv Login</p>
              <div className={cn.formGroup}>
                <InputWrapper
                  placeholder="Email Address"
                  value={email_address}
                  component={Input}
                  handleOnChange={input =>
                    this.handleOnInput('email_address', input.value)
                  }
                />
              </div>
              <div className={cn.formGroup}>
                <InputWrapper
                  placeholder="Password"
                  type="password"
                  value={password}
                  component={Input}
                  handleOnChange={input =>
                    this.handleOnInput('password', input.value)
                  }
                />
              </div>
              <button
                type="submit"
                className={classNames(cn.btn, cn.btnPrimary)}
              >
                Sign in
              </button>
            </form>
            <div className={cn.loginContainer}>
              <p className={cn.publicSubTitle}>Cognitiv Terms</p>
              <p className={cn.loginTerms}>
                By proceeding to login to your account and use Cognitiv, you are
                agreeing to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
        {error && <p className={cn.error}>{error}</p>}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state),
});

const mapDispatchToProps = {
  login: loginUserAction,
};

const LoginWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedLoginWrapper);

export default LoginWrapper;
