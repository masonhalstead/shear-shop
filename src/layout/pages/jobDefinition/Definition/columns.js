import React from 'react';
import { CustomInputNoBorders } from 'components/common/material-input/CustomInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  NativeSelect,
  MenuItem,
  Select,
  ListItemIcon,
} from '@material-ui/core';
import cn from './Definition.module.scss';

export const configureColumns = (
  saveName,
  changeRequired,
  saveDefault,
  saveDescription,
  handleClickOpen,
  deleteInputRow,
) => [
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <div style={{ cursor: 'pointer' }}>
          <CustomInputNoBorders
            placeholder={`Parameter ${tableMeta.rowIndex + 1}`}
            value={value}
            name="name"
            onChange={e => saveName(e.target.value, tableMeta.rowIndex)}
            inputStyles={{ input: cn.customHeight }}
          />
        </div>
      ),
    },
  },
  {
    name: 'required',
    label: 'Required',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <div
          style={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => changeRequired(tableMeta.rowIndex)}
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
              style={{ width: '25px', height: '25px' }}
            />
          )}
        </div>
      ),
    },
  },
  {
    name: 'method',
    label: 'Method',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <div style={{ textAlign: 'center' }}>
          <Select
            style={{ width: '100%' }}
            value={1}
            // onClick={() => handleClickOpen(tableMeta.rowIndex)}
            input={<CustomInputNoBorders name="method" id="method" />}
          >
            <MenuItem value={1}>
              <ListItemIcon>
                <FontAwesomeIcon
                  icon="terminal"
                  color="#818fa3"
                  style={{ width: '25px', height: '15px' }}
                />
              </ListItemIcon>
            </MenuItem>
            <MenuItem value={2}>
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
            onClick={() => handleClickOpen(tableMeta.rowIndex)}
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
    name: 'default',
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
            onChange={e => saveDefault(e.target.value, tableMeta.rowIndex)}
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
            onChange={e => saveDescription(e.target.value, tableMeta.rowIndex)}
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
            onClick={() => deleteInputRow(tableMeta.rowIndex)}
          >
            <FontAwesomeIcon icon="trash" color="#818fa3" />
          </div>
        ),
    },
  },
];
