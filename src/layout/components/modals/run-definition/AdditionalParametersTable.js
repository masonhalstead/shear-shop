import React from 'react';
import PropTypes from 'prop-types';
import { TableWrapper } from 'components/table/TableWrapper';
import uuid from 'uuid';
import { TableDefinition } from 'components/table/TableDefinition';
import { KeyCell, ValueCell, RemoveCell, FlexCell } from './DefinitionCells';

const params = {
  headers: [
    {
      title: 'Parameter Name',
      show: true,
      min_width: '250px',
      uuid: uuid.v1(),
    },
    {
      title: 'Description',
      show: true,
      min_width: '250px',
      uuid: uuid.v1(),
    },
    {
      title: '',
      show: true,
      min_width: '40px',
      uuid: uuid.v1(),
    },
    {
      title: '',
      show: true,
      min_width: '100px',
      flex_grow: 1,
      uuid: uuid.v1(),
    },
  ],
  settings: {
    row_height: '40px',
  },
};

export const AdditionalParametersTable = React.memo(({ rows, callbacks }) => (
  <TableWrapper
    rows={rows}
    headers={params.headers}
    table_component={TableDefinition}
    cell_components={[KeyCell, ValueCell, RemoveCell, FlexCell]}
    settings={params.settings}
    callbacks={callbacks}
  />
));

AdditionalParametersTable.propTypes = {
  callbacks: PropTypes.object,
  rows: PropTypes.array,
};
