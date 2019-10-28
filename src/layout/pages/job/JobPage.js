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
import { getWebSocket } from 'utils/axios';
import socketIOClient from 'socket.io-client';
import { normalizeSeconds } from 'utils/normalizers';
import classNames from 'classnames';
import cn from './Job.module.scss';
import { JobTabs } from './JobTabs';
import { TopPanel } from './TopPanel';
import { STDOutTab } from './STDOutTab';
import { InputTab } from './InputTab';
import { OutputTab } from './OutputTab';
import { HistoryTab } from './HistoryTab';

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
    getJobConfig: PropTypes.func,
    setLoadingAction: PropTypes.func,
    container: PropTypes.object,
    job: PropTypes.object,
    location: PropTypes.object,
  };

  state = {
    tab: 0,
    job_id: '',
    job_state_id: '',
    job_state_name: '',
    job_definition_name: '',
    batch_name: '',
    datetime_utc: new Date(),
    seconds_running: 0,
    standard_out: '',
  };

  componentDidMount() {
    this.setInitialData();
  }

  handleWebSocket = () => {
    const { job_id } = this.props.job;
    const { container_id } = this.props.container;
    const socket = socketIOClient('http://127.0.0.1:4001');

    socket.on('connect', () => {
      const payload = {
        get_log: getWebSocket(`/jobs/${job_id}/get_log`),
        standard_out: getWebSocket(
          `/containers/${container_id}/stdout_contents`,
        ),
      };
      socket.send(payload);
    });
    socket.on('FromAPI', data => {
      const { datetime_utc } = data.get_log;

      const current_date = moment().utc();
      const compare_date = moment(datetime_utc).utc();
      const difference = current_date.diff(compare_date, 'seconds');
      this.setState({
        ...data.get_log,
        seconds_running: difference,
        standard_out: data.standard_out,
      });
    });
  };

  setInitialData = async () => {
    const { getJobConfig, setLoadingAction, location } = this.props;
    const [, , project_id, , , , job_id] = location.pathname.split('/');

    try {
      await setLoadingAction(true);
      const job = await getJobConfig(project_id, job_id);
      console.log(job);
      this.setState({
        job_id: job.job_id,
        job_state_id: job.job_state_id,
        job_state_name: job.job_state_name,
        job_definition_name: job.job_definition_name,
        batch_name: job.batch_name,
      });
      await this.handleWebSocket();
    } catch (err) {
      Sentry.captureException(err);
    }
    setLoadingAction(false);
  };

  handleChangeTab = (event, newValue) => {
    this.setState({ tab: newValue });
  };

  render() {
    const {
      tab,
      standard_out,
      job_id,
      job_state_id,
      job_state_name,
      job_definition_name,
      batch_name,
      seconds_running,
      datetime_utc,
    } = this.state;
    const {
      job: { logs, required_memory_gb, ...rest },
      container: { max_memory_mb },
      parameters,
    } = this.props;
    let content = '';
    let contentInside = '';

    if (tab === 0) {
      content = <STDOutTab standard_out={standard_out} />;
    }
    if (tab === 1) {
      content = (
        <InputTab
          rows={parameters.filter(
            filter => filter.parameter_direction_id === 1,
          )}
        />
      );
      contentInside = <TopPanel data={{ ...rest, required_memory_gb }} />;
    }
    if (tab === 2) {
      content = (
        <OutputTab
          options={this.options}
          rows={parameters.filter(
            filter => filter.parameter_direction_id === 2,
          )}
        />
      );
    }

    if (tab === 3) {
      content = <HistoryTab options={this.options} rows={logs} />;
    }

    return (
      <div className={cn.pageWrapper}>
        <Paper className={cn.contentAlignHeader}>
          <div className={cn.firstRow}>
            <div className={cn.textMarginBig}>
              <div
                className={classNames({
                  [cn.circleRed]: [99].includes(job_state_id),
                  [cn.circleGreen]: [2, 7, 8].includes(job_state_id),
                  [cn.circleGray]: [3].includes(job_state_id),
                })}
              />
              <div>{`Job: ${job_id}`}</div>
            </div>
            <div
              className={classNames({
                [cn.textRed]: [99].includes(job_state_id),
                [cn.textGreen]: [2, 7, 8].includes(job_state_id),
                [cn.textGray]: [3].includes(job_state_id),
              })}
            >
              {job_state_name}
            </div>
          </div>
          <div className={cn.firstRow}>
            <div className={cn.textMargin}>{`${job_definition_name}: ${moment(
              datetime_utc,
            ).format('MM/DD/YYYY')}`}</div>
            <div className={cn.textMargin}>
              {normalizeSeconds(seconds_running, 'd[d] h[h] m[m] s[s]')}
            </div>
          </div>
          <div className={cn.firstRow}>
            <div className={cn.textMargin}>{batch_name}</div>
            <div className={cn.textMargin}>
              {max_memory_mb || 0}MB / {required_memory_gb * 1000}MB
            </div>
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
  container: state.container,
  job: state.job,
  parameters: state.parameters,
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
