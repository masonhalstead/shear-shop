import React, { Component } from 'react';
import { Table } from 'components/table/Table';
import uuid from 'uuid';
import {
  ParameterNameCell,
  ParameterValueCell,
  ParameterDescriptionCell,
} from './JobCells';

const data = [
  {
    parameter_name: 'Parameter Name',
    default_value: 'default value',
    description: '',
  },
  {
    parameter_name: 'Parameter Name',
    default_value: 'default value',
    description: '',
  },
  {
    parameter_name: 'Parameter Name',
    default_value: 'default value',
    description: '',
  },
  {
    parameter_name: 'Parameter Name',
    default_value: 'default value',
    description: '',
  },
];
export class InputTab extends Component {
  state = {
    headers: [
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
    ],
  };

  render() {
    return (
      <Table
        rows={data}
        headers={this.state.headers}
        cell_components={[
          ParameterNameCell,
          ParameterValueCell,
          ParameterDescriptionCell,
        ]}
      />
    );
  }
}
