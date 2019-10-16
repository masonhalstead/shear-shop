import React from 'react';
import PropTypes from 'prop-types';
import { TableEmptyCell } from './TableEmptyCell';
import cn from './Table.module.scss';

export const TableEmptyRow = ({ headers, settings }) => {
  const { header, row_height } = settings;

  if (!header) {
    return null;
  }

  const rows_style = {
    minHeight: `${row_height}px`,
    maxHeight: `${row_height}px`,
  };

  return (
    <div className={cn.tableRow} style={rows_style}>
      {headers.map((item, index) => (
        <TableEmptyCell
          key={item.uuid}
          header={item}
          headers={headers}
          header_index={index}
        />
      ))}
    </div>
  );
};

TableEmptyRow.propTypes = {
  settings: PropTypes.object,
  headers: PropTypes.array,
};
