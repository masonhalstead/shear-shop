import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { selectIsAuthenticated } from 'ducks/selectors';
import { routes } from 'layout/routes';
import PrivateLayout from '../private-layout/PrivateLayout';

class PrivateRouteWrapper extends React.PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.any,
    component: PropTypes.any,
    location: PropTypes.object,
  };

  render() {
    const {
      component: Component,
      isAuthenticated,
      location,
      ...rest
    } = this.props;

    if (isAuthenticated) {
      return (
        <Route
          {...rest}
          render={props => (
            <PrivateLayout>
              <Component {...props} />
            </PrivateLayout>
          )}
        />
      );
    }
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{
              pathname: routes.LOGIN,
              state: {
                from: props.location,
              },
            }}
          />
        )}
      />
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state),
});

export const PrivateRoute = withRouter(
  connect(mapStateToProps)(PrivateRouteWrapper),
);
