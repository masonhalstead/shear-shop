import React from 'react';
import { CustomInputNoBorders } from 'components/material-input/CustomInput';
import cn from './RunDefinition.module.scss';

export const configureColumnsOutput = callbacks => [
  {
    name: 'uuid',
    options: {
      display: false,
    },
  },
  {
    name: 'is_required',
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
        <div style={{ paddingLeft: 2.5 }}>
          {tableMeta.rowData[1] === true ? `${value} *` : value}
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
            value={value || ''}
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
    },
  },
];
