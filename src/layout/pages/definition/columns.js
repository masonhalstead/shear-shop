import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import { DropdownMethod } from 'components/dropdowns/DropdownMethod';
import { DropdownReference } from 'components/dropdowns/DropdownReference';
import { InputMethod } from 'components/inputs/InputMethod';

export const configureColumns = callbacks => [
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
    name: 'is_required',
    label: 'Required',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => {
        let icon = 'times';
        let color = '#d9534f';
        if (value) {
          icon = 'check';
          color = '#5db85b';
        }
        return (
          <InputMethod
            icon={icon}
            color={color}
            handleOpen={() => callbacks.changeRequired(tableMeta.rowData[0])}
          />
        );
      },
    },
  },
  {
    name: 'parameter_method_id',
    label: 'Method',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => {
        let icon = 'code';
        if (value === 1) {
          icon = 'terminal';
        }
        return (
          <DropdownMethod
            icon={icon}
            handleOnSelect={item =>
              callbacks.handleMethod(item, tableMeta.rowData[0])
            }
          />
        );
      },
    },
  },
  {
    name: 'reference',
    label: 'Reference',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <DropdownReference
          value={value}
          right_icon="chevron-down"
          handleOnSelect={item =>
            callbacks.handleReference(item, tableMeta.rowData[0])
          }
        />
      ),
    },
  },
  {
    name: 'parameter_value',
    label: 'Default',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <InputWrapper
          value={value}
          component={Input}
          bulk
          handleOnChange={input =>
            callbacks.saveDefault(input.value, tableMeta.rowData[0])
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
