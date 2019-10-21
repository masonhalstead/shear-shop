import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setLoading as setLoadingAction,
  toggleModal as toggleModalAction,
  clearProject as clearProjectAction,
  setProject as setProjectAction,
} from 'ducks/actions';
import { getProjects as getProjectsAction } from 'ducks/operators/projects';
import { handleError as handleErrorAction } from 'ducks/operators/settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from './Project.module.scss';

class ProjectsPage extends PureComponent {
  static propTypes = {
    projects: PropTypes.array,
    history: PropTypes.object,
    getProjects: PropTypes.func,
    setProject: PropTypes.func,
    clearProject: PropTypes.func,
    toggleModal: PropTypes.func,
    setLoading: PropTypes.func,
    handleError: PropTypes.func,
  };

  componentDidMount() {
    this.setInitialData();
  }

  setInitialData = async () => {
    const { getProjects, setLoading, handleError, clearProject } = this.props;
    clearProject();
    setLoading(true);
    try {
      getProjects();
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  goToJobsPage = project => {
    const { setProject, history } = this.props;
    setProject(project);
    history.push(`/projects/${project.project_id}/jobs/24`);
  };

  render() {
    const { projects, toggleModal } = this.props;
    return (
      <div className={cn.pageWrapper}>
        <div
          className={cn.projectItemAdd}
          onClick={() => {
            toggleModal({ project: true });
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
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
});

const mapDispatchToProps = {
  getProjects: getProjectsAction,
  clearProject: clearProjectAction,
  handleError: handleErrorAction,
  setLoading: setLoadingAction,
  toggleModal: toggleModalAction,
  setProject: setProjectAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectsPage);
