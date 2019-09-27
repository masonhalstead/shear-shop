import { TableContainer } from 'components/table-view/TableContainer';
import cn from './Job.module.scss';
import { TableContent } from 'components/table-view/TableContent';
import { data as dataHistory, configureHistoryColumns } from './historyColumns';
import React from 'react';

export const HistoryTab = ({ options }) => (
  <TableContainer style={cn.tableContainerWrapper}>
    <TableContent
      tableData={dataHistory}
      tableOptions={options}
      columns={configureHistoryColumns()}
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
              width: 489,
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
