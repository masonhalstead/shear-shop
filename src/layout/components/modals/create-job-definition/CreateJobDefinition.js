import React from 'react';

import { Button, Dialog } from '@material-ui/core';
import cn from './CreateJobDefinition.module.scss';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'components/dialogs/Dialogs';
import classNames from 'classnames';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';

export const CreateJobDefinition = ({
  handleCloseDefinition,
  open,
  jobName,
  changeJobName,
  createDefinition,
}) => (
  <Dialog
    onClose={handleCloseDefinition}
    aria-labelledby="customized-dialog-title"
    open={open}
    classes={{ paper: cn.paper }}
  >
    <DialogTitle id="customized-dialog-title" onClose={handleCloseDefinition}>
      <div className={cn.title}>Create Job Definition</div>
    </DialogTitle>
    <DialogContent>
      <div className={cn.container}>
        <InputWrapper
          label="Job Definition Name"
          value={jobName}
          component={Input}
          handleOnChange={input =>
            changeJobName(input.value)
          }
        />
      </div>
    </DialogContent>
    <DialogActions className={cn.actions}>
      <Button
        onClick={createDefinition}
        color="primary"
        size="large"
        className={classNames(cn.btn, cn.btnPrimary)}
      >
        Create Definition
      </Button>
    </DialogActions>
  </Dialog>
);
