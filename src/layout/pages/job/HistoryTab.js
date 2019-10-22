import React, { Component } from 'react';
import { TableWrapper } from 'components/table/TableWrapper';
import uuid from 'uuid';
import { HistoryStateCell, HistoryTimestampCell } from './JobCells';

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
    const {data} = this.props;
    return (
      <TableWrapper
        rows={data}
        headers={this.state.headers}
        cell_components={[HistoryStateCell, HistoryTimestampCell]}
      />
    );
  }
}
