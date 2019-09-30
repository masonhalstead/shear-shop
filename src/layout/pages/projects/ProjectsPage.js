import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setProject as setProjectAction,
  toggleModal as toggleModalAction,
} from 'ducks/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CreateProjectModal } from 'layout/components/modals/project-modal/CreateProject';

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

  handleCloseProject = () => {
    const { toggleModal } = this.props;
    toggleModal({ project: false });
  };

  changeProjectName = name => {
    this.setState({ projectName: name });
  };

  createProject = async () => {
    const { projectName } = this.state;
    const { addProject, getProjects, toggleModal, setProject } = this.props;
    const projectId = await addProject({ project_name: projectName });
    await getProjects();
    toggleModal({ project: false });
    this.setState({ project_name: '' });
    setProject({ project_id: projectId, project_name: projectName });
    this.goToJobsPage({ project_id: projectId, project_name: projectName });
  };

  goToJobsPage = project => {
    const { setProject, history } = this.props;
    console.log(project);
    setProject(project);
    history.push(`/projects/${project.project_id}/jobs/24`);
  };

  render() {
    const { projectName } = this.state;
    const { projects, settings } = this.props;
    return (
      <>
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
          open={settings.modals.project}
          projectName={projectName}
          changeProjectName={this.changeProjectName}
          createProject={this.createProject}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  settings: state.settings,
});

const mapDispatchToProps = {
  getProjects: getProjectsAction,
  addProject: addProjectAction,
  setProject: setProjectAction,
  toggleModal: toggleModalAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectsPage);
