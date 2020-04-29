import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import cn from './Loading.module.scss';
const { PUBLIC_URL } = process.env;

export class Loading extends PureComponent {
  static propTypes = {
    variant: PropTypes.oneOf(['dark', 'light']),
  };

  render() {
    const { variant } = this.props;

    return (
      <div
        className={classNames(
          cn.loading,
          { [cn.dark]: variant === 'dark' },
          { [cn.light]: variant === 'light' },
        )}
      >
        <img
          className={classNames(cn.spinner)}
          src={`${PUBLIC_URL}/spinner.gif`}
          alt="Loading Shop"
        />
      </div>
    );
  }
}
