import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getJobDefinitions as getJobDefinitionsAction } from 'ducks/operators/job_definitions';
import { addJobDefinition as addJobDefinitionAction } from 'ducks/operators/job_definition';
import * as Sentry from '@sentry/browser';
import { logoutUser, setLoading, toggleModal as toggleModalAction } from 'ducks/actions';
import RunDefinition from 'layout/components/modals/run-definition/RunDefinition';
import { CreateJobDefinition } from 'layout/components/modals/create-job-definition/CreateJobDefinition';
import { Table } from 'components/table/Table';
import cn from './Definitions.module.scss';
import {
  JobCell,
  RequirementsCell,
  LocationCell,
  TimeoutCell,
  ResultMethodCell,
  CreatedByCell,
  CreatedCell,
  RunCell,
} from './DefinitionCells';

class DefinitionsPage extends PureComponent {
  static propTypes = {
    getJobDefinitions: PropTypes.func,
    setLoadingAction: PropTypes.func,
    hamburger: PropTypes.object,
    definitions: PropTypes.array,
    history: PropTypes.object,
    location: PropTypes.object,
    lookups: PropTypes.object,
  };

  state = {
    run: false,
    title: '',
    jobName: '',
    open: false,
    id: '',
    callbacks: {
      openModal: row => this.openModal(row),
    },
  };

  componentDidMount() {
    this.setInitialData();
  }

  setInitialData = async () => {
    const { getJobDefinitions, setLoadingAction, location } = this.props;
    const [, , project_id] = location.pathname.split('/');

    try {
      await setLoadingAction(true);
      await getJobDefinitions(project_id);
      setLoadingAction(false);
    } catch (err) {
      // Only fires if the server is off line or the body isnt set correctly
      Sentry.captureException(err);
      setLoadingAction(false);
    }
  };

  runJob = () => {
    this.setState({ run: false });
  };

  handleClose = () => {
    this.setState({ run: false });
  };

  handleCloseDefinition = () => {
    const { toggleModal } = this.props;
    toggleModal({ definitions: false });
  };

  openModal = row => {
    this.setState({
      run: true,
      id: row.job_definition_id,
      title: row.job_definition_name,
    });
  };

  openDefinition = id => {
    const { history, location } = this.props;
    const [, , project_id] = location.pathname.split('/');
    history.push(`/projects/${project_id}/definitions/${id}/definition`);
  };

  changeJobName = name => {
    this.setState({ jobName: name });
  };

  createDefinition = async () => {
    const { jobName } = this.state;
    const {
      addJobDefinition,
      getJobDefinitions,
      location,
      setLoadingAction,
    } = this.props;

    const [, , project_id] = location.pathname.split('/');

    await setLoadingAction(true);

    const id = await addJobDefinition({
      job_definition_name: jobName,
      project_id,
      description: 'Testing Project Description',
      docker_image: '/dockerimage',
      result_method_id: 1,
      startup_command: 'nothing',
      timeout_seconds: 86400,
      stdout_success_text: 'winning',
      region_endpoint_hint: 'us-east-1e',
      cpu: 0,
      gpu: 0,
      memory_gb: 0,
      parameters: [
        {
          parameter_name: 'Parameter2',
          parameter_direction_id: 1,
          parameter_method_id: 1,
          is_required: true,
          is_encrypted: true,
          parameter_value: 'Default Value',
          description: 'Parameter description',
          command_line_prefix: null,
          command_line_assignment_char: null,
          command_line_escaped: null,
          command_line_ignore_name: null,
          reference_type_id: null,
          reference_id: null,
          reference_parameter_name: null,
        },
        {
          parameter_name: 'Parameter3',
          parameter_direction_id: 2,
          parameter_method_id: 1,
          is_required: true,
          is_encrypted: true,
          parameter_value: 'Default Value',
          description: 'Parameter description',
          command_line_prefix: null,
          command_line_assignment_char: null,
          command_line_escaped: null,
          command_line_ignore_name: null,
          reference_type_id: null,
          reference_id: null,
          reference_parameter_name: null,
        },
      ],
    });

    await getJobDefinitions(project_id);
    await setLoadingAction(false);

    this.setState({ open: false });

    this.openDefinition(id);
  };

  render() {
    const {
      definitions,
      lookups,
      settings: { definitions: reduxDefinitions, project, modals },
    } = this.props;
    const { run, title, open, jobName, id } = this.state;

    return (
      <>
        <div className={cn.contentWrapper}>
          <Table
            rows={definitions}
            headers={reduxDefinitions.headers}
            cell_components={[
              JobCell,
              RequirementsCell,
              LocationCell,
              TimeoutCell,
              ResultMethodCell,
              CreatedByCell,
              CreatedCell,
              RunCell,
            ]}
            search_input={reduxDefinitions.search_string}
            settings={reduxDefinitions.settings}
            callbacks={this.state.callbacks}
          />
        </div>
        {run && (
          <RunDefinition
            opened={run}
            toggleModal={() => this.setState({ run: false })}
            runJob={this.runJob}
            handleClose={this.handleClose}
            title={title}
            id={id}
            locations={lookups.locations}
            projectId={project.project_id}
          />
        )}
        <CreateJobDefinition
          handleCloseDefinition={this.handleCloseDefinition}
          open={modals.definitions}
          jobName={jobName}
          changeJobName={this.changeJobName}
          createDefinition={this.createDefinition}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  hamburger: state.hamburger,
  definitions: state.definitions,
  lookups: state.lookups,
  settings: state.settings,
  projects: state.projects,
});

const mapDispatchToProps = {
  getJobDefinitions: getJobDefinitionsAction,
  addJobDefinition: addJobDefinitionAction,
  setLoadingAction: setLoading,
  logoutUserProps: logoutUser,
  toggleModal: toggleModalAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionsPage);
