import React from 'react';
import { CustomInputNoBorders } from 'components/material-input/CustomInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from './Definition.module.scss';

export const configureColumnsOutput = (
  saveOutputName,
  saveOutputDescription,
  deleteOutputRow,
) => [
  {
    name: 'value',
    label: 'Name',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => {
        return (
          <div style={{ cursor: 'pointer' }}>
            <CustomInputNoBorders
              placeholder={`Parameter ${tableMeta.rowIndex + 1}`}
              value={value}
              name="paramsName"
              onChange={e => saveOutputName(e.target.value, tableMeta.rowIndex)}
              inputStyles={{ input: cn.customHeight }}
            />
          </div>
        );
      },
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
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) =>
        tableMeta.rowIndex !== 0 && (
          <div
            style={{ textAlign: 'center', cursor: 'pointer' }}
            onClick={() => deleteOutputRow(tableMeta.rowIndex)}
          >
            <FontAwesomeIcon icon="trash" color="#818fa3" />
          </div>
        ),
    },
  },
];
