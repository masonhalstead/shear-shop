import React, { PureComponent } from 'react';
import { TableWrapper } from 'components/table/TableWrapper';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { getScheduleBatches as getScheduleBatchesAction } from 'ducks/operators/batches';
import { handleError as handleErrorAction } from 'ducks/operators/settings';
import { setLoading } from 'ducks/actions';
import {
  BatchNameCell,
  BatchIntervalCell,
  CreatedByCell,
  CreatedCell,
} from './ScheduleBatchesCells';
import cn from './Batches.module.scss';

class ScheduleBatches extends PureComponent {
  state = {
    headers: [
      {
        title: 'Batch Name',
        show: true,
        flex_grow: 1,
        min_width: '100px',
        sort: 'default',
        sort_key: 'scheduled_batch_name',
        uuid: uuid.v1(),
      },
      {
        title: 'Interval',
        show: true,
        min_width: '125px',
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
    ],
    settings: {
      search_key: 'batch_name',
      row_height: 33,
    },
    callbacks: {
      // stopBatch: row => this.stopBatch(row),
    },
  };

  componentDidMount() {
    this.setInitialData();
  }

  setInitialData = async () => {
    const { getScheduleBatches, setLoadingAction, handleError, location } = this.props;
    const [, , project_id] = location.pathname.split('/');

    setLoadingAction(true);
    try {
      await getScheduleBatches(project_id);
    } catch (err) {
      handleError(err);
    }
    setLoadingAction(false);
  };

  render() {
    const { headers, settings } = this.state;
    const { scheduleBatches, location } = this.props;
    return (
      <div className={cn.pageWrapper}>
        <TableWrapper
          rows={scheduleBatches}
          headers={headers}
          cell_components={[
            BatchNameCell,
            BatchIntervalCell,
            CreatedByCell,
            CreatedCell,
          ]}
          settings={settings}
          callbacks={this.state.callbacks}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  scheduleBatches: state.scheduleBatches,
  project: state.project,
  projects: state.projects,
});

const mapDispatchToProps = {
  getScheduleBatches: getScheduleBatchesAction,
  handleError: handleErrorAction,
  setLoadingAction: setLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleBatches);
