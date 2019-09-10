import React from 'react';
import { Button, Dialog } from '@material-ui/core';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'components/common/dialogs/Dialogs';
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
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled blishing software like Aldus PageMaker including versions of
        Lorem Ipsum.
      </div>
    </DialogTitle>
    <DialogContent dividers>{children}</DialogContent>
    <DialogActions>
      <Button onClick={runJob} color="primary" size="large">
        Run Job
      </Button>
    </DialogActions>
  </Dialog>
);
