import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Loading } from 'components/common/loading/Loading';

export class ConnectedPublicLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    loading: PropTypes.bool,
  };

  render() {
    const { children, loading } = this.props;
    return (
      <div>
        <p>PUBLIC</p>
        {children}
        {loading && <Loading variant="dark" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.settings.loading,
});

export const PublicLayout = withRouter(
  connect(mapStateToProps)(ConnectedPublicLayout),
);
