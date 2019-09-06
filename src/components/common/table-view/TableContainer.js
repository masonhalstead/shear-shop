import React from 'react';
import PropTypes from 'prop-types';
import cn from './TableView.module.scss';

export const TableContainer = React.memo(({ children, style }) => (
  <div className={style || cn.tableContainerWrapper}>{children}</div>
));

TableContainer.propTypes = {
  children: PropTypes.node,
  style: PropTypes.any,
};
