import { Button, Dialog } from '@material-ui/core';
import cn from './BatchModal.module.scss';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'components/dialogs/Dialogs';
import classNames from 'classnames';
import React from 'react';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';

export const BatchModal = React.memo(({
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
        <InputWrapper
          label="Batch Name"
          value={batchName}
          component={Input}
          handleOnChange={input =>
            changeBatchName(input.value)
          }
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
));
