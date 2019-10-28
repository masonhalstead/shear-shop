import React from 'react';
import PropTypes from 'prop-types';
import { TableWrapper } from 'components/table/TableWrapper';
import uuid from 'uuid';
import {
  ParameterNameCell,
  DescriptionCell,
  RemoveCell,
} from './DefinitionCells';
import cn from './Definition.module.scss';

const headers = [
  {
    title: 'Parameter Name',
    show: true,
    min_width: '250px',
    uuid: uuid.v1(),
  },
  {
    title: 'Description',
    show: true,
    flex_grow: 1,
    min_width: '100px',
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
];

export const OutputsTab = React.memo(({ rows, callbacks }) => (
  <div className={cn.tabValueAlt}>
    <TableWrapper
      rows={rows}
      headers={headers}
      cell_components={[ParameterNameCell, DescriptionCell, RemoveCell]}
      callbacks={callbacks}
    />
  </div>
));

OutputsTab.propTypes = {
  callbacks: PropTypes.object,
  rows: PropTypes.array,
};
