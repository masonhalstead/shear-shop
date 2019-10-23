import React, { PureComponent } from 'react';
import { BatchDefinitionTabs } from './BatchDefinitionTabs';
import { TableWrapper } from '../../../components/table/TableWrapper';
import {
  BatchNameCell,
  BatchDescriptionCell,
  CreatedByCell,
  CreatedCell,
  PlayCell,
  CalendarCell,
} from './BatchDefinitionCells';
import uuid from 'uuid';
import { getBatchDefinitions as getBatchDefinitionsAction } from 'ducks/operators/batches';
import { handleError as handleErrorAction } from 'ducks/operators/settings';
import { setLoading } from 'ducks/actions';
import { connect } from 'react-redux';
import cn from './Batches.module.scss';

class BatchDefinition extends PureComponent {
  state = {
    tab: 0,
    headers: [
      {
        title: 'Batch Definition Name',
        show: true,
        flex_grow: 1,
        min_width: '100px',
        sort: 'default',
        sort_key: 'batch_definition_name',
        uuid: uuid.v1(),
      },
      {
        title: 'Description',
        show: true,
        min_width: '175px',
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
      search_key: 'batch_definition_name',
      row_height: 33,
    },
    callbacks: {
      playBatch: row => this.playBatch(row),
      scheduleBatch: row => this.scheduleBatch(row),
    },
  };

  componentDidMount() {
    this.setInitialData();
  }

  playBatch = row => {
    // this.setState({
    //   run: true,
    //   id: row.job_definition_id,
    //   title: row.job_definition_name,
    // });
  };

  scheduleBatch = row => {
    // this.setState({
    //   run: true,
    //   id: row.job_definition_id,
    //   title: row.job_definition_name,
    // });
  };

  setInitialData = async () => {
    const {
      getBatchDefinitions,
      setLoadingAction,
      handleError,
      location,
    } = this.props;
    const [, , project_id, , , filter] = location.pathname.split('/');

    this.setState({
      tab: filter === 'archived' ? 1 : 0,
    });

    setLoadingAction(true);
    try {
      await getBatchDefinitions(project_id);
    } catch (err) {
      handleError(err);
    }
    setLoadingAction(false);
  };

  handleChangeTab = (e, value) => {
    const { history, location } = this.props;
    const [, , project_id, , , filter] = location.pathname.split('/');

    this.setState({ tab: value }, () =>
      history.push(
        `/projects/${project_id}/batches/definitions/${
          value === 1 ? 'archived' : 'unarchived'
        }`,
      ),
    );
  };

  render() {
    const { headers, settings, tab } = this.state;
    const { batchDefinitions, location } = this.props;

    return (
      <div className={cn.pageWrapper}>
        <BatchDefinitionTabs handleChangeTab={this.handleChangeTab} tab={tab}>
          <div style={{ marginTop: 25 }}>
            <TableWrapper
              rows={batchDefinitions}
              headers={headers}
              cell_components={[
                BatchNameCell,
                BatchDescriptionCell,
                CreatedByCell,
                CreatedCell,
                PlayCell,
                CalendarCell,
              ]}
              settings={settings}
              callbacks={this.state.callbacks}
            />
          </div>
        </BatchDefinitionTabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  batchDefinitions: state.batchDefinitions,
  project: state.project,
  projects: state.projects,
});

const mapDispatchToProps = {
  getBatchDefinitions: getBatchDefinitionsAction,
  handleError: handleErrorAction,
  setLoadingAction: setLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BatchDefinition);
