import React from 'react';
import PropTypes from 'prop-types';
import { TableWrapper } from 'components/table/TableWrapper';
import { TableDefinition } from 'components/table/TableDefinition';
import uuid from 'uuid';
import {
  ParameterNameCell,
  DefaultCell,
  DescriptionCell,
} from './DefinitionCells';

const params = {
  headers: [
    {
      title: 'Parameter Name',
      show: true,
      min_width: '250px',
      uuid: uuid.v1(),
    },
    {
      title: 'Default',
      show: true,
      min_width: '250px',
      uuid: uuid.v1(),
    },
    {
      title: 'Description',
      show: true,
      min_width: '250px',
      flex_grow: 1,
      uuid: uuid.v1(),
    },
  ],
  settings: {
    row_height: '40px',
  },
};

export const ParametersTable = ({ rows, callbacks }) => (
  <TableWrapper
    rows={rows}
    headers={params.headers}
    table_component={TableDefinition}
    cell_components={[ParameterNameCell, DefaultCell, DescriptionCell]}
    settings={params.settings}
    callbacks={callbacks}
  />
);

ParametersTable.propTypes = {
  callbacks: PropTypes.object,
  rows: PropTypes.array,
};
