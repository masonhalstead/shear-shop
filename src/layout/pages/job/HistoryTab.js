import React from 'react';
import { TableWrapper } from 'components/table/TableWrapper';
import uuid from 'uuid';
import { HistoryStateCell, HistoryTimestampCell } from './JobCells';
import PropTypes from 'prop-types';

const headers = [
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
];

export const HistoryTab = React.memo(({ rows }) => (
  <TableWrapper
    rows={rows}
    headers={headers}
    cell_components={[HistoryStateCell, HistoryTimestampCell]}
  />
));

HistoryTab.propTypes = {
  rows: PropTypes.array,
};
