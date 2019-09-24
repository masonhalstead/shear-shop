import React from 'react';
import { CustomInputNoBorders } from 'components/material-input/CustomInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from './Definition.module.scss';

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
        <div style={{ cursor: 'pointer' }}>
          <CustomInputNoBorders
            placeholder="Parameter"
            value={value}
            name="paramsName"
            onChange={e => callbacks.saveName(e.target.value, tableMeta.rowData[0])}
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
