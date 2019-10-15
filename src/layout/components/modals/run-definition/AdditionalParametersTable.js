import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TableWrapper } from 'components/table/TableWrapper';
import uuid from 'uuid';
import { TableDefinition } from 'components/table/TableDefinition';
import { KeyCell, ValueCell, RemoveCell, FlexCell } from './DefinitionCells';

export class AdditionalParametersTable extends PureComponent {
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

  render() {
    const { rows, callbacks } = this.props;
    const { headers, settings } = this.state;
    return (
      <div>
        <TableWrapper
          rows={rows}
          headers={headers}
          table_component={TableDefinition}
          cell_components={[KeyCell, ValueCell, RemoveCell, FlexCell]}
          settings={settings}
          callbacks={callbacks}
        />
      </div>
    );
  }
}
