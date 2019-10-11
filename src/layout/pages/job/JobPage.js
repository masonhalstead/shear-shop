import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getJobConfig as getJobConfigAction } from 'ducks/operators/job';
import * as Sentry from '@sentry/browser';
import { Paper } from '@material-ui/core';
import {
  logoutUser,
  setLoading,
  setJob as setCurrentJobAction,
} from 'ducks/actions';
import cn from './Job.module.scss';
import { JobTabs } from './JobTabs';
import { TopPanel } from './TopPanel';
import { STDOutTab } from './STDOutTab';
import { InputTab } from './InputTab';
import { OutputTab } from './OutputTab';
import { HistoryTab } from './HistoryTab';
import socketIOClient from 'socket.io-client';

const data = {
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
};

const tabStyle = {
  width: '300px',
  fontSize: 14,
  fontWeight: 400,
  minHeight: 44,
  textTransform: 'capitalize',
  borderBottom: '1px solid transparent',
  borderRight: '1px solid #cfd7e6',
};

class JobPage extends PureComponent {
  static propTypes = {
    getProjects: PropTypes.func,
    projects: PropTypes.array,
    history: PropTypes.object,
    location: PropTypes.object,
  };

  static getDerivedStateFromProps(props, state) {
    const filter = props.location.pathname.split('/');
    const label = filter[4].charAt(0).toUpperCase() + filter[4].slice(1);

    if (state.label !== label) {
      return { label };
    }

    return state;
  }

  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      endpoint: 'http://127.0.0.1:4001',
      stdOutData: [],
    };
    this.socket = socketIOClient(this.state.endpoint);
  }

  componentDidMount() {
    this.setInitialData();
  }

  componentWillUnmount() {
    this.socket.disconnect();
    this.setState({ changes: false });
  }

  setInitialData = async () => {
    const {
      getJobConfig,
      setLoadingAction,
      location,
      setJob,
    } = this.props;
    const { stdOutData } = this.state;
    const [, , , , job_id] = location.pathname.split('/');

    this.socket.on('FromAPI', data => {
      stdOutData.push(data);
      this.setState({ stdOutData: [...stdOutData] });
    });

    setJob({ job_id, jobName: data.job_definition_name });

    try {
      await setLoadingAction(true);
      const job = await getJobConfig(job_id);
      // setCurrentJob({ job_id, jobName: job.job_definition_name });
    } catch (err) {
      // Only fires if the server is off line or the body isnt set correctly
      Sentry.captureException(err);
    }
    setLoadingAction(false);
  };

  handleChangeTab = (event, newValue) => {
    this.setState({ tab: newValue });
  };

  render() {
    const { tab, stdOutData } = this.state;
    let content = '';
    let contentInside = '';
    if (tab === 0) {
      content = <STDOutTab stdOutData={stdOutData} />;
    }
    if (tab === 1) {
      content = <InputTab rows={[]} />;
      contentInside = <TopPanel data={data} />;
    }
    if (tab === 2) {
      content = <OutputTab options={this.options} />;
    }

    if (tab === 3) {
      content = <HistoryTab options={this.options} />;
    }

    return (
      <div className={cn.pageWrapper}>
        <Paper className={cn.contentAlignHeader}>
          <div className={cn.firstRow}>
            <div className={cn.textMarginBig}>
              <div className={cn.circle} />
              <div>{`Job: ${data.job_id}`}</div>
            </div>
            <div className={cn.textColor}>{data.job_state_name}</div>
          </div>
          <div className={cn.firstRow}>
            <div className={cn.textMargin}>{`Parse Logs: ${new Date(
              data.start_datetime_utc,
            ).toLocaleDateString('en-US')}`}</div>
            <div className={cn.textMargin}>16h 32m 12s</div>
          </div>
          <div className={cn.firstRow}>
            <div className={cn.textMargin}>{data.project_name}</div>
            <div className={cn.textMargin}>460MB / 900MB</div>
          </div>
        </Paper>
        <Paper className={cn.contentAlignSecond}>
          <JobTabs
            tab={tab}
            tabStyle={tabStyle}
            handleChangeTab={this.handleChangeTab}
          />
          {tab === 0 && <div className={cn.tabValueFirst}>{content}</div>}
          {tab === 1 && (
            <div className={cn.tabValueSecond}>{contentInside}</div>
          )}
          {tab !== 0 && <div className={cn.tabValueAlt}>{content}</div>}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  settings: state.settings,
});

const mapDispatchToProps = {
  getJobConfig: getJobConfigAction,
  logoutUserProps: logoutUser,
  setLoadingAction: setLoading,
  setJob: setCurrentJobAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobPage);
