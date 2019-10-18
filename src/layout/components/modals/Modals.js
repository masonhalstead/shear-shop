import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { RunDefinition } from './run-definition/RunDefinition';
import { CreateProject } from './project-modal/CreateProject';
import { CreateJobDefinition } from './create-job-definition/CreateJobDefinition';
import BatchModal from './batch-modal/BatchModal';

class ModalsWithRouter extends React.PureComponent {
  static propTypes = {
    internal: PropTypes.bool,
    history: PropTypes.object,
  };

  static defaultProps = {
    internal: false,
  };

  render() {
    const { internal, history } = this.props;
    return (
      <>
        {internal && (
          <>
            <RunDefinition />
            <CreateProject history={history} />
            <CreateJobDefinition history={history} />
            <BatchModal history={history} />
          </>
        )}
      </>
    );
  }
}

export const Modals = withRouter(ModalsWithRouter);
