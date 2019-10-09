import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert } from 'components/Alert';
import { withRouter } from 'react-router-dom';
import Footer from 'components/footer/Footer';
import { Loading } from 'components/loading/Loading';
import cn from './PublicLayout.module.scss';

export class ConnectedPublicLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    loading: PropTypes.bool,
  };

  render() {
    const { children, loading } = this.props;
    return (
      <div className={cn.publicLayout}>
        {children}
        {loading && <Loading variant="dark" />}
        <Alert />
        <Footer />
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
