import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog } from '@material-ui/core';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'components/dialogs/Dialogs';
import classNames from 'classnames';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import { addProject as addProjectAction } from 'ducks/operators/projects';
import {
  setProject as setProjectAction,
  toggleModal as toggleModalAction,
} from 'ducks/actions';
import { handleError as handleErrorAction } from 'ducks/operators/settings';
import { connect } from 'react-redux';
import cn from './CreateProject.module.scss';

class ConnectedCreateProject extends PureComponent {
  static propTypes = {
    toggleModal: PropTypes.func,
    addProject: PropTypes.func,
    setProject: PropTypes.func,
    handleError: PropTypes.func,
    history: PropTypes.object,
    modals: PropTypes.object,
  };

  state = {
    project_name: '',
  };

  handleCloseProject = () => {
    const { toggleModal } = this.props;
    toggleModal({ project: false });
  };

  changeProjectName = name => {
    this.setState({ project_name: name });
  };

  createProject = async () => {
    const { project_name } = this.state;
    const { addProject, toggleModal, setProject, handleError } = this.props;
    const project_id = await addProject({ project_name });
    await toggleModal({ project: false });
    this.setState({ project_name: '' });
    try {
      setProject({ project_id, project_name });
      this.goToJobsPage({ project_id, project_name });
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
    const { project_name } = this.state;
    const { modals } = this.props;
    return (
      <Dialog
        onClose={this.handleCloseProject}
        aria-labelledby="customized-dialog-title"
        open={modals.project}
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
              value={project_name}
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
  modals: state.settings.modals,
});

const mapDispatchToProps = {
  addProject: addProjectAction,
  setProject: setProjectAction,
  handleError: handleErrorAction,
  toggleModal: toggleModalAction,
};

export const CreateProject = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedCreateProject);
