import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Loading } from 'components/common/loading/Loading';

export class PrivateLayoutWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        <p>PRIVATE</p>
        <div>{children}</div>
        <Loading variant="dark" />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export const PrivateLayout = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PrivateLayoutWrapper),
);
