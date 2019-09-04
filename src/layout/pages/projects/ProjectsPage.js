import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toolbar, Typography } from '@material-ui/core';
import { CustomAppBar } from 'components/common/appBar/AppBar';
import { getProjects as getProjectsAction } from 'ducks/operators/projects';
import * as Sentry from '@sentry/browser';
import cn from './Project.module.scss';

class ProjectsPage extends PureComponent {
  static propTypes = {
    getProjects: PropTypes.func,
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

  render() {
    const { hamburger, projects, history } = this.props;
    const id = 1;
    return (
      <>
        <CustomAppBar hamburger={hamburger.open}>
          <Toolbar className={cn.toolbar}>
            <Typography variant="h6" noWrap classes={{ root: cn.rootColor }}>
              Projects
            </Typography>
            <div className={cn.logout}>
              <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
            </div>
          </Toolbar>
        </CustomAppBar>
        <div className={cn.contentAlign}>
          <div
            className={cn.projectItem}
            onClick={() => {
              history.push(`/projects/${id}/jobs/24`);
            }}
          >
            <div>
              <div className={cn.header}>Lynx (Prod)</div>
              <div className={cn.secondText}>lync prod-9322</div>
            </div>
            <FontAwesomeIcon icon="bars" color="#818fa3" />
          </div>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectsPage);
