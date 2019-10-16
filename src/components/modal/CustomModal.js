import React from 'react';
import { Dialog } from '@material-ui/core';
import { DialogTitle } from 'components/dialogs/Dialogs';
import classNames from 'classnames';
import cn from './Modal.module.scss';

export const CustomizedDialogs = React.memo(
  ({ open, handleClose, handleSubmit, children, title, description }) => (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      classes={{ paper: cn.paper }}
      maxWidth="md"
    >
      <DialogTitle classes={{ root: cn.root }} onClose={handleClose}>
        <div className={cn.title}>{title}</div>
        {description && <div className={cn.subTitle}>{description}</div>}
      </DialogTitle>
      {children}
      <div className={cn.btnWrapper}>
      <button
        type="submit"
        onClick={handleSubmit}
        className={classNames(cn.btn, cn.btnPrimary)}
      >
        Run Job Definition
      </button>
      </div>
    </Dialog>
  ),
);
