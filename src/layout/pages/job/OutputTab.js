import { TableContainer } from 'components/table-view/TableContainer';
import cn from './Job.module.scss';
import { TableContent } from 'components/table-view/TableContent';
import React from 'react';
import { configureColumnsOutput, data } from './outputColumns';

export const OutputTab = ({ options }) => (
  <TableContainer style={cn.tableContainerWrapper}>
    <TableContent
      tableData={data}
      tableOptions={options}
      columns={configureColumnsOutput()}
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
);
