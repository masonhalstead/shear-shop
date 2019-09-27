import React, { Component } from 'react';
import { Table } from 'components/table/Table';
import uuid from 'uuid';
import { HistoryStateCell, HistoryTimestampCell } from './JobCells';

const data = [
  {
    state: '344523 Assigned to server',
    timestamp: '8/13/2019 23:03:32',
    id: 1,
    type: 'run',
  },
  {
    state: '344523 Assigned to server',
    timestamp: '8/13/2019 23:03:32',
    type: 'run',

    id: 1,
  },
  {
    state: '344523 Assigned to server',
    timestamp: '8/13/2019 23:03:32',
    type: 'run',

    id: 1,
  },
  {
    state: '344523 Assigned to server',
    timestamp: '8/13/2019 23:03:32',
    type: 'run',

    id: 1,
  },
  {
    state: '344523 Assigned to server',
    timestamp: '8/13/2019 23:03:32',
    type: 'run',

    id: 1,
  },
  {
    state: '344523 Assigned to server',
    timestamp: '8/13/2019 23:03:32',
    type: 'run',

    id: 1,
  },
  {
    state: '344523 Assigned to server',
    timestamp: '8/13/2019 23:03:32',
    type: 'run',

    id: 1,
  },
];
export class HistoryTab extends Component {
  state = {
    headers: [
      {
        title: 'State',
        show: true,
        min_width: '225px',
        flex_grow: 1,
        sort: 'default',
        sort_key: 'parameter_name',
        uuid: uuid.v1(),
      },
      {
        title: 'Timestamp',
        show: true,
        min_width: '225px',
        flex_grow: 1,
        sort: false,
        uuid: uuid.v1(),
      },
    ],
  };

  render() {
    return (
      <Table
        rows={data}
        headers={this.state.headers}
        cell_components={[HistoryStateCell, HistoryTimestampCell]}
      />
    );
  }
}
