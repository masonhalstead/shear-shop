import React from 'react';
import PropTypes from 'prop-types';
import cn from './TableView.module.scss';

export const TableContainer = React.memo(({ children }) => (
  <div className={cn.tableContainerWrapper}>{children}</div>
));

TableContainer.propTypes = {
  children: PropTypes.node,
};
