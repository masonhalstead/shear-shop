import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getJobsConfig as getJobsConfigAction } from 'ducks/operators/jobs';
import { handleError } from 'ducks/operators/settings';
import {
  setLoading,
  toggleModal as toggleModalAction,
  setJob as setJobAction,
} from 'ducks/actions';
import { TableWrapper } from 'components/table/TableWrapper';
import uuid from 'uuid';
import { Modals } from 'layout/components/modals/Modals';
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

class JobsPage extends PureComponent {
  static propTypes = {
    getJobsConfig: PropTypes.func,
    setLoadingAction: PropTypes.func,
    handleErrorAction: PropTypes.func,
    toggleModal: PropTypes.func,
    setJob: PropTypes.func,
    settings: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
    jobs: PropTypes.array,
  };

  state = {
    tab: 0,
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
        title: 'Created At',
        show: true,
        min_width: '135px',
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
    const {
      getJobsConfig,
      setLoadingAction,
      handleErrorAction,
      location,
    } = this.props;
    const [, , project_id, , filter] = location.pathname.split('/');
    let tab = 0;
    switch (filter) {
      case '7':
        tab = 1;
        break;
      case 'queued':
        tab = 2;
        break;
      case 'starting':
        tab = 3;
        break;
      case 'running':
        tab = 4;
        break;
      case 'complete':
        tab = 5;
        break;
      case 'stopped':
        tab = 6;
        break;
      case 'failed':
        tab = 7;
        break;
      default:
        tab = 0;
    }

    this.setState({ tab });

    setLoadingAction(true);
    try {
      await getJobsConfig(project_id, filter);
    } catch (err) {
      handleErrorAction(err);
    }
    setLoadingAction(false);
  };

  handleChangeTab = (e, value) => {
    const { history, location } = this.props;
    const [, , project_id] = location.pathname.split('/');
    let route = 24;
    switch (value) {
      case 1:
        route = 7;
        break;
      case 2:
        route = 'queued';
        break;
      case 3:
        route = 'starting';
        break;
      case 4:
        route = 'running';
        break;
      case 5:
        route = 'complete';
        break;
      case 6:
        route = 'stopped';
        break;
      case 7:
        route = 'failed';
        break;
      default:
        route = 24;
    }
    history.push(`/projects/${project_id}/jobs/${route}`);
  };

  openModal = async row => {
    const { toggleModal, setJob } = this.props;
    await setJob(row);
    await toggleModal({ batch: true });
  };

  render() {
    const { tab, headers, settings, callbacks } = this.state;
    const { jobs, location, history } = this.props;
    const { jobs_search_input, modals } = this.props.settings;

    return (
      <>
        <div className={cn.pageWrapper}>
          <JobTabs handleChangeTab={this.handleChangeTab} tab={tab}>
            <div style={{ marginTop: 25 }}>
              <TableWrapper
                rows={jobs}
                headers={headers}
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
                search_input={jobs_search_input}
                settings={settings}
                callbacks={callbacks}
              />
            </div>
          </JobTabs>
        </div>
        <Modals
          batch
          history={history}
          location={location}
          opened={modals.batch}
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
  getJobsConfig: getJobsConfigAction,
  handleErrorAction: handleError,
  setJob: setJobAction,
  setLoadingAction: setLoading,
  toggleModal: toggleModalAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobsPage);
