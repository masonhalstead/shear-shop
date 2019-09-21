import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableContainer } from 'components/table-view/TableContainer';
import { TableContent } from 'components/table-view/TableContent';
import { Toolbar, Breadcrumbs, Dialog, Button } from '@material-ui/core';
import { CustomAppBar } from 'components/app-bar/AppBar';
import {
  getJobs as getJobsAction,
  addJobBatch as addJobBatchAction,
} from 'ducks/operators/jobs';
import { logoutUser, setLoading } from 'ducks/actions';
import * as Sentry from '@sentry/browser';
import { CustomizedInputBase } from 'components/search/SearchInput';
import Popover from 'components/popover/Popover';
import TableViewCol from 'components/view-column/ViewColumn';
import { configureColumns } from './columns';
import cn from './Jobs.module.scss';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'components/dialogs/Dialogs';
import { CustomInput } from 'components/material-input/CustomInput';
import classNames from 'classnames';

const result = {
  data: [
    {
      jobname: 'Run Python',
      state: 'queued',
      duration: '4h 23m',
      requirements: '1CPU, 16GM RAM',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 1,
    },
    {
      jobname: 'QScopeUpdate',
      state: 'complete',
      duration: '1d 4h 23m',
      requirements: '1CPU, 16GM RAM',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 2,
    },
    {
      jobname: 'QScopeUpdate Strategy2',
      state: 'running',
      duration: '1d 4h 23m',
      requirements: '1CPU, 16GM RAM',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 3,
    },
    {
      jobname: 'QScopeUpdate Strategy1',
      state: 'failed',
      duration: '1d 4h 23m',
      requirements: '1CPU, 16GM RAM',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 4,
    },
  ],
};

class JobsPage extends PureComponent {
  static propTypes = {
    getProjects: PropTypes.func,
    hamburger: PropTypes.object,
    projects: PropTypes.array,
    history: PropTypes.object,
    location: PropTypes.object,
  };

  static getDerivedStateFromProps(props, state) {
    const filter = props.location.pathname.split('/');
    let label = 'Last 24 Hours';

    if (filter[4] === '7') {
      label = 'Last 7 Days';
    }
    if (filter[4] !== '24' && filter[4] !== '7') {
      label = filter[4].charAt(0).toUpperCase() + filter[4].slice(1);
    }
    if (state.label !== label) {
      return { label };
    }

    return state;
  }

  options = {
    filterType: 'textField',
    selectableRows: 'none',
    search: true,
    pagination: false,
    filter: true,
    download: false,
    viewColumns: true,
    print: false,
  };

  state = {
    label: 'Last 24 Hours',
    search: '',
    viewColumns: [],
    columns: [],
    open: false,
    jobId: '',
    batchName: '',
  };

  componentDidMount() {
    this.setInitialData();
  }

  setInitialData = async () => {
    const { getJobs, setLoadingAction, location } = this.props;
    const [, , project_id, , filter] = location.pathname.split('/');

    try {
      await setLoadingAction(true);
      await getJobs({ project_id }); // TODO: integrate days & state
      await this.createColumns();
    } catch (err) {
      // Only fires if the server is off line or the body isnt set correctly
      Sentry.captureException(err);
    }
    setLoadingAction(false);
  };

  onSearch = e => {
    this.setState({ search: e.target.value });
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

  handleCloseBatch = () => {
    this.setState({ open: false });
  };

  changeBatchName = name => {
    this.setState({ batchName: name });
  };

  createBatch = async () => {
    const { batchName, jobId } = this.state;
    const { addJobBatch, getJobs, location } = this.props;
    const [, , project_id, , filter] = location.pathname.split('/');
    await addJobBatch({ batch_name: batchName, job_id: jobId, project_id });

    await getJobs({ project_id });

    this.setState({ open: false, batchName: '', jobId: '' });
  };

  openDetailPage = id => {
    const {
      history,
      settings: { project },
    } = this.props;
    history.push(`/projects/${project.project_id}/jobs/${id}/job`);
  };

  openBatch = id => {
    const { jobs } = this.props;
    let batch = '';
    if (jobs.length > 0) {
      batch = jobs.filter(filter => filter.job_id === Number(id))[0].batch_name;
    }
    this.setState({ jobId: id, open: true, batchName: batch });
  };

  createColumns = () => {
    const columns = configureColumns(this.openDetailPage, this.openBatch);
    this.setState({ columns, viewColumns: columns });
  };

  logout = () => {
    const { logoutUserProps, history } = this.props;
    logoutUserProps();
    localStorage.clear();
    history.push('/login');
  };

  render() {
    const {
      hamburger,
      projects,
      history,
      location,
      settings: { project },
    } = this.props;
    const { label, search, viewColumns, columns, open, batchName } = this.state;
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
              {' '}
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  history.push(`/projects`);
                }}
              >
                {projectName}
              </div>
              <div>{label}</div>
            </Breadcrumbs>
            <div className={cn.flexGrow} />
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
                      item.jobname.toLowerCase().includes(search),
                    )
                  : result.data
              }
              tableOptions={this.options}
              columns={viewColumns}
              styles={{
                MuiTableCell: {
                  root: {
                    border: '1px solid #dde3ee',
                    borderBottom: '1px solid #dde3ee',
                  },
                  body: {
                    fontSize: '13px',
                    fontWeight: 300,
                    lineHeight: '1',
                    padding: '5px !important',
                    '&:nth-child(4)': {
                      width: 114,
                    },
                    '&:nth-child(6)': {
                      width: 114,
                    },
                    '&:nth-child(8)': {
                      width: 114,
                    },
                    '&:nth-child(10)': {
                      width: 114,
                    },
                    '&:nth-child(12)': {
                      width: 124,
                    },
                    '&:nth-child(14)': {
                      width: 39,
                    },
                    '&:nth-child(16)': {
                      width: 39,
                    },
                  },
                  head: {
                    fontSize: '1rem',
                  },
                },
              }}
            />
          </TableContainer>
        )}
        <Dialog
          onClose={this.handleCloseBatch}
          aria-labelledby="customized-dialog-title"
          open={open}
          classes={{ paper: cn.paper }}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.handleCloseProject}
          >
            <div className={cn.title}>Edit Batch</div>
          </DialogTitle>
          <DialogContent>
            <div className={cn.container}>
              <div className={cn.label}>Batch Name</div>
              <CustomInput
                value={batchName}
                name="batchName"
                onChange={e => this.changeBatchName(e.target.value)}
              />
            </div>
          </DialogContent>
          <DialogActions className={cn.actions}>
            <Button
              onClick={this.createBatch}
              color="primary"
              size="large"
              className={classNames(cn.btn, cn.btnPrimary)}
            >
              Edit Batch
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = state => ({
  hamburger: state.hamburger,
  projects: state.projects,
  settings: state.settings,
  jobs: state.jobs,
});

const mapDispatchToProps = {
  getJobs: getJobsAction,
  logoutUserProps: logoutUser,
  setLoadingAction: setLoading,
  addJobBatch: addJobBatchAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobsPage);
