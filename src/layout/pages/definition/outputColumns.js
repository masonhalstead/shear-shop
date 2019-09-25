import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';

export const configureColumnsOutput = callbacks => [
  {
    name: 'uuid',
    options: {
      display: false,
    },
  },
  {
    name: 'parameter_name',
    label: 'Name',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <InputWrapper
          value={value}
          component={Input}
          placeholder="Enter Parameter Name"
          bulk
          handleOnChange={input =>
            callbacks.saveName(input.value, tableMeta.rowData[0])
          }
        />
      ),
    },
  },
  {
    name: 'description',
    label: 'Description',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <InputWrapper
          value={value}
          component={Input}
          bulk
          handleOnChange={input =>
            callbacks.saveDescription(input.value, tableMeta.rowData[0])
          }
        />
      ),
    },
  },
  {
    name: 'id',
    label: ' ',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) =>
        tableMeta.rowIndex !== 0 && (
          <div
            style={{ textAlign: 'center', cursor: 'pointer' }}
            onClick={() => callbacks.deleteRow(tableMeta.rowData[0])}
          >
            <FontAwesomeIcon icon="trash" color="#818fa3" />
          </div>
        ),
    },
  },
];
