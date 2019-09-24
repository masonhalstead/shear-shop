import React from 'react';
import { CustomInputNoBorders } from 'components/material-input/CustomInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  NativeSelect,
  Select,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import cn from './Definition.module.scss';

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
        <div style={{ cursor: 'pointer' }}>
          <CustomInputNoBorders
            placeholder="Parameter"
            value={value}
            name="name"
            onChange={e =>
              callbacks.saveName(e.target.value, tableMeta.rowData[0])
            }
            inputStyles={{ input: cn.customHeight }}
          />
        </div>
      ),
    },
  },
  {
    name: 'is_required',
    label: 'Required',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <div
          style={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => callbacks.changeRequired(tableMeta.rowData[0])}
        >
          {value ? (
            <FontAwesomeIcon
              style={{ width: '20px', height: '20px' }}
              icon="check"
              color="#5db85b"
            />
          ) : (
            <FontAwesomeIcon
              icon="times"
              color="#d9534f"
              style={{ width: '20px', height: '20px' }}
            />
          )}
        </div>
      ),
    },
  },
  {
    name: 'parameter_method_id',
    label: 'Method',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <div style={{ textAlign: 'center' }}>
          <Select
            style={{ width: '100%' }}
            value={value}
            onClick={e => callbacks.handleOpenMethod(e, tableMeta.rowData[0])}
            input={<CustomInputNoBorders name="method" id="method" readOnly />}
          >
            <MenuItem style={{ display: 'none' }} value={1}>
              <ListItemIcon>
                <FontAwesomeIcon
                  icon="terminal"
                  color="#818fa3"
                  style={{ width: '25px', height: '15px' }}
                />
              </ListItemIcon>
            </MenuItem>
            <MenuItem style={{ display: 'none' }} value={2}>
              <ListItemIcon>
                <FontAwesomeIcon
                  icon="code"
                  color="#818fa3"
                  style={{ width: '25px', height: '15px' }}
                />
              </ListItemIcon>
            </MenuItem>
          </Select>
        </div>
      ),
    },
  },
  {
    name: 'reference',
    label: 'Reference',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <div style={{ textAlign: 'center' }}>
          <NativeSelect
            style={{ width: '100%' }}
            value={value}
            onClick={e => callbacks.handleOpenRef(e, tableMeta.rowData[0])}
            input={
              <CustomInputNoBorders name="reference" id="reference" readOnly />
            }
          >
            <option style={{ display: 'none' }} selected value="">
              {value}
            </option>
          </NativeSelect>
        </div>
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
        <div style={{ textAlign: 'center' }}>
          <CustomInputNoBorders
            inputStyles={{ input: cn.customHeight }}
            value={value}
            name="default"
            onChange={e =>
              callbacks.saveDefault(e.target.value, tableMeta.rowData[0])
            }
          />
        </div>
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
        <div style={{ textAlign: 'center' }}>
          <CustomInputNoBorders
            inputStyles={{ input: cn.customHeight }}
            value={value}
            name="description"
            onChange={e =>
              callbacks.saveDescription(e.target.value, tableMeta.rowData[0])
            }
          />
        </div>
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
