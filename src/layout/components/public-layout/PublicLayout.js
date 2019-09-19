import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from 'components/Alert';
import { withRouter } from 'react-router-dom';
import { Loading } from 'components/loading/Loading';
import Footer from 'components/footer/Footer';

export class ConnectedPublicLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    loading: PropTypes.bool,
  };

  render() {
    const { children, loading } = this.props;
    return (
      <div>
        {children}
        {loading && <Loading variant="dark" />}
        <Footer />
        <Alert />
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
