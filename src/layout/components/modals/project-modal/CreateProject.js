import React, { PureComponent } from 'react';
import { Button, Dialog } from '@material-ui/core';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'components/dialogs/Dialogs';
import classNames from 'classnames';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import cn from './CreateProject.module.scss';
import {
  addProject as addProjectAction,
} from 'ducks/operators/projects';
import {
  setProject as setProjectAction,
  toggleModal as toggleModalAction,
} from 'ducks/actions';
import { handleError as handleErrorAction } from 'ducks/operators/settings';
import { connect } from 'react-redux';

class CreateProjectModal extends PureComponent {
  state = {
    projectName: '',
    open: false,
  };

  handleCloseProject = () => {
    const { toggleModal } = this.props;
    toggleModal({ project: false });
  };

  changeProjectName = name => {
    this.setState({ projectName: name });
  };

  createProject = async () => {
    const { projectName } = this.state;
    const {
      addProject,
      toggleModal,
      setProject,
      handleError,
    } = this.props;
    const projectId = await addProject({ project_name: projectName });
    await toggleModal({ project: false });
    this.setState({ project_name: '' });
    try {
      setProject({ project_id: projectId, project_name: projectName });
      this.goToJobsPage({ project_id: projectId, project_name: projectName });
    } catch (err) {
      handleError(err);
    }
  };

  goToJobsPage = project => {
    const { setProject, history } = this.props;
    setProject(project);
    history.push(`/projects/${project.project_id}/jobs/24`);
  };

  render() {
    const { projectName } = this.state;
    const { settings } = this.props;
    return (
      <Dialog
        onClose={this.handleCloseProject}
        aria-labelledby="customized-dialog-title"
        open={settings.modals.project}
        classes={{ paper: cn.paper }}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={this.handleCloseProject}
        >
          <div className={cn.title}>Create Project</div>
        </DialogTitle>
        <DialogContent>
          <div className={cn.container}>
            <InputWrapper
              label="Project Name"
              value={projectName}
              component={Input}
              handleOnChange={input => this.changeProjectName(input.value)}
            />
          </div>
        </DialogContent>
        <DialogActions className={cn.actions}>
          <Button
            onClick={this.createProject}
            color="primary"
            size="large"
            className={classNames(cn.btn, cn.btnPrimary)}
          >
            Create Project
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = {
  addProject: addProjectAction,
  setProject: setProjectAction,
  handleError: handleErrorAction,
  toggleModal: toggleModalAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProjectModal);
