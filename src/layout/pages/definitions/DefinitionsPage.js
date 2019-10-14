import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDefinitionsConfig as getDefinitionsConfigAction } from 'ducks/operators/job_definitions';
import { createDefinition as createDefinitionAction } from 'ducks/operators/job_definition';
import { handleError as handleErrorAction } from 'ducks/operators/settings';
import {
  logoutUser,
  setLoading,
  toggleModal as toggleModalAction,
} from 'ducks/actions';
import RunDefinition from 'layout/components/modals/run-definition/RunDefinition';
import { CreateJobDefinition } from 'layout/components/modals/create-job-definition/CreateJobDefinition';
import { Table } from 'components/table/Table';
import uuid from 'uuid';
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
import { DefinitionsTabs } from './DefinitionsTabs';

class DefinitionsPage extends PureComponent {
  static propTypes = {
    getDefinitionsConfig: PropTypes.func,
    handleError: PropTypes.func,
    setLoadingAction: PropTypes.func,
    createDefinition: PropTypes.func,
    toggleModal: PropTypes.func,
    definitions: PropTypes.array,
    history: PropTypes.object,
    project: PropTypes.object,
    location: PropTypes.object,
    lookups: PropTypes.object,
    settings: PropTypes.object,
  };

  state = {
    run: false,
    title: '',
    jobName: '',
    id: '',
    tab: 0,
    headers: [
      {
        title: 'Job',
        show: true,
        flex_grow: 1,
        min_width: '100px',
        sort: 'default',
        sort_key: 'job_definition_name',
        uuid: uuid.v1(),
      },
      {
        title: 'Requirements',
        show: true,
        min_width: '175px',
        uuid: uuid.v1(),
      },
      {
        title: 'Location',
        show: true,
        min_width: '175px',
        sort: 'default',
        sort_key: 'location_name',
        uuid: uuid.v1(),
      },
      {
        title: 'Timeout',
        show: true,
        min_width: '125px',
        sort: 'default',
        sort_key: 'timeout_seconds',
        uuid: uuid.v1(),
      },
      {
        title: 'Method',
        show: true,
        min_width: '125px',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: 'Created By',
        show: true,
        min_width: '125px',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: 'Created',
        show: true,
        min_width: '125px',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: '',
        show: true,
        min_width: '40px',
        sort: false,
        uuid: uuid.v1(),
      },
    ],
    settings: {
      search_key: 'job_definition_name',
      row_height: 33,
    },
    callbacks: {
      openModal: row => this.openModal(row),
    },
  };

  componentDidMount() {
    this.setInitialData();
  }

  setInitialData = async () => {
    const {
      getDefinitionsConfig,
      setLoadingAction,
      handleError,
      location,
    } = this.props;
    const [, , project_id, , filter] = location.pathname.split('/');
    this.setState({
      tab: filter === 'archived' ? 1 : 0,
    });

    setLoadingAction(true);
    try {
      await getDefinitionsConfig(project_id, filter);
    } catch (err) {
      handleError(err);
    }
    setLoadingAction(false);
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

  handleChangeTab = (e, value) => {
    const { history, location } = this.props;
    const [, , project_id, , filter] = location.pathname.split('/');

    this.setState({ tab: value }, () =>
      history.push(
        `/projects/${project_id}/definitions/${
          value === 1 ? 'archived' : 'unarchived'
        }`,
      ),
    );
  };

  openDefinition = definition_id => {
    const { history, location } = this.props;
    const [, , project_id, filter] = location.pathname.split('/');
    history.push(
      `/projects/${project_id}/definitions/${filter}/definition/${definition_id}`,
    );
  };

  changeJobName = name => {
    this.setState({ jobName: name });
  };

  createDefinition = async () => {
    const { jobName } = this.state;
    const {
      createDefinition,
      getDefinitionsConfig,
      location,
      setLoadingAction,
    } = this.props;

    const [, , project_id] = location.pathname.split('/');

    await setLoadingAction(true);

    const definition_id = await createDefinition({
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

    await getDefinitionsConfig(project_id);
    await setLoadingAction(false);
    this.openDefinition(definition_id);
  };

  render() {
    const { definitions, lookups, project, location } = this.props;
    const { modals, definitions_search_input } = this.props.settings;
    const { run, title, jobName, id, tab, headers, settings } = this.state;

    return (
      <div className={cn.pageWrapper}>
        <DefinitionsTabs handleChangeTab={this.handleChangeTab} tab={tab}>
          <div style={{ marginTop: 25 }}>
            <Table
              rows={definitions}
              path={location.pathname.split('/')}
              headers={headers}
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
              search_input={definitions_search_input}
              settings={settings}
              callbacks={this.state.callbacks}
            />
          </div>
        </DefinitionsTabs>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hamburger: state.hamburger,
  definitions: state.definitions,
  lookups: state.lookups,
  settings: state.settings,
  project: state.project,
  projects: state.projects,
});

const mapDispatchToProps = {
  getDefinitionsConfig: getDefinitionsConfigAction,
  createDefinition: createDefinitionAction,
  handleError: handleErrorAction,
  setLoadingAction: setLoading,
  logoutUserProps: logoutUser,
  toggleModal: toggleModalAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionsPage);
