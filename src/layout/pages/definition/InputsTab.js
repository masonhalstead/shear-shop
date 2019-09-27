import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'components/table/Table';
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

export class InputsTab extends PureComponent {
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
    ],
  };

  render() {
    const { rows, callbacks } = this.props;
    const { headers } = this.state;
    return (
      <div className={cn.tabValueAlt}>
        <Table
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
    );
  }
}
