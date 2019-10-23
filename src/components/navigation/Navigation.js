import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter, Link } from 'react-router-dom';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getProjects as getProjectsAction } from 'ducks/operators/projects';
import {
  logoutUser as logoutUserProps,
  triggerSaveDefiniton as triggerSaveDefinitonAction,
  setCurrentDefinitions as setCurrentDefinitionsAction,
  setCurrentJobs as setCurrentJobsAction,
  toggleModal as toggleModalAction,
} from 'ducks/actions';
import { connect } from 'react-redux';
import { DropdownNav } from 'components/dropdowns/DropdownNav';
import { routes } from 'layout/routes';
import cn from './Navigation.module.scss';

class NavigationWrapper extends PureComponent {
  static propTypes = {
    logoutUser: PropTypes.func,
    setCurrentJobs: PropTypes.func,
    setCurrentDefinitions: PropTypes.func,
    toggleModal: PropTypes.func,
    triggerSaveDefiniton: PropTypes.func,
    job: PropTypes.object,
    definition: PropTypes.object,
    settings: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
  };

  state = {
    search_input: '',
  };

  logout = () => {
    const { logoutUser, history } = this.props;
    logoutUser();
    localStorage.clear();
    history.push('/login');
  };

  handleJobsRoute = (item, route) => {
    const { history } = this.props;
    history.push(`/projects/${route[2]}/jobs/${item.name}`);
  };

  handleDefinitionsRoute = (item, route) => {
    const { history } = this.props;
    history.push(`/projects/${route[2]}/definitions/${item.name}`);
  };

  handleProjectRoute = (item, route) => {
    const { history } = this.props;
    history.push(`/projects/${item.project_id}/${route[3]}/${route[4]}`);
  };

  handleOnSearchJobs = input => {
    const { setCurrentJobs } = this.props;
    this.setState({ search_input: input.value });
    setCurrentJobs(input.value);
  };

  handleOnSearchDefinitions = input => {
    const { setCurrentDefinitions } = this.props;
    this.setState({ search_input: input.value });
    setCurrentDefinitions(input.value);
  };

  render() {
    const {
      toggleModal,
      triggerSaveDefiniton,
      settings,
      job,
      definition,
      location,
    } = this.props;
    const { search_input } = this.state;
    const route = location.pathname.split('/');
    return (
      <div className={cn.navigationContainer}>
        <Route
          path={routes.PROJECTS}
          exact
          render={() => <ProjectRoute toggleModal={toggleModal} />}
        />
        <Route
          path={routes.PROJECT}
          render={() => (
            <ProjectsRoute
              handleProjectRoute={this.handleProjectRoute}
              route={route}
            />
          )}
        />
        <Route
          path={routes.DEFINITIONS}
          exact
          render={() => (
            <DefinitionsRoute
              search_input={search_input}
              toggleModal={toggleModal}
              handleOnSearch={this.handleOnSearchDefinitions}
              handleDefinitionsRoute={this.handleDefinitionsRoute}
              settings={settings}
              route={route}
            />
          )}
        />
        <Route
          path={routes.JOBS}
          exact
          render={() => (
            <JobsRoute
              search_input={search_input}
              handleOnSearch={this.handleOnSearchJobs}
              handleJobsRoute={this.handleJobsRoute}
              route={route}
            />
          )}
        />
        <Route
          path={routes.JOB}
          exact
          render={() => <JobRoute route={route} job={job} />}
        />
        <Route
          path={routes.DEFINITION}
          exact
          render={() => (
            <DefinitionRoute
              route={route}
              settings={settings}
              triggerSaveDefiniton={triggerSaveDefiniton}
              definition={definition}
            />
          )}
        />
        <Route
          path={routes.BATCHES}
          exact
          render={() => (
            <>
              <Link to="/" className={cn.header}>
                Batches
              </Link>
              <div className={cn.flex} />
            </>
          )}
        />
        <Route
          path={routes.BATCH_DEFINITIONS}
          exact
          render={() => (
            <>
              <Link to="/" className={cn.header}>
                Batch Definitions
              </Link>
              <div className={cn.flex} />
            </>
          )}
        />
        <Route
          path={routes.SCHEDULE_BATCHES}
          exact
          render={() => (
            <>
              <Link to="/" className={cn.header}>
                Schedule Batches
              </Link>
              <div className={cn.flex} />
            </>
          )}
        />

        <div className={cn.logout} onClick={this.logout}>
          <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
  loading: state.settings.loading,
  definition: state.definition,
  definitions: state.definitions,
  job: state.job,
  jobs: state.jobs,
  project: state.project,
  projects: state.projects,
});

const mapDispatchToProps = {
  getProjects: getProjectsAction,
  toggleModal: toggleModalAction,
  setCurrentJobs: setCurrentJobsAction,
  triggerSaveDefiniton: triggerSaveDefinitonAction,
  setCurrentDefinitions: setCurrentDefinitionsAction,
  logoutUser: logoutUserProps,
};

export const Navigation = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NavigationWrapper),
);

const ProjectRoute = ({ toggleModal }) => (
  <>
    <div className={cn.header}>Projects</div>
    <div className={cn.flex} />
    <div
      className={cn.iconContainer}
      onClick={() => toggleModal({ project: true })}
    >
      <FontAwesomeIcon icon="plus" color="#818fa3" />
    </div>
  </>
);

const ProjectsRoute = ({ route, handleProjectRoute }) => (
  <>
    <DropdownNav
      list_key="projects"
      list_name="project_name"
      list_id="project_id"
      route_id={parseInt(route[2], 10)}
      handleOnSelect={item => handleProjectRoute(item, route)}
    />
    <FontAwesomeIcon className={cn.separator} icon="chevron-right" />
  </>
);

const JobsRoute = ({
  handleJobsRoute,
  handleOnSearch,
  search_input,
  route,
}) => (
  <>
    <DropdownNav
      list_key="filter_jobs"
      list_name="verbose_name"
      list_id="name"
      route_id={route[4]}
      handleOnSelect={item => handleJobsRoute(item, route)}
    />
    <div className={cn.flex} />
    <InputWrapper
      value={search_input}
      component={Input}
      placeholder="Filter Jobs"
      left_icon="search"
      width="400px"
      margin="0px 10px 0px 0px"
      handleOnChange={handleOnSearch}
    />
  </>
);

const JobRoute = ({ route, job }) => {
  let label = 'Last 24 Hours';

  if (route[4] === '7') {
    label = 'Last 7 Days';
  }
  if (route[4] !== '24' && route[4] !== '7') {
    label = route[4].charAt(0).toUpperCase() + route[4].slice(1);
  }
  return (
    <>
      <Link to={`/projects/${route[2]}/jobs/${route[4]}`} className={cn.header}>
        Jobs
      </Link>
      <FontAwesomeIcon className={cn.separator} icon="chevron-right" />
      <div className={cn.header}>{label}</div>
      <FontAwesomeIcon className={cn.separator} icon="chevron-right" />
      <div className={cn.header}>{job.job_id}</div>
      <div className={cn.flex} />
    </>
  );
};

const DefinitionRoute = ({
  definition,
  route,
  settings,
  triggerSaveDefiniton,
}) => (
  <>
    <Link
      to={`/projects/${route[2]}/definitions/${route[4]}`}
      className={cn.header}
    >
      Definitions
    </Link>
    <FontAwesomeIcon className={cn.separator} icon="chevron-right" />
    <div className={cn.header}>{definition.job_definition_name || 8239484}</div>
    <div className={cn.flex} />
    <div
      className={cn.iconContainer}
      onClick={() => triggerSaveDefiniton(true)}
    >
      <FontAwesomeIcon
        icon={['far', 'save']}
        color={settings.definitionChanged ? 'orange' : '#818fa3'}
      />
    </div>
  </>
);

const DefinitionsRoute = ({
  handleDefinitionsRoute,
  handleOnSearch,
  toggleModal,
  search_input,
  route,
}) => (
  <>
    <DropdownNav
      list_key="filter_definitions"
      list_name="verbose_name"
      list_id="name"
      route_id={route[4]}
      handleOnSelect={item => handleDefinitionsRoute(item, route)}
    />
    <div className={cn.flex} />
    <InputWrapper
      value={search_input}
      component={Input}
      placeholder="Filter Definitions"
      left_icon="search"
      width="400px"
      margin="0px 0px 0px 0px"
      handleOnChange={handleOnSearch}
    />
    <div
      className={cn.iconContainer}
      onClick={() => toggleModal({ definitions: true })}
    >
      <FontAwesomeIcon icon="plus" color="#818fa3" />
    </div>
  </>
);
