import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components/common/loading/Loading';

export class PublicLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        <p>PUBLIC</p>
        {children}
        <Loading variant="dark" />
      </div>
    );
  }
}
