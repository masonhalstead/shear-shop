import { Button, Dialog } from '@material-ui/core';
import cn from './BatchModal.module.scss';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'components/dialogs/Dialogs';
import { CustomInput } from 'components/material-input/CustomInput';
import classNames from 'classnames';
import React from 'react';

export const BatchModal = ({
  handleCloseBatch,
  open,
  batchName,
  changeBatchName,
  createBatch,
}) => (
  <Dialog
    onClose={handleCloseBatch}
    aria-labelledby="customized-dialog-title"
    open={open}
    classes={{ paper: cn.paper }}
  >
    <DialogTitle id="customized-dialog-title" onClose={handleCloseBatch}>
      <div className={cn.title}>Edit Batch</div>
    </DialogTitle>
    <DialogContent>
      <div className={cn.container}>
        <div className={cn.label}>Batch Name</div>
        <CustomInput
          value={batchName}
          name="batchName"
          onChange={e => changeBatchName(e.target.value)}
        />
      </div>
    </DialogContent>
    <DialogActions className={cn.actions}>
      <Button
        onClick={createBatch}
        color="primary"
        size="large"
        className={classNames(cn.btn, cn.btnPrimary)}
      >
        Edit Batch
      </Button>
    </DialogActions>
  </Dialog>
);
