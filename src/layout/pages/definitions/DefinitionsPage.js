import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableContainer } from 'components/table-view/TableContainer';
import { TableContent } from 'components/table-view/TableContent';
import { Toolbar, Breadcrumbs } from '@material-ui/core';
import { CustomAppBar } from 'components/app-bar/AppBar';
import { getJobDefinitions as getJobDefinitionsAction } from 'ducks/operators/job_definitions';
import { addJobDefinition as addJobDefinitionAction } from 'ducks/operators/job_definition';
import * as Sentry from '@sentry/browser';
import { CustomizedInputBase } from 'components/search/SearchInput';
import { logoutUser, setLoading } from 'ducks/actions';
import Popover from 'components/popover/Popover';
import TableViewCol from 'components/view-column/ViewColumn';
import RunDefinition from 'layout/components/modals/run-definition/RunDefinition';
import { CreateJobDefinition } from 'layout/components/modals/create-job-definition/CreateJobDefinition';
import cn from './Definitions.module.scss';
import { configureColumns } from './columns';

class DefinitionsPage extends PureComponent {
  static propTypes = {
    getJobDefinitions: PropTypes.func,
    setLoadingAction: PropTypes.func,
    hamburger: PropTypes.object,
    jobDefinitions: PropTypes.array,
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

  options = {
    filterType: 'textField',
    selectableRows: 'none',
    search: false,
    pagination: false,
    filter: false,
    download: false,
    viewColumns: false,
    print: false,
  };

  state = {
    label: 'Unarchived',
    run: false,
    title: '',
    search: '',
    jobName: '',
    columns: [],
    viewColumns: [],
    open: false,
    id: '',
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
      await this.createColumns();
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

  openModal = (title, id) => {
    this.setState({ run: true, title, id });
  };

  openDefinition = id => {
    const { history, location } = this.props;
    const [, , project_id] = location.pathname.split('/');
    history.push(`/projects/${project_id}/definitions/${id}/definition`);
  };

  onSearch = e => {
    this.setState({ search: e.target.value });
  };

  createColumns = () => {
    const columns = configureColumns(this.openModal, this.openDefinition);
    this.setState({ columns, viewColumns: columns });
  };

  changeJobName = name => {
    this.setState({ jobName: name });
  };

  handleColChange = (value, index, checked) => {
    const { viewColumns } = this.state;
    const filtered = [];
    const viewColumnsNew = [];
    viewColumns.forEach(column => {
      if (value !== column.name) {
        viewColumnsNew.push(column);
      } else {
        column.options.display = checked;
        viewColumnsNew.push(column);
      }
    });

    this.setState({ viewColumns: viewColumnsNew });
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
      jobDefinitions,
      history,
      lookups,
      settings: { project },
      projects,
      location,
    } = this.props;
    const {
      label,
      run,
      title,
      search,
      columns,
      viewColumns,
      open,
      jobName,
      id,
    } = this.state;

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
                <CustomizedInputBase onSearch={this.onSearch} />
              </div>
              <div className={cn.iconContainer}>
                <Popover
                  trigger={<FontAwesomeIcon icon="cog" color="#818fa3" />}
                  content={
                    <TableViewCol
                      data={jobDefinitions}
                      columns={viewColumns}
                      options={this.options}
                      handleColChange={this.handleColChange}
                    />
                  }
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
        {columns.length > 0 && (
          <TableContainer>
            <TableContent
              tableData={
                search.length > 0
                  ? jobDefinitions.filter(item =>
                      item.job_definition_name.toLowerCase().includes(search),
                    )
                  : jobDefinitions
              }
              tableOptions={this.options}
              columns={viewColumns}
            />
          </TableContainer>
        )}
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
  jobDefinitions: state.jobDefinitions,
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
