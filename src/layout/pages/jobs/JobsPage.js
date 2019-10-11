import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BatchModal } from 'layout/components/modals/batch-modal/BatchModal';
import {
  getJobs as getJobsAction,
  addJobBatch as addJobBatchAction,
} from 'ducks/operators/jobs';
import { logoutUser, setLoading } from 'ducks/actions';
import * as Sentry from '@sentry/browser';
import { Table } from 'components/table/Table';
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
import { JobTabs } from './JobTabs';

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

  state = {
    open: false,
    jobId: '',
    tab: 0,
    batchName: '',
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

  handleChangeTab = (e, value) => {
    this.setState({ tab: value });
  };

  openModal = row => {
    this.setState({
      open: true,
      jobId: row.job_id,
      batchName: row.batch_name,
    });
  };

  render() {
    const { open, batchName, tab } = this.state;
    const {
      settings: { jobs },
      location,
    } = this.props;
    return (
      <>
        <div className={cn.pageWrapper}>
          <JobTabs handleChangeTab={this.handleChangeTab} tab={tab}>
            <div style={{ marginTop: 25 }}>
              <Table
                rows={result.data}
                path={location.pathname.split('/')}
                headers={jobs.headers}
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
                search_input={jobs.search_string}
                settings={jobs.settings}
                callbacks={this.state.callbacks}
              />
            </div>
          </JobTabs>
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
