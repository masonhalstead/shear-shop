import React from 'react';
import { TableWrapper } from 'components/table/TableWrapper';
import uuid from 'uuid';
import {
  ParameterNameCell,
  ParameterValueCell,
  ParameterDescriptionCell,
} from './JobCells';
import PropTypes from 'prop-types';

const headers = [
  {
    title: 'Name',
    show: true,
    min_width: '225px',
    sort: 'default',
    sort_key: 'parameter_name',
    uuid: uuid.v1(),
  },
  {
    title: 'Value',
    show: true,
    min_width: '225px',
    uuid: uuid.v1(),
  },
  {
    title: 'Description',
    show: true,
    flex_grow: 1,
    min_width: '125px',
    sort: false,
    uuid: uuid.v1(),
  },
];

export const OutputTab = React.memo(({ rows }) => (
  <TableWrapper
    rows={rows}
    headers={headers}
    cell_components={[
      ParameterNameCell,
      ParameterValueCell,
      ParameterDescriptionCell,
    ]}
  />
));

OutputTab.propTypes = {
  callbacks: PropTypes.object,
  rows: PropTypes.array,
};
