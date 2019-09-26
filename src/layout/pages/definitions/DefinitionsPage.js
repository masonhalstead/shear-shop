import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toolbar, Breadcrumbs } from '@material-ui/core';
import { CustomAppBar } from 'components/app-bar/AppBar';
import { getJobDefinitions as getJobDefinitionsAction } from 'ducks/operators/job_definitions';
import { addJobDefinition as addJobDefinitionAction } from 'ducks/operators/job_definition';
import * as Sentry from '@sentry/browser';
import { CustomizedInputBase } from 'components/search/SearchInput';
import { logoutUser, setLoading } from 'ducks/actions';
import RunDefinition from 'layout/components/modals/run-definition/RunDefinition';
import { CreateJobDefinition } from 'layout/components/modals/create-job-definition/CreateJobDefinition';
import { Table } from 'components/table/Table';
import uuid from 'uuid';
import { DropdownMulti } from 'components/dropdowns/DropdownMulti';
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

  static getDerivedStateFromProps(props, state) {
    const filter = props.location.pathname.split('/');
    const label = filter[4].charAt(0).toUpperCase() + filter[4].slice(1);

    if (state.label !== label) {
      return { label };
    }

    return state;
  }

  state = {
    label: 'Unarchived',
    run: false,
    title: '',
    jobName: '',
    open: false,
    id: '',
    columns: [],
    search_string: '',
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
    },
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
    this.setState({ open: false });
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

  handleTableSearch = e => {
    this.setState({ search_string: e.target.value });
  };

  changeJobName = name => {
    this.setState({ jobName: name });
  };

  handleOnColumnCheck = item => {
    const { headers, columns } = this.state;
    const index = columns.indexOf(item.title);
    let new_columns = [...columns];

    if (index === -1) {
      new_columns = [...new_columns, item.title];
    } else {
      new_columns.splice(index, 1);
    }

    const new_headers = headers.map(header => ({
      ...header,
      show: !new_columns.includes(header.title),
    }));

    // Setting both the columns and headers
    this.setState({ columns: new_columns, headers: new_headers });
  };

  logout = () => {
    const { logoutUserProps, history } = this.props;
    logoutUserProps();
    localStorage.clear();
    history.push('/login');
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
      hamburger,
      definitions,
      history,
      lookups,
      settings: { project },
      projects,
      location,
    } = this.props;
    const { label, run, title, open, jobName, id } = this.state;

    const projectId = location.pathname.split('/')[2];

    let projectName = '';
    if (projects.length > 0) {
      if (!Object(project).hasOwnProperty('project_id')) {
        projectName = projects.filter(
          project => project.project_id === Number(projectId),
        )[0].project_name;
      } else {
        projectName = project.project_name;
      }
    }
    return (
      <>
        <CustomAppBar hamburger={hamburger.open}>
          <Toolbar className={cn.toolbar}>
            <Breadcrumbs
              separator={
                <FontAwesomeIcon icon="chevron-right" color="#818fa3" />
              }
              aria-label="breadcrumb"
              classes={{ separator: cn.separator, root: cn.text }}
            >
              <div
                className={cn.text}
                onClick={() => {
                  history.push(`/projects`);
                }}
              >
                {projectName}
              </div>
              <div>{label}</div>
            </Breadcrumbs>
            <div className={cn.actionWrapper}>
              <div className={cn.searchContainer}>
                <CustomizedInputBase onSearch={this.handleTableSearch} />
              </div>
              <div className={cn.iconContainer}>
                <DropdownMulti
                  rows={this.state.headers.filter(
                    header => !!header.title && !header.flex_grow,
                  )}
                  checked={this.state.columns}
                  checked_key="title"
                  row_key="title"
                  icon={['fas', 'cog']}
                  handleOnSelect={this.handleOnColumnCheck}
                />
              </div>
              <div
                className={cn.iconContainer}
                onClick={() => this.setState({ open: true })}
              >
                <FontAwesomeIcon icon="plus" color="#818fa3" />
              </div>
              <div className={cn.logout} onClick={this.logout}>
                <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
              </div>
            </div>
          </Toolbar>
        </CustomAppBar>
        <div className={cn.contentWrapper}>
          <Table
            rows={definitions}
            headers={this.state.headers}
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
            search_input={this.state.search_string}
            settings={this.state.settings}
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
            projectId={projectId}
          />
        )}
        <CreateJobDefinition
          handleCloseDefinition={this.handleCloseDefinition}
          open={open}
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionsPage);
