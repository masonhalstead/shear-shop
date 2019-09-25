import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setProject as setProjectAction, logoutUser } from 'ducks/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toolbar } from '@material-ui/core';
import { CreateProjectModal } from 'layout/components/modals/project-modal/CreateProject';

import { CustomAppBar } from 'components/app-bar/AppBar';
import {
  getProjects as getProjectsAction,
  addProject as addProjectAction,
} from 'ducks/operators/projects';

import * as Sentry from '@sentry/browser';
import cn from './Project.module.scss';

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
    const projectId = await addProject({ project_name: projectName });
    await getProjects();
    this.setState({ open: false, project_name: '' });
    this.goToJobsPage({ project_id: projectId, project_name: projectName });
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
            className={cn.projectItemAdd}
            onClick={() => {
              this.setState({ open: true });
            }}
          >
            <FontAwesomeIcon icon="plus" color="#818fa3" />
            <p>Add project</p>
          </div>
          {projects.length > 0 &&
            projects.map(project => (
              <div
                key={project.project_name}
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
        <CreateProjectModal
          handleCloseProject={this.handleCloseProject}
          open={open}
          projectName={projectName}
          changeProjectName={this.changeProjectName}
          createProject={this.createProject}
        />
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
