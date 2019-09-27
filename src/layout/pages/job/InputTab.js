import { TableContainer } from 'components/table-view/TableContainer';
import cn from './Job.module.scss';
import { TableContent } from 'components/table-view/TableContent';
import { configureColumnsInput, data } from './columnsInput';
import React from 'react';

export const InputTab = ({options}) => (
  <TableContainer style={cn.tableContainerWrapper}>
    <TableContent
      tableData={data}
      tableOptions={options}
      columns={configureColumnsInput()}
      styles={{
        MuiTableCell: {
          root: {
            border: '1px solid #dde3ee',
            borderBottom: '1px solid #dde3ee',
          },
          body: {
            fontSize: '13px',
            fontWeight: 300,
            lineHeight: '1',
            padding: '5px !important',
            '&:nth-child(2)': {
              width: 189,
            },
            '&:nth-child(4)': {
              width: 189,
            },
          },
          head: {
            fontSize: '1rem',
          },
        },
      }}
    />
  </TableContainer>

)
