import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Loading } from 'components/common/loading/Loading';

export class ConnectedPrivateLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    loading: PropTypes.bool,
  };

  render() {
    const { loading, children } = this.props;
    return (
      <div>
        <p>PRIVATE</p>
        <div>{children}</div>
        {loading && <Loading variant="dark" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.settings.loading,
});

export const PrivateLayout = withRouter(
  connect(mapStateToProps)(ConnectedPrivateLayout),
);
