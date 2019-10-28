import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TableWrapper } from 'components/table/TableWrapper';
import uuid from 'uuid';
import {
  ParameterNameCell,
  RequiredCell,
  MethodCell,
  ReferencesCell,
  DefaultCell,
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
    title: 'Required',
    show: true,
    min_width: '100px',
    uuid: uuid.v1(),
  },
  {
    title: 'Method',
    show: true,
    min_width: '100px',
    uuid: uuid.v1(),
  },
  {
    title: 'Reference',
    show: true,
    min_width: '175px',
    uuid: uuid.v1(),
  },
  {
    title: 'Default',
    show: true,
    min_width: '200px',
    sort: false,
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

export const InputsTab = React.memo(({ rows, callbacks }) => (
  <div className={cn.tabValueAlt}>
    <TableWrapper
      rows={rows}
      headers={headers}
      cell_components={[
        ParameterNameCell,
        RequiredCell,
        MethodCell,
        ReferencesCell,
        DefaultCell,
        DescriptionCell,
        RemoveCell,
      ]}
      callbacks={callbacks}
    />
  </div>
));

InputsTab.propTypes = {
  callbacks: PropTypes.object,
  rows: PropTypes.array,
};
