import React from 'react';
import PropTypes from 'prop-types';
import cn from './TableView.module.scss';

export const TableHeader = React.memo(({ children }) => (
  <div className={cn.customToolBar}>{children}</div>
));

TableHeader.propTypes = {
  children: PropTypes.node,
};
