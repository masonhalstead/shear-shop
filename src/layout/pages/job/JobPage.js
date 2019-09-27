import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getJobConfig as getJobConfigAction } from 'ducks/operators/job';
import * as Sentry from '@sentry/browser';
import { Toolbar, Breadcrumbs, Paper } from '@material-ui/core';
import { CustomAppBar } from 'components/app-bar/AppBar';
import { logoutUser, setLoading } from 'ducks/actions';
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
    getProjects: PropTypes.func,
    hamburger: PropTypes.object,
    projects: PropTypes.array,
    lookups: PropTypes.object,
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
    tab: 0,
  };

  componentDidMount() {
    this.setInitialData();
  }

  componentWillUnmount() {
    this.setState({ changes: false });
  }

  setInitialData = async () => {
    const { getJobConfig, setLoadingAction, location } = this.props;
    const [, , , , job_id] = location.pathname.split('/');

    try {
      await setLoadingAction(true);
      await getJobConfig(job_id);
    } catch (err) {
      // Only fires if the server is off line or the body isnt set correctly
      Sentry.captureException(err);
    }
    setLoadingAction(false);
  };

  handleChangeTab = (event, newValue) => {
    this.setState({ tab: newValue });
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
      history,
      projects,
      settings: { project },
      location,
    } = this.props;
    const { tab } = this.state;
    const id = 1;
    let content = '';
    let contentInside = '';
    if (tab === 0) {
      content = <STDOutTab />;
    }
    if (tab === 1) {
      content = <InputTab options={this.options}/>;
      contentInside = <TopPanel />;
    }
    if (tab === 2) {
      content = <OutputTab options={this.options} />;
    }

    if (tab === 3) {
      content = <HistoryTab options={this.options}/>;
    }

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
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  history.push(`/projects`);
                }}
              >
                {projectName}
              </div>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  history.push(`/projects/${id}/jobs/24`);
                }}
              >
                Jobs
              </div>
              <div>Will come from api</div>
            </Breadcrumbs>
            <div className={cn.flex} />
            <div className={cn.logout} onClick={this.logout}>
              <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
            </div>
          </Toolbar>
        </CustomAppBar>
        <Paper className={cn.contentAlignHeader}>
          <div className={cn.firstRow}>
            <div className={cn.textMarginBig}>
              <div className={cn.circle} />
              <div>Job: 543433</div>
            </div>
            <div className={cn.textColor}>Running</div>
          </div>
          <div className={cn.firstRow}>
            <div className={cn.textMargin}>Parse Logs: 2019-02-01</div>
            <div className={cn.textMargin}>16h 32m 12s</div>
          </div>
          <div className={cn.firstRow}>
            <div className={cn.textMargin}>LogPredict</div>
            <div className={cn.textMargin}>460MB / 900MB</div>
          </div>
        </Paper>
        <Paper className={cn.contentAlignSecond}>
          <JobTabs tab={tab} tabStyle={tabStyle} handleChangeTab={this.handleChangeTab}/>
          {tab === 0 && <div className={cn.tabValueFirst}>{content}</div>}
          {tab === 1 && (
            <div className={cn.tabValueSecond}>{contentInside}</div>
          )}
          {tab !== 0 && <div className={cn.tabValueAlt}>{content}</div>}
        </Paper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  hamburger: state.hamburger,
  lookups: state.lookups,
  projects: state.projects,
  settings: state.settings,
});

const mapDispatchToProps = {
  getJobConfig: getJobConfigAction,
  logoutUserProps: logoutUser,
  setLoadingAction: setLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobPage);
