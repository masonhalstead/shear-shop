import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TableWrapper } from 'components/table/TableWrapper';
import uuid from 'uuid';
import {
  ParameterNameCell,
  DescriptionCell,
  RemoveCell,
} from './DefinitionCells';
import cn from './Definition.module.scss';

export class OutputsTab extends PureComponent {
  static propTypes = {
    callbacks: PropTypes.object,
    rows: PropTypes.array,
  };

  state = {
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
    ],
  };

  render() {
    const { rows, callbacks } = this.props;
    const { headers } = this.state;
    return (
      <div className={cn.tabValueAlt}>
        <TableWrapper
          rows={rows}
          headers={headers}
          cell_components={[ParameterNameCell, DescriptionCell, RemoveCell]}
          callbacks={callbacks}
        />
      </div>
    );
  }
}
