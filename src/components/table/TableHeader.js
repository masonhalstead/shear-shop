import React from 'react';
import PropTypes from 'prop-types';
import cn from './Table.module.scss';

export const TableHeader = ({
  headers,
  settings,
  headers_component: HeaderCell,
  handleSort,
}) => {
  const { header, header_height } = settings;

  if (!header) {
    return null;
  }

  const headers_style = {
    minHeight: `${header_height}px`,
    maxHeight: `${header_height}px`,
  };

  return (
    <div className={cn.tableHeader} style={headers_style}>
      {headers.map((item, index) => (
        <HeaderCell
          key={item.uuid}
          header={item}
          headers={headers}
          header_index={index}
          handleSort={handleSort}
        />
      ))}
    </div>
  );
};

TableHeader.propTypes = {
  settings: PropTypes.object,
  headers: PropTypes.array,
  headers_component: PropTypes.any,
  handleSort: PropTypes.func,
};
