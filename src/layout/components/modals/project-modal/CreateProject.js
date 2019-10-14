import React from 'react';

import { Button, Dialog } from '@material-ui/core';
import cn from './CreateProject.module.scss';
import { DialogActions, DialogContent, DialogTitle } from 'components/dialogs/Dialogs';
import classNames from 'classnames';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';

export const CreateProjectModal = React.memo(({handleCloseProject, open, projectName, changeProjectName, createProject }) => (
  <Dialog
    onClose={handleCloseProject}
    aria-labelledby="customized-dialog-title"
    open={open}
    classes={{ paper: cn.paper }}
  >
    <DialogTitle
      id="customized-dialog-title"
      onClose={handleCloseProject}
    >
      <div className={cn.title}>Create Project</div>
    </DialogTitle>
    <DialogContent>
      <div className={cn.container}>
        <InputWrapper
          label="Project Name"
          value={projectName}
          component={Input}
          handleOnChange={input =>
            changeProjectName(input.value)
          }
        />
      </div>
    </DialogContent>
    <DialogActions className={cn.actions}>
      <Button
        onClick={createProject}
        color="primary"
        size="large"
        className={classNames(cn.btn, cn.btnPrimary)}
      >
        Create Project
      </Button>
    </DialogActions>
  </Dialog>
));
