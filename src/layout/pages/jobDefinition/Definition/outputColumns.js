import React from 'react';
import { CustomInput } from 'components/common/material-input/CustomInput';
import cn from './Definition.module.scss';

export const configureColumnsOutput = (
  saveOutputName,
  saveOutputDescription,
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
            onChange={e => saveOutputName(e.target.value, tableMeta.rowIndex)}
            inputStyles={{ input: cn.customHeight }}
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
            onChange={e =>
              saveOutputDescription(e.target.value, tableMeta.rowIndex)
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
      display: false,
    },
  },
];
