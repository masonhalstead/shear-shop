import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { selectIsAuthenticated } from 'ducks/selectors';
import { routes } from 'layout/routes';
import { PublicLayout } from '../public-layout/PublicLayout';

class PublicRouteWrapper extends React.PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
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

    if (!isAuthenticated) {
      return (
        <Route
          {...rest}
          render={props => (
            <PublicLayout>
              <Component {...props} />
            </PublicLayout>
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
              pathname: routes.PROJECTS,
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

export const PublicRoute = withRouter(
  connect(mapStateToProps)(PublicRouteWrapper),
);
