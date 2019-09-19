import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableContainer } from 'components/table-view/TableContainer';
import { TableContent } from 'components/table-view/TableContent';
import { Toolbar, Breadcrumbs, Dialog, Button } from '@material-ui/core';
import { CustomAppBar } from 'components/app-bar/AppBar';
import { getJobDefinitions as getJobDefinitionsAction } from 'ducks/operators/job_definitions';
import { addJobDefinition as addJobDefinitionAction } from 'ducks/operators/job_definition';
import * as Sentry from '@sentry/browser';
import { CustomizedInputBase } from 'components/search/SearchInput';
import { logoutUser, setLoading } from 'ducks/actions';
import Popover from 'components/popover/Popover';
import TableViewCol from 'components/view-column/ViewColumn';
import classNames from 'classnames';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'components/dialogs/Dialogs';
import { CustomInput } from 'components/material-input/CustomInput';
import RunDefinition from 'layout/components/modals/run-definition/RunDefinition';
import cn from './Definitions.module.scss';
import { configureColumns } from './columns';

const result = {
  client: 'Edelman',
  statement: 'April 2019',
  startdate: '2019-04-01T00:00:00',
  enddate: '2019-04-30T00:00:00',
  data: [
    {
      jobdefinition: 'Run Python',
      requirements: '1CPU, 16GM RAM',
      location: 'us east-1',
      timeout: '32min',
      method: 'STDOUT JSON',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 1,
    },
    {
      jobdefinition: 'QScopeUpdate',
      requirements: '1CPU, 16GM RAM',
      location: 'us east-14',
      timeout: '12h 32min',
      method: 'STDOUT',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 2,
    },
    {
      jobdefinition: 'QScopeUpdate Strategy2',
      requirements: '1CPU, 16GM RAM',
      location: 'us east-14',
      timeout: '1h 32min',
      method: 'STDOUT("done")',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 3,
    },
    {
      jobdefinition: 'QScopeUpdate Strategy1',
      requirements: '1CPU, 16GM RAM',
      location: 'us east-2',
      timeout: '2min',
      method: 'Auto',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 3,
    },
  ],
};

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
    } catch (err) {
      // Only fires if the server is off line or the body isnt set correctly
      Sentry.captureException(err);
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
    this.setState({ open: false });
  };

  openModal = (title, id) => {
    this.setState({ run: true, title, id });
  };

  openDefinition = id => {
    const { history } = this.props;
    const projectId = 1;
    history.push(`/projects/${projectId}/definitions/${id}/definition`);
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

  createDefinition = () => {
    const { jobName } = this.state;
    const { addJobDefinition } = this.props;
    addJobDefinition({
      job_definition_name: jobName,
      project_id: 1,
      description: 'Testing Project Description',
      docker_image: '/dockerimage',
      result_method_id: 1,
      startup_command: 'nothing',
      timeout_seconds: 10000,
      stdout_success_text: 'winning',
      region_endpoint_hint: 'us-east-1e',
      parameters: [
        {
          parameter_name: 'Parameter 1',
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
      ],
    });
    this.setState({ open: false });
  };

  render() {
    const {
      hamburger,
      jobDefinitions,
      history,
      lookups,
      settings,
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
    } = this.state;

    let projectName = '';
    if (projects.length > 0) {
      if (!Object(project).hasOwnProperty('project_id')) {
        const projectId = location.pathname.split('/')[2];
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
                      data={result.data}
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
                  ? result.data.filter(item =>
                      item.jobdefinition.toLowerCase().includes(search),
                    )
                  : result.data
              }
              tableOptions={this.options}
              columns={viewColumns}
            />
          </TableContainer>
        )}
        <RunDefinition
          opened={run}
          toggleModal={() => this.setState({ run: false })}
          runJob={this.runJob}
          handleClose={this.handleClose}
          title={title}
          locations={lookups.locations}
        />
        <Dialog
          onClose={this.handleCloseDefinition}
          aria-labelledby="customized-dialog-title"
          open={open}
          classes={{ paper: cn.paper }}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.handleCloseDefinition}
          >
            <div className={cn.title}>Create Job Definition</div>
          </DialogTitle>
          <DialogContent>
            <div className={cn.container}>
              <div className={cn.label}>Job Definition Name</div>
              <CustomInput
                value={jobName}
                name="jobName"
                onChange={e => this.changeJobName(e.target.value)}
              />
            </div>
          </DialogContent>
          <DialogActions className={cn.actions}>
            <Button
              onClick={this.createDefinition}
              color="primary"
              size="large"
              className={classNames(cn.btn, cn.btnPrimary)}
            >
              Create Definition
            </Button>
          </DialogActions>
        </Dialog>
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
