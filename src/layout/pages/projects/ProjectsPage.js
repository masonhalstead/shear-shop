import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setProject as setProjectAction } from 'ducks/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, Toolbar } from '@material-ui/core';
import { logoutUser } from 'ducks/actions';
import { CustomAppBar } from 'components/app-bar/AppBar';
import { getProjects as getProjectsAction } from 'ducks/operators/projects';
import { addProject as addProjectAction } from 'ducks/operators/projects';

import * as Sentry from '@sentry/browser';
import cn from './Project.module.scss';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'components/dialogs/Dialogs';
import { CustomInput } from 'components/material-input/CustomInput';
import classNames from 'classnames';

class ProjectsPage extends PureComponent {
  static propTypes = {
    getProjects: PropTypes.func,
    logoutUserProps: PropTypes.func,
    hamburger: PropTypes.object,
    projects: PropTypes.array,
    history: PropTypes.object,
  };

  componentDidMount() {
    const { getProjects } = this.props;
    try {
      getProjects();
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  state = {
    open: false,
    projectName: '',
  };

  logout = () => {
    const { logoutUserProps, history } = this.props;
    logoutUserProps();
    localStorage.clear();
    history.push('/login');
  };

  handleCloseProject = () => {
    this.setState({ open: false });
  };

  changeProjectName = name => {
    this.setState({ projectName: name });
  };

  createProject = async () => {
    const { projectName } = this.state;
    const { addProject, getProjects } = this.props;
    await addProject({ project_name: projectName });
    await getProjects();
    this.setState({ open: false });
  };

  goToJobsPage = project => {
    const { setProject, history } = this.props;
    setProject(project);
    history.push(`/projects/${project.project_id}/jobs/24`);
  };

  render() {
    const { open, projectName } = this.state;
    const { hamburger, projects } = this.props;
    return (
      <>
        <CustomAppBar hamburger={hamburger.open}>
          <Toolbar className={cn.toolbar}>
            <div className={cn.header}>Projects</div>
            <div className={cn.flexGrow} />
            <div
              className={cn.iconContainer}
              onClick={() => this.setState({ open: true })}
            >
              <FontAwesomeIcon icon="plus" color="#818fa3" />
            </div>
            <div className={cn.logout} onClick={this.logout}>
              <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
            </div>
          </Toolbar>
        </CustomAppBar>
        <div className={cn.contentAlign}>
          <div
            className={cn.projectItem}
            onClick={() => {
              this.setState({ open: true });
            }}
          >
            <div style={{ margin: '0 auto', height: '100%' }}>
              <div style={{ marginLeft: 20, marginTop: '55%' }}>
                <FontAwesomeIcon
                  style={{ width: 35 }}
                  icon="plus"
                  color="#818fa3"
                />
              </div>
              <div className={cn.projectHeader}>Add project</div>
            </div>
          </div>
          {projects.length > 0 &&
            projects.map(project => (
              <div
                className={cn.projectItem}
                onClick={() => {
                  this.goToJobsPage(project);
                }}
              >
                <div>
                  <div className={cn.projectHeader}>{project.project_name}</div>
                </div>
                <div className={cn.projectFooter}>
                  <FontAwesomeIcon icon="server" color="#818fa3" />
                  <p className={cn.secondText}>{project.organization_name}</p>
                </div>
              </div>
            ))}
        </div>
        <Dialog
          onClose={this.handleCloseProject}
          aria-labelledby="customized-dialog-title"
          open={open}
          classes={{ paper: cn.paper }}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.handleCloseProject}
          >
            <div className={cn.title}>Create Project</div>
          </DialogTitle>
          <DialogContent dividers>
            <div className={cn.container}>
              <div className={cn.label}>Project Name</div>
              <CustomInput
                value={projectName}
                name="projectName"
                onChange={e => this.changeProjectName(e.target.value)}
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
      </>
    );
  }
}

const mapStateToProps = state => ({
  hamburger: state.hamburger,
  projects: state.projects,
});

const mapDispatchToProps = {
  getProjects: getProjectsAction,
  logoutUserProps: logoutUser,
  addProject: addProjectAction,
  setProject: setProjectAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectsPage);
