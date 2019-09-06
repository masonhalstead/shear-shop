import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import PropTypes from 'prop-types';
import cn from './CustomToolbar.module.scss';

const CustomToolbar = React.memo(({ handleClick }) => (
  <Tooltip title="Add Job">
    <IconButton className={cn.iconButton} onClick={handleClick}>
      <Add />
    </IconButton>
  </Tooltip>
));

CustomToolbar.propTypes = {
  handleClick: PropTypes.func,
};

export default CustomToolbar;
