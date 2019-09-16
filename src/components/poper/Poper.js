import { ClickAwayListener, Popper } from '@material-ui/core';
import React from 'react';

export const Poper = ({ open, anchorEl, children, clickAway }) => (
  <ClickAwayListener
    onClickAway={clickAway}
  >
    <Popper open={open} anchorEl={anchorEl} transition>
      {children}
    </Popper>
  </ClickAwayListener>
);
