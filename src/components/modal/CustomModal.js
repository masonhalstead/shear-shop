import React from 'react';
import { Button, Dialog } from '@material-ui/core';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'components/dialogs/Dialogs';
import classNames from 'classnames';
import cn from './Modal.module.scss';

export const CustomizedDialogs = ({
  open,
  handleClose,
  runJob,
  children,
  title,
}) => (
  <Dialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title"
    open={open}
    fullWidth
    maxWidth="md"
  >
    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
      <div className={cn.title}>{title}</div>
      <div className={cn.subTitle}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>
    </DialogTitle>
    <DialogContent dividers>{children}</DialogContent>
    <DialogActions>
      <Button
        onClick={runJob}
        color="primary"
        size="large"
        className={classNames(cn.btn, cn.btnPrimary)}
      >
        Run Job
      </Button>
    </DialogActions>
  </Dialog>
);
