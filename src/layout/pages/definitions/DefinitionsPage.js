import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDefinitionsConfig as getDefinitionsConfigAction } from 'ducks/operators/definitions';
import {
  getDefinitionConfig as getDefinitionConfigAction,
} from 'ducks/operators/definition';
import { handleError as handleErrorAction } from 'ducks/operators/settings';
import {
  setLoading,
  toggleModal as toggleModalAction,
} from 'ducks/actions';
import { TableWrapper } from 'components/table/TableWrapper';
import uuid from 'uuid';
import cn from './Definitions.module.scss';
import {
  JobCell,
  RequirementsCell,
  LocationCell,
  TimeoutCell,
  ResultMethodCell,
  CreatedByCell,
  CreatedCell,
  RunCell,
} from './DefinitionCells';
import { DefinitionsTabs } from './DefinitionsTabs';
import { Modals } from '../../components/modals/Modals';

class DefinitionsPage extends PureComponent {
  static propTypes = {
    getDefinitionsConfig: PropTypes.func,
    getDefinitionConfig: PropTypes.func,
    handleError: PropTypes.func,
    setLoadingAction: PropTypes.func,
    toggleModal: PropTypes.func,
    definitions: PropTypes.array,
    history: PropTypes.object,
    location: PropTypes.object,
    settings: PropTypes.object,
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
        title: 'Requirements',
        show: true,
        min_width: '175px',
        uuid: uuid.v1(),
      },
      {
        title: 'Location',
        show: true,
        min_width: '175px',
        sort: 'default',
        sort_key: 'location_name',
        uuid: uuid.v1(),
      },
      {
        title: 'Timeout',
        show: true,
        min_width: '125px',
        sort: 'default',
        sort_key: 'timeout_seconds',
        uuid: uuid.v1(),
      },
      {
        title: 'Method',
        show: true,
        min_width: '125px',
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
    ],
    settings: {
      search_key: 'job_definition_name',
      row_height: 33,
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
      getDefinitionsConfig,
      setLoadingAction,
      handleError,
      location,
    } = this.props;
    const [, , project_id, , filter] = location.pathname.split('/');
    this.setState({
      tab: filter === 'archived' ? 1 : 0,
    });

    setLoadingAction(true);
    try {
      await getDefinitionsConfig(project_id, filter);
    } catch (err) {
      handleError(err);
    }
    setLoadingAction(false);
  };

  openModal = async row => {
    const {
      getDefinitionConfig,
      toggleModal,
      setLoadingAction,
      handleError,
    } = this.props;
    setLoadingAction(true);
    try {
      await getDefinitionConfig(row.project_id, row.job_definition_id);
      await toggleModal({ run_definition: true });
    } catch (err) {
      handleError(err);
    }
    setLoadingAction(false);
  };

  handleChangeTab = (e, value) => {
    const { history, location } = this.props;
    const [, , project_id] = location.pathname.split('/');

    this.setState({ tab: value }, () =>
      history.push(
        `/projects/${project_id}/definitions/${
          value === 1 ? 'archived' : 'unarchived'
        }`,
      ),
    );
  };

  render() {
    const { definitions, history, location } = this.props;
    const { definitions_search_input } = this.props.settings;
    const { tab, headers, settings } = this.state;

    return (
      <div className={cn.pageWrapper}>
        <DefinitionsTabs handleChangeTab={this.handleChangeTab} tab={tab}>
          <div style={{ marginTop: 25 }}>
            <TableWrapper
              rows={definitions}
              headers={headers}
              cell_components={[
                JobCell,
                RequirementsCell,
                LocationCell,
                TimeoutCell,
                ResultMethodCell,
                CreatedByCell,
                CreatedCell,
                RunCell,
              ]}
              search_input={definitions_search_input}
              settings={settings}
              callbacks={this.state.callbacks}
            />
          </div>
        </DefinitionsTabs>
        <Modals definition history={history} location={location}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hamburger: state.hamburger,
  definitions: state.definitions,
  settings: state.settings,
  project: state.project,
  projects: state.projects,
});

const mapDispatchToProps = {
  getDefinitionsConfig: getDefinitionsConfigAction,
  getDefinitionConfig: getDefinitionConfigAction,
  handleError: handleErrorAction,
  setLoadingAction: setLoading,
  toggleModal: toggleModalAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionsPage);
