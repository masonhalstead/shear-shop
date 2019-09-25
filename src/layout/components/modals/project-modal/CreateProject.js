import React from 'react';

import { Button, Dialog } from '@material-ui/core';
import cn from './CreateProject.module.scss';
import { DialogActions, DialogContent, DialogTitle } from 'components/dialogs/Dialogs';
import { CustomInput } from 'components/material-input/CustomInput';
import classNames from 'classnames';

export const CreateProjectModal = ({handleCloseProject, open, projectName, changeProjectName, createProject }) => (
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
        <div className={cn.label}>Project Name</div>
        <CustomInput
          value={projectName}
          name="projectName"
          onChange={e => changeProjectName(e.target.value)}
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

)
