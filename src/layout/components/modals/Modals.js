import React from 'react';
import PropTypes from 'prop-types';
import { RunDefinition } from './run-definition/RunDefinition';

export class Modals extends React.PureComponent {
  static propTypes = {
    internal: PropTypes.bool,
  };

  static defaultProps = {
    internal: false,
  };

  render() {
    const { internal } = this.props;
    return (
      <>
        {internal && (
          <>
            <RunDefinition />
          </>
        )}
        {/* <AdminMessage /> */}
      </>
    );
  }
}
