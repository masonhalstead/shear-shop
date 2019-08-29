import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import cn from './Loading.module.scss';
const { PUBLIC_URL } = process.env;

export class ConnectedLoading extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    variant: PropTypes.oneOf(['dark', 'light']),
  };

  render() {
    const { loading, variant } = this.props;

    if (loading) {
      return (
        <div className={classNames(cn.loading)}>
          <img
            className={classNames(
              cn.spinner,
              { [cn.dark]: variant === 'dark' },
              { [cn.light]: variant === 'light' },
            )}
            src={`${PUBLIC_URL}/spinner.gif`}
            alt="Loading Andromeda Dashboard"
          />
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  loading: state.settings.loading,
});

export const Loading = connect(
  mapStateToProps,
  null,
)(ConnectedLoading);
