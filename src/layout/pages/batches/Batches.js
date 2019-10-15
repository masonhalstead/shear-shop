import React, { PureComponent } from 'react';
import { TableWrapper } from 'components/table/TableWrapper';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { getBatches as getBatchesAction } from 'ducks/operators/batches';
import { handleError as handleErrorAction } from 'ducks/operators/settings';
import { setLoading } from 'ducks/actions';
import {
  CreatedByCell,
  CreatedCell,
  BatchNameCell,
  NumberOfJobsCell,
  StopCell,
  QueuedCell,
  StartingCell,
  StoppedCell,
  RunningCell,
  CompletedCell,
  FailedCell,
} from './BatchesCells';
import cn from './Batches.module.scss';

class Batches extends PureComponent {
  state = {
    headers: [
      {
        title: 'Batch Name',
        show: true,
        flex_grow: 1,
        min_width: '100px',
        sort: 'default',
        sort_key: 'batch_name',
        uuid: uuid.v1(),
      },
      {
        title: 'Number of Jobs',
        show: true,
        min_width: '125px',
        uuid: uuid.v1(),
      },
      {
        title: 'Queued jobs',
        show: true,
        min_width: '125px',
        sort: 'default',
        sort_key: 'queued_jobs',
        uuid: uuid.v1(),
      },
      {
        title: 'Starting jobs',
        show: true,
        min_width: '125px',
        sort: 'default',
        sort_key: 'starting_jobs',
        uuid: uuid.v1(),
      },
      {
        title: 'Stopped jobs',
        show: true,
        min_width: '125px',
        sort_key: 'stopped_jobs',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: 'Running jobs',
        show: true,
        min_width: '125px',
        sort_key: 'running_jobs',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: 'Complete jobs',
        show: true,
        min_width: '125px',
        sort_key: 'complete_jobs',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: 'Failed jobs',
        show: true,
        min_width: '125px',
        sort_key: 'failed_jobs',
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
        title: 'Created Date',
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
      search_key: 'batch_name',
      row_height: 33,
    },
    callbacks: {
      stopBatch: row => this.stopBatch(row),
    },
  };

  componentDidMount() {
    this.setInitialData();
  }

  stopBatch = row => {
    // this.setState({
    //   run: true,
    //   id: row.job_definition_id,
    //   title: row.job_definition_name,
    // });
  };

  setInitialData = async () => {
    const { getBatches, setLoadingAction, handleError, location } = this.props;
    const [, , project_id] = location.pathname.split('/');

    setLoadingAction(true);
    try {
      await getBatches(project_id);
    } catch (err) {
      handleError(err);
    }
    setLoadingAction(false);
  };

  render() {
    const { headers, settings } = this.state;
    const { batches, location } = this.props;
    return (
      <div className={cn.pageWrapper}>
        <TableWrapper
          rows={batches}
          headers={headers}
          cell_components={[
            BatchNameCell,
            NumberOfJobsCell,
            QueuedCell,
            StartingCell,
            StoppedCell,
            RunningCell,
            CompletedCell,
            FailedCell,
            CreatedByCell,
            CreatedCell,
            StopCell,
          ]}
          settings={settings}
          callbacks={this.state.callbacks}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  batches: state.batches,
  project: state.project,
  projects: state.projects,
});

const mapDispatchToProps = {
  getBatches: getBatchesAction,
  handleError: handleErrorAction,
  setLoadingAction: setLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Batches);
