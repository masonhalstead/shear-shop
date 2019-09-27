import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toolbar, Breadcrumbs } from '@material-ui/core';
import { CustomAppBar } from 'components/app-bar/AppBar';
import { BatchModal } from 'layout/components/modals/batch-modal/BatchModal';
import {
  getJobs as getJobsAction,
  addJobBatch as addJobBatchAction,
} from 'ducks/operators/jobs';
import { logoutUser, setLoading } from 'ducks/actions';
import * as Sentry from '@sentry/browser';
import { CustomizedInputBase } from 'components/search/SearchInput';
import { DropdownMulti } from 'components/dropdowns/DropdownMulti';
import { Table } from 'components/table/Table';
import uuid from 'uuid';
import {
  JobCell,
  StateCell,
  DurationCell,
  RequirementsCell,
  CreatedByCell,
  CreatedCell,
  EditBatchCell,
  RunJobCell,
} from './JobsCells';
import cn from './Jobs.module.scss';

const result = {
  data: [
    {
      job_id: 389946,
      project_id: 37,
      project_name: 'Lynx (Prod)',
      organization_id: 1,
      organization_name: 'Cognitiv',
      job_state_id: 2,
      job_state_name: '02 - Starting',
      created_by: 'Lynx User',
      start_datetime_utc: '2019-09-26T01:22:29.139083+00:00',
      finish_datetime_utc: null,
      duration_seconds: 4.079993,
      docker_image:
        '387926682510.dkr.ecr.us-east-1.amazonaws.com/cognitiv/lynx/jobs/netcore:0.1.6',
      startup_command:
        'dotnet /usr/local/lib/jobs/Cognitiv.Lynx.Jobs.UniqueUserMap/UniqueUserMap.dll',
      required_cpu: 1,
      required_gpu: 0,
      required_memory_gb: 4,
      required_storage_gb: 1,
      timeout_seconds: 3600,
      region_endpoint_hint: null,
      description: null,
      result_method_id: 3,
      result_method_name: 'STDOUT JSON',
      stdout_success_text: null,
      retries: 0,
      max_retries: 0,
      job_definition_id: 1372,
      job_definition_name: 'Unique User Map',
      batch_id: 233192,
      batch_name: 'Batch 233192',
      batch_descriptor: null,
      location_id: 11,
      location_name: 'Umbra (Prod) VPC - 1c',
    },
    {
      job_id: 389945,
      project_id: 37,
      project_name: 'Lynx (Prod)',
      organization_id: 1,
      organization_name: 'Cognitiv',
      job_state_id: 7,
      job_state_name: '03 - Running',
      created_by: 'Lynx User',
      start_datetime_utc: '2019-09-26T01:22:28.914619+00:00',
      finish_datetime_utc: null,
      duration_seconds: 4.30446,
      docker_image:
        '387926682510.dkr.ecr.us-east-1.amazonaws.com/cognitiv/lynx/jobs/netcore:0.1.6',
      startup_command:
        'dotnet /usr/local/lib/jobs/Cognitiv.Lynx.Jobs.UniqueUserMap/UniqueUserMap.dll',
      required_cpu: 1,
      required_gpu: 0,
      required_memory_gb: 4,
      required_storage_gb: 1,
      timeout_seconds: 3600,
      region_endpoint_hint: null,
      description: null,
      result_method_id: 3,
      result_method_name: 'STDOUT JSON',
      stdout_success_text: null,
      retries: 0,
      max_retries: 0,
      job_definition_id: 1372,
      job_definition_name: 'Unique User Map',
      batch_id: 233191,
      batch_name: 'Batch 233191',
      batch_descriptor: null,
      location_id: 11,
      location_name: 'Umbra (Prod) VPC - 1c',
    },
    {
      job_id: 389944,
      project_id: 37,
      project_name: 'Lynx (Prod)',
      organization_id: 1,
      organization_name: 'Cognitiv',
      job_state_id: 7,
      job_state_name: '03 - Running',
      created_by: 'Lynx User',
      start_datetime_utc: '2019-09-26T01:22:03.645602+00:00',
      finish_datetime_utc: null,
      duration_seconds: 29.573439,
      docker_image:
        '387926682510.dkr.ecr.us-east-1.amazonaws.com/cognitiv/lynx/jobs/netcore:0.1.6',
      startup_command:
        'dotnet /usr/local/lib/jobs/Cognitiv.Lynx.Jobs.UniqueUserMap/UniqueUserMap.dll',
      required_cpu: 1,
      required_gpu: 0,
      required_memory_gb: 4,
      required_storage_gb: 1,
      timeout_seconds: 3600,
      region_endpoint_hint: null,
      description: null,
      result_method_id: 3,
      result_method_name: 'STDOUT JSON',
      stdout_success_text: null,
      retries: 0,
      max_retries: 0,
      job_definition_id: 1372,
      job_definition_name: 'Unique User Map',
      batch_id: 233190,
      batch_name: 'Batch 233190',
      batch_descriptor: null,
      location_id: 11,
      location_name: 'Umbra (Prod) VPC - 1c',
    },
    {
      job_id: 389943,
      project_id: 37,
      project_name: 'Lynx (Prod)',
      organization_id: 1,
      organization_name: 'Cognitiv',
      job_state_id: 7,
      job_state_name: '03 - Running',
      created_by: 'Lynx User',
      start_datetime_utc: '2019-09-26T01:21:29.415905+00:00',
      finish_datetime_utc: null,
      duration_seconds: 63.803165,
      docker_image:
        '387926682510.dkr.ecr.us-east-1.amazonaws.com/cognitiv/lynx/jobs/netcore:0.1.6',
      startup_command:
        'dotnet /usr/local/lib/jobs/Cognitiv.Lynx.Jobs.UniqueUserMap/UniqueUserMap.dll',
      required_cpu: 1,
      required_gpu: 0,
      required_memory_gb: 4,
      required_storage_gb: 1,
      timeout_seconds: 3600,
      region_endpoint_hint: null,
      description: null,
      result_method_id: 3,
      result_method_name: 'STDOUT JSON',
      stdout_success_text: null,
      retries: 0,
      max_retries: 0,
      job_definition_id: 1372,
      job_definition_name: 'Unique User Map',
      batch_id: 233189,
      batch_name: 'Batch 233189',
      batch_descriptor: null,
      location_id: 11,
      location_name: 'Umbra (Prod) VPC - 1c',
    },
    {
      job_id: 389942,
      project_id: 37,
      project_name: 'Lynx (Prod)',
      organization_id: 1,
      organization_name: 'Cognitiv',
      job_state_id: 7,
      job_state_name: '03 - Running',
      created_by: 'Lynx User',
      start_datetime_utc: '2019-09-26T01:21:09.282517+00:00',
      finish_datetime_utc: null,
      duration_seconds: 83.936506,
      docker_image:
        '387926682510.dkr.ecr.us-east-1.amazonaws.com/cognitiv/lynx/jobs/netcore:0.1.6',
      startup_command:
        'dotnet /usr/local/lib/jobs/Cognitiv.Lynx.Jobs.UniqueUserMap/UniqueUserMap.dll',
      required_cpu: 1,
      required_gpu: 0,
      required_memory_gb: 4,
      required_storage_gb: 1,
      timeout_seconds: 3600,
      region_endpoint_hint: null,
      description: null,
      result_method_id: 3,
      result_method_name: 'STDOUT JSON',
      stdout_success_text: null,
      retries: 0,
      max_retries: 0,
      job_definition_id: 1372,
      job_definition_name: 'Unique User Map',
      batch_id: 233188,
      batch_name: 'Batch 233188',
      batch_descriptor: null,
      location_id: 11,
      location_name: 'Umbra (Prod) VPC - 1c',
    },
    {
      job_id: 389941,
      project_id: 37,
      project_name: 'Lynx (Prod)',
      organization_id: 1,
      organization_name: 'Cognitiv',
      job_state_id: 8,
      job_state_name: '04 - Complete',
      created_by: 'Lynx User',
      start_datetime_utc: '2019-09-26T01:20:20.095794+00:00',
      finish_datetime_utc: '2019-09-26T01:22:28.295505+00:00',
      duration_seconds: 128.199711,
      docker_image:
        '387926682510.dkr.ecr.us-east-1.amazonaws.com/cognitiv/lynx/jobs/netcore:0.1.6',
      startup_command:
        'dotnet /usr/local/lib/jobs/Cognitiv.Lynx.Jobs.UniqueUserMap/UniqueUserMap.dll',
      required_cpu: 1,
      required_gpu: 0,
      required_memory_gb: 4,
      required_storage_gb: 1,
      timeout_seconds: 3600,
      region_endpoint_hint: null,
      description: null,
      result_method_id: 3,
      result_method_name: 'STDOUT JSON',
      stdout_success_text: null,
      retries: 0,
      max_retries: 0,
      job_definition_id: 1372,
      job_definition_name: 'Unique User Map',
      batch_id: 233187,
      batch_name: 'Batch 233187',
      batch_descriptor: null,
      location_id: 11,
      location_name: 'Umbra (Prod) VPC - 1c',
    },
    {
      job_id: 389940,
      project_id: 37,
      project_name: 'Lynx (Prod)',
      organization_id: 1,
      organization_name: 'Cognitiv',
      job_state_id: 7,
      job_state_name: '03 - Running',
      created_by: 'Lynx User',
      start_datetime_utc: '2019-09-26T01:20:10.286537+00:00',
      finish_datetime_utc: null,
      duration_seconds: 142.932454,
      docker_image:
        '387926682510.dkr.ecr.us-east-1.amazonaws.com/cognitiv/lynx/jobs/netcore:0.1.6',
      startup_command:
        'dotnet /usr/local/lib/jobs/Cognitiv.Lynx.Jobs.UniqueUserMap/UniqueUserMap.dll',
      required_cpu: 1,
      required_gpu: 0,
      required_memory_gb: 4,
      required_storage_gb: 1,
      timeout_seconds: 3600,
      region_endpoint_hint: null,
      description: null,
      result_method_id: 3,
      result_method_name: 'STDOUT JSON',
      stdout_success_text: null,
      retries: 0,
      max_retries: 0,
      job_definition_id: 1372,
      job_definition_name: 'Unique User Map',
      batch_id: 233186,
      batch_name: 'Batch 233186',
      batch_descriptor: null,
      location_id: 11,
      location_name: 'Umbra (Prod) VPC - 1c',
    },
    {
      job_id: 389939,
      project_id: 37,
      project_name: 'Lynx (Prod)',
      organization_id: 1,
      organization_name: 'Cognitiv',
      job_state_id: 7,
      job_state_name: '03 - Running',
      created_by: 'Lynx User',
      start_datetime_utc: '2019-09-26T01:20:10.277229+00:00',
      finish_datetime_utc: null,
      duration_seconds: 142.941801,
      docker_image:
        '387926682510.dkr.ecr.us-east-1.amazonaws.com/cognitiv/lynx/jobs/netcore:0.1.6',
      startup_command:
        'dotnet /usr/local/lib/jobs/Cognitiv.Lynx.Jobs.UniqueUserMap/UniqueUserMap.dll',
      required_cpu: 1,
      required_gpu: 0,
      required_memory_gb: 4,
      required_storage_gb: 1,
      timeout_seconds: 3600,
      region_endpoint_hint: null,
      description: null,
      result_method_id: 3,
      result_method_name: 'STDOUT JSON',
      stdout_success_text: null,
      retries: 0,
      max_retries: 0,
      job_definition_id: 1372,
      job_definition_name: 'Unique User Map',
      batch_id: 233185,
      batch_name: 'Batch 233185',
      batch_descriptor: null,
      location_id: 11,
      location_name: 'Umbra (Prod) VPC - 1c',
    },
    {
      job_id: 389938,
      project_id: 37,
      project_name: 'Lynx (Prod)',
      organization_id: 1,
      organization_name: 'Cognitiv',
      job_state_id: 7,
      job_state_name: '03 - Running',
      created_by: 'Lynx User',
      start_datetime_utc: '2019-09-26T01:19:30.69401+00:00',
      finish_datetime_utc: null,
      duration_seconds: 182.525017,
      docker_image:
        '387926682510.dkr.ecr.us-east-1.amazonaws.com/cognitiv/lynx/jobs/netcore:0.1.6',
      startup_command:
        'dotnet /usr/local/lib/jobs/Cognitiv.Lynx.Jobs.UniqueUserMap/UniqueUserMap.dll',
      required_cpu: 1,
      required_gpu: 0,
      required_memory_gb: 4,
      required_storage_gb: 1,
      timeout_seconds: 3600,
      region_endpoint_hint: null,
      description: null,
      result_method_id: 3,
      result_method_name: 'STDOUT JSON',
      stdout_success_text: null,
      retries: 0,
      max_retries: 0,
      job_definition_id: 1372,
      job_definition_name: 'Unique User Map',
      batch_id: 233184,
      batch_name: 'Batch 233184',
      batch_descriptor: null,
      location_id: 11,
      location_name: 'Umbra (Prod) VPC - 1c',
    },
    {
      job_id: 389936,
      project_id: 37,
      project_name: 'Lynx (Prod)',
      organization_id: 1,
      organization_name: 'Cognitiv',
      job_state_id: 7,
      job_state_name: '03 - Running',
      created_by: 'Lynx User',
      start_datetime_utc: '2019-09-26T01:17:50.011964+00:00',
      finish_datetime_utc: null,
      duration_seconds: 283.207053,
      docker_image:
        '387926682510.dkr.ecr.us-east-1.amazonaws.com/cognitiv/lynx/jobs/netcore:0.1.6',
      startup_command:
        'dotnet /usr/local/lib/jobs/Cognitiv.Lynx.Jobs.UniqueUserMap/UniqueUserMap.dll',
      required_cpu: 1,
      required_gpu: 0,
      required_memory_gb: 4,
      required_storage_gb: 1,
      timeout_seconds: 3600,
      region_endpoint_hint: null,
      description: null,
      result_method_id: 3,
      result_method_name: 'STDOUT JSON',
      stdout_success_text: null,
      retries: 0,
      max_retries: 0,
      job_definition_id: 1372,
      job_definition_name: 'Unique User Map',
      batch_id: 233182,
      batch_name: 'Batch 233182',
      batch_descriptor: null,
      location_id: 11,
      location_name: 'Umbra (Prod) VPC - 1c',
    },
    {
      job_id: 389935,
      project_id: 37,
      project_name: 'Lynx (Prod)',
      organization_id: 1,
      organization_name: 'Cognitiv',
      job_state_id: 8,
      job_state_name: '04 - Complete',
      created_by: 'Lynx User',
      start_datetime_utc: '2019-09-26T01:17:35.183498+00:00',
      finish_datetime_utc: '2019-09-26T01:22:28.298676+00:00',
      duration_seconds: 293.115178,
      docker_image:
        '387926682510.dkr.ecr.us-east-1.amazonaws.com/cognitiv/lynx/jobs/netcore:0.1.6',
      startup_command:
        'dotnet /usr/local/lib/jobs/Cognitiv.Lynx.Jobs.UniqueUserMap/UniqueUserMap.dll',
      required_cpu: 1,
      required_gpu: 0,
      required_memory_gb: 4,
      required_storage_gb: 1,
      timeout_seconds: 3600,
      region_endpoint_hint: null,
      description: null,
      result_method_id: 3,
      result_method_name: 'STDOUT JSON',
      stdout_success_text: null,
      retries: 0,
      max_retries: 0,
      job_definition_id: 1372,
      job_definition_name: 'Unique User Map',
      batch_id: 233181,
      batch_name: 'Batch 233181',
      batch_descriptor: null,
      location_id: 11,
      location_name: 'Umbra (Prod) VPC - 1c',
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

  state = {
    label: 'Last 24 Hours',
    open: false,
    jobId: '',
    batchName: '',
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
        title: 'State',
        show: true,
        min_width: '125px',
        uuid: uuid.v1(),
      },
      {
        title: 'Duration',
        show: true,
        min_width: '125px',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: 'Requirements',
        show: true,
        min_width: '150px',
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
      row_height: 32,
    },
    callbacks: {
      openModal: row => this.openModal(row),
    },
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
    } catch (err) {
      // Only fires if the server is off line or the body isnt set correctly
      Sentry.captureException(err);
    }
    setLoadingAction(false);
  };

  onSearch = e => {
    this.setState({ search_string: e.target.value });
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

  openModal = row => {
    this.setState({
      open: true,
      jobId: row.job_id,
      batchName: row.batch_name,
    });
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
                <DropdownMulti
                  rows={this.state.headers.filter(
                    header => !!header.title && !header.flex_grow,
                  )}
                  checked={this.state.columns}
                  checked_key="title"
                  row_key="title"
                  icon={['fas', 'cog']}
                  inner_title="Hide Columns"
                  handleOnSelect={this.handleOnColumnCheck}
                />
              </div>
              <div className={cn.logout} onClick={this.logout}>
                <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
              </div>
            </div>
          </Toolbar>
        </CustomAppBar>
        <div className={cn.contentWrapper}>
          <Table
            rows={result.data}
            headers={this.state.headers}
            cell_components={[
              JobCell,
              StateCell,
              DurationCell,
              RequirementsCell,
              CreatedByCell,
              CreatedCell,
              EditBatchCell,
              RunJobCell,
            ]}
            search_input={this.state.search_string}
            settings={this.state.settings}
            callbacks={this.state.callbacks}
          />
        </div>
        <BatchModal
          handleCloseBatch={this.handleCloseBatch}
          open={open}
          batchName={batchName}
          changeBatchName={this.changeBatchName}
          createBatch={this.createBatch}
        />
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
