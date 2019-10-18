import React from 'react';
import PropTypes from 'prop-types';
import { RunDefinition } from './run-definition/RunDefinition';
import CreateProjectModal from './project-modal/CreateProject';
import CreateJobDefinition from './create-job-definition/CreateJobDefinition';
import BatchModal from './batch-modal/BatchModal';

export class Modals extends React.PureComponent {
  static propTypes = {
    internal: PropTypes.bool,
  };

  static defaultProps = {
    internal: false,
    opened: false,
  };

  render() {
    const {
      internal,
      project,
      history,
      definition,
      location,
      batch,
      opened
    } = this.props;
    return (
      <>
        {internal && <RunDefinition />}
        {project && <CreateProjectModal history={history} />}
        {definition && (
          <CreateJobDefinition history={history} location={location} />
        )}
        {batch && opened && <BatchModal history={history} location={location} />}
      </>
    );
  }
}
