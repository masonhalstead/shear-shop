import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TableWrapper } from 'components/table/TableWrapper';
import uuid from 'uuid';
import {
  ParameterNameCellDisabled,
  DescriptionCell,
  DescriptionNameCellDisabled,
} from './DefinitionCells';
import cn from './RunDefinition.module.scss';

export class DefinitionParameters extends PureComponent {
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
        title: 'Default',
        show: true,
        min_width: '250px',
        flex_grow: 1,
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: 'Description',
        show: true,
        sort: false,
        min_width: '250px',
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
          cell_components={[
            ParameterNameCellDisabled,
            DescriptionCell,
            DescriptionNameCellDisabled,
          ]}
          callbacks={callbacks}
        />
      </div>
    );
  }
}
