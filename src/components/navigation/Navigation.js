import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter, Link } from 'react-router-dom';
import { getProjects as getProjectsAction } from 'ducks/operators/projects';
import {
  logoutUser as logoutUserProps,
  saveDefinition as saveDefinitionAction,
  setCurrentDefinitions as setCurrentDefinitionsAction,
  setCurrentJobs as setCurrentJobsAction,
  toggleModal as toggleModalAction,
  setProject as setProjectAction,
} from 'ducks/actions';
import { connect } from 'react-redux';
import { DropdownNav } from 'components/dropdowns/DropdownNav';
import { DropdownMulti } from '../dropdowns/DropdownMulti';
import { CustomizedInputBase } from '../search/SearchInput';
import cn from './Navigation.module.scss';

class NavigationWrapper extends PureComponent {
  logout = () => {
    const { logoutUser, history } = this.props;
    logoutUser();
    localStorage.clear();
    history.push('/login');
  };

  handleJobsRoute = item => {
    const { history, location } = this.props;
    const route = location.pathname.split('/');
    history.push(`/projects/${route[2]}/jobs/${item.name}`);
  };

  handleDefinitionsRoute = item => {
    const { history, location } = this.props;
    const route = location.pathname.split('/');
    history.push(`/projects/${route[2]}/definitions/${item.name}`);
  };

  handleProjectRoute = item => {
    const { history, location, setProject } = this.props;
    const route = location.pathname.split('/');
    setProject(item);
    history.push(`/projects/${item.project_id}/${route[3]}/${route[4]}`);
  };

  onSearch = e => {
    const { setCurrentJobs } = this.props;
    setCurrentJobs({ search_string: e.target.value });
  };

  handleOnColumnCheck = (item, type) => {
    const {
      settings: { jobs, definitions },
      setCurrentJobs,
      setCurrentDefinitions,
    } = this.props;

    let { columns } = jobs;
    let { headers } = jobs;

    if (type === 'definitions') {
      columns = definitions.columns;
      headers = definitions.headers;
    }

    const index = columns.indexOf(item.title);
    let new_columns = [...columns];

    if (index === -1) {
      new_columns = [...new_columns, item.title];
    } else {
      new_columns.splice(index, 1);
    }

    const new_headers = headers.map(header => ({
      ...header,
      show: !new_columns.includes(header.title),
    }));

    // Setting both the columns and headers
    if (type !== 'definitions') {
      setCurrentJobs({ columns: new_columns, headers: new_headers });
    } else {
      setCurrentDefinitions({ columns: new_columns, headers: new_headers });
    }
  };

  handleTableSearch = e => {
    const { setCurrentDefinitions } = this.props;
    setCurrentDefinitions({ search_string: e.target.value });
  };

  generateToolbar = () => {
    const {
      location,
      toggleModal,
      settings,
      job,
      definition,
      saveDefinition,
    } = this.props;
    const route = location.pathname.split('/');
    if (route.length === 2) {
      return (
        <div className={cn.breadcrumbsContainer}>
          <div className={cn.header}>Projects</div>
          <div className={cn.flex} />
          <div
            className={cn.iconContainer}
            onClick={() => toggleModal({ project: true })}
          >
            <FontAwesomeIcon icon="plus" color="#818fa3" />
          </div>
        </div>
      );
    }
    return (
      <>
        <div className={cn.breadcrumbsContainer}>
          <DropdownNav
            list_key="projects"
            list_name="project_name"
            list_id="project_id"
            route_id={parseInt(route[2], 10)}
            handleOnSelect={this.handleProjectRoute}
          />
          <FontAwesomeIcon
            className={cn.separator}
            icon="chevron-right"
            color="#818fa3"
          />
          {route.length === 5 && route[3] === 'jobs' && (
            <>
              <DropdownNav
                list_key="filter_jobs"
                list_name="verbose_name"
                list_id="name"
                route_id={route[4]}
                handleOnSelect={this.handleJobsRoute}
              />
              <div className={cn.flex} />
              <div className={cn.searchContainer}>
                <CustomizedInputBase onSearch={this.onSearch} />
              </div>
              <div className={cn.iconContainer}>
                <DropdownMulti
                  rows={settings.jobs.headers.filter(
                    header => !!header.title && !header.flex_grow,
                  )}
                  checked={settings.jobs.columns}
                  checked_key="title"
                  row_key="title"
                  icon={['fas', 'cog']}
                  inner_title="Hide Columns"
                  handleOnSelect={item =>
                    this.handleOnColumnCheck(item, 'jobs')
                  }
                />
              </div>
            </>
          )}
          {route.length === 5 && route[3] === 'definitions' && (
            <>
              <DropdownNav
                list_key="filter_definitions"
                list_name="verbose_name"
                list_id="name"
                route_id={route[4]}
                handleOnSelect={this.handleDefinitionsRoute}
              />
              <div className={cn.flex} />

              <div className={cn.searchContainer}>
                <CustomizedInputBase onSearch={this.handleTableSearch} />
              </div>
              <div className={cn.iconContainer}>
                <DropdownMulti
                  rows={settings.definitions.headers.filter(
                    header => !!header.title && !header.flex_grow,
                  )}
                  checked={settings.definitions.columns}
                  checked_key="title"
                  row_key="title"
                  icon={['fas', 'cog']}
                  inner_title="Hide Columns"
                  handleOnSelect={item =>
                    this.handleOnColumnCheck(item, 'definitions')
                  }
                />
              </div>
              <div
                className={cn.iconContainer}
                onClick={() => toggleModal({ definitions: true })}
              >
                <FontAwesomeIcon icon="plus" color="#818fa3" />
              </div>
            </>
          )}
          {route.length === 7 && route[5] === 'job' && (
            <>
              {' '}
              <Link
                to={`/projects/${route[2]}/jobs/${route[4]}`}
                className={cn.header}
              >
                Jobs
              </Link>
              <FontAwesomeIcon
                className={cn.separator}
                icon="chevron-right"
                color="#818fa3"
              />
              <div className={cn.header}>{job.job_id || 8239484}</div>
            </>
          )}
          {route.length === 7 && route[5] === 'definition' && (
            <>
              <Link
                to={`/projects/${route[2]}/definitions/${route[4]}`}
                className={cn.header}
              >
                Definitions
              </Link>
              <FontAwesomeIcon
                className={cn.separator}
                icon="chevron-right"
                color="#818fa3"
              />
              <div className={cn.header}>{definition.job_definition_name || 8239484}</div>
              <div className={cn.flex} />
              <div
                className={cn.iconContainer}
                onClick={() => saveDefinition(true)}
              >
                <FontAwesomeIcon
                  icon={['far', 'save']}
                  color={settings.definitionChanged ? 'orange' : '#818fa3'}
                />
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  render() {
    return (
      <div className={cn.navigationContainer}>
        {this.generateToolbar()}
        <div className={cn.logout} onClick={this.logout}>
          <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hamburger: state.hamburger,
  settings: state.settings,
  loading: state.settings.loading,
  definition: state.definition,
  definitions: state.definitions,
  job: state.job,
  jobs: state.jobs,
  project: state.project,
  projects: state.projects,
  filter_jobs: state.lookups.filter_jobs,
  definitions: state.definitions,
});

const mapDispatchToProps = {
  getProjects: getProjectsAction,
  toggleModal: toggleModalAction,
  setCurrentJobs: setCurrentJobsAction,
  saveDefinition: saveDefinitionAction,
  setCurrentDefinitions: setCurrentDefinitionsAction,
  logoutUser: logoutUserProps,
  setProject: setProjectAction,
};

const Navigation = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NavigationWrapper),
);
export default Navigation;
