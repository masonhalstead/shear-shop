import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toolbar, Typography } from '@material-ui/core';
import { logoutUser } from 'ducks/actions';
import { CustomAppBar } from 'components/common/appBar/AppBar';
import { getProjects as getProjectsAction } from 'ducks/operators/projects';
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

  logout = () => {
    const { logoutUserProps, history } = this.props;
    logoutUserProps();
    localStorage.clear();
    history.push('/login');
  };

  render() {
    const { hamburger, projects, history } = this.props;
    return (
      <>
        <CustomAppBar hamburger={hamburger.open}>
          <Toolbar className={cn.toolbar}>
            <Typography variant="h6" noWrap classes={{ root: cn.rootColor }}>
              Projects
            </Typography>
            <div className={cn.logout} onClick={this.logout}>
              <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
            </div>
          </Toolbar>
        </CustomAppBar>
        <div className={cn.contentAlign}>
          {projects.length > 0 &&
            projects.map(project => (
              <div
                className={cn.projectItem}
                onClick={() => {
                  history.push(`/projects/${project.project_id}/jobs/24`);
                }}
              >
                <div>
                  <div className={cn.header}>{project.project_name}</div>
                  <div className={cn.secondText}>
                    {project.organization_name}
                  </div>
                </div>
                <FontAwesomeIcon icon="bars" color="#818fa3" />
              </div>
            ))}
        </div>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectsPage);
