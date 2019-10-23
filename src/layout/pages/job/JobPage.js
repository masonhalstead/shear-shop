import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getJobConfig as getJobConfigAction } from 'ducks/operators/job';
import * as Sentry from '@sentry/browser';
import moment from 'moment';
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
import cryptoJS from 'crypto-js';
import classNames from 'classnames';

const { REACT_APP_HOST } = process.env;

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
    const [, , , , , , job_id] = props.location.pathname.split('/');

    const private_key = localStorage.getItem('private_key');
    const public_key = localStorage.getItem('public_key');

    if (!private_key || !public_key) {
      throw new Error('Error authenticating credentials');
    }
    const hmac = cryptoJS.HmacSHA256(`/jobs/${job_id}/get_log`, private_key);
    const hash = hmac
      .toString()
      .replace('-', '')
      .toLowerCase();
    this.socket = socketIOClient(this.state.endpoint, {
      query: {
        jobId: job_id,
        private_key: localStorage.getItem('private_key'),
        public_key: localStorage.getItem('public_key'),
        host: REACT_APP_HOST,
        hash,
      },
    });
  }

  componentDidMount() {
    this.setInitialData();
  }

  componentWillUnmount() {
    this.socket.disconnect();
    this.setState({ changes: false });
  }

  setInitialData = async () => {
    const { getJobConfig, setLoadingAction, location, setJob } = this.props;
    const [, , project_id, , , , job_id] = location.pathname.split('/');

    this.socket.on('FromAPI', data => {
      this.setState({ stdOutData: [...data] });
    });

    try {
      await setLoadingAction(true);
      const job = await getJobConfig(project_id, job_id);
      setJob({ ...job, job_id, jobName: job.job_definition_name });
    } catch (err) {
      Sentry.captureException(err);
    }
    setLoadingAction(false);
  };

  handleChangeTab = (event, newValue) => {
    this.setState({ tab: newValue });
  };

  render() {
    const { tab, stdOutData } = this.state;
    const {
      job: { job, job_logs },
    } = this.props;
    let content = '';
    let contentInside = '';
    if (tab === 0) {
      console.log(stdOutData);
      content = <STDOutTab stdOutData={stdOutData} />;
    }
    if (tab === 1) {
      content = <InputTab rows={[]} />;
      contentInside = <TopPanel data={job} />;
    }
    if (tab === 2) {
      content = <OutputTab options={this.options} />;
    }

    if (tab === 3) {
      content = <HistoryTab options={this.options} data={job_logs} />;
    }

    return (
      <div className={cn.pageWrapper}>
        <Paper className={cn.contentAlignHeader}>
          <div className={cn.firstRow}>
            <div className={cn.textMarginBig}>
              <div
                className={classNames({
                  [cn.circleRed]: [99].includes(job.job_state_id),
                  [cn.circleGreen]: [2, 7, 8].includes(job.job_state_id),
                  [cn.circleGray]: [3].includes(job.job_state_id),
                })}
              />
              <div>{`Job: ${job.job_id}`}</div>
            </div>
            <div
              className={classNames({
                [cn.textRed]: [99].includes(job.job_state_id),
                [cn.textGreen]: [2, 7, 8].includes(job.job_state_id),
                [cn.textGray]: [3].includes(job.job_state_id),
              })}
            >
              {job.job_state_name}
            </div>
          </div>
          <div className={cn.firstRow}>
            <div className={cn.textMargin}>{`Parse Logs: ${moment(
              job.start_datetime_utc,
            ).format('MM/DD/YYYY HH:MM:ss')}`}</div>
            <div className={cn.textMargin}>
              {moment(job.duration_seconds).format('HH:MM:ss')}
            </div>
          </div>
          <div className={cn.firstRow}>
            <div className={cn.textMargin}>{job.project_name}</div>
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
  job: state.job,
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
