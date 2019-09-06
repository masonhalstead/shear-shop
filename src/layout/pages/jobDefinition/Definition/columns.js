import React from 'react';
import { CustomInput } from 'components/common/material-input/CustomInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  NativeSelect,
  MenuItem,
  Select,
  ListItemIcon,
} from '@material-ui/core';
import BootstrapInput from 'components/common/bootsrapInput/BootstrapInput';
import cn from './Definition.module.scss';

export const configureColumns = (
  saveName,
  changeRequired,
  saveDefault,
  saveDescription,
  handleClickOpen,
) => [
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <div style={{ cursor: 'pointer' }}>
          <CustomInput
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
          style={{ textAlign: 'center' }}
          onClick={() => changeRequired(tableMeta.rowIndex)}
        >
          {value ? (
            <FontAwesomeIcon
              style={{ width: '25px', height: '25px' }}
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
            style={{ width: '200px' }}
            value={1}
            // onClick={() => handleClickOpen(tableMeta.rowIndex)}
            input={<BootstrapInput name="method" id="method" />}
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
            style={{ width: '200px' }}
            value={value}
            onClick={() => handleClickOpen(tableMeta.rowIndex)}
            input={<BootstrapInput name="reference" id="reference" readOnly />}
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
          <CustomInput
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
          <CustomInput
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
      display: false,
    },
  },
];
