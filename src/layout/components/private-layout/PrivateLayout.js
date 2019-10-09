import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Loading } from 'components/loading/Loading';
import { Toolbar, Breadcrumbs } from '@material-ui/core';
import {
  toggleModal as toggleModalAction,
  setCurrentJobs as setCurrentJobsAction,
  setCurrentDefinitions as setCurrentDefinitionsAction,
  logoutUser as logoutUserProps,
  saveDefinition as saveDefinitionAction,
} from 'ducks/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Alert } from 'components/Alert';
import { getProjects as getProjectsAction } from 'ducks/operators/projects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Sentry from '@sentry/browser';
import { CustomAppBar } from 'components/app-bar/AppBar';
import { CustomizedInputBase } from 'components/search/SearchInput';
import { DropdownMulti } from 'components/dropdowns/DropdownMulti';
import { Menu } from 'components/menu/Menu';
import { styles } from './styles';
import cn from './PrivateLayout.module.scss';
import { Navigation } from 'components/navigation/Navigation';
import { DrawerWrapper } from './Drawer';
import {
  ProjectBread,
  JobFilterBread,
  JobBread,
  DefinitionFilter,
  DefinitionsList,
} from './BreadCramps';

const filtersDefinition = [
  {
    name: 'unarchived',
    id: 1,
    uuid: 1,
  },
  {
    name: 'archived',
    id: 2,
    uuid: 2,
  },
];

const filtersJob = [
  {
    name: 24,
    id: 1,
    uuid: 1,
  },
  {
    name: 7,
    id: 2,
    uuid: 2,
  },
  {
    name: 'Queued',
    id: 3,
    uuid: 3,
  },
  {
    name: 'Starting',
    id: 4,
    uuid: 4,
  },
  {
    name: 'Running',
    id: 5,
    uuid: 5,
  },
  {
    name: 'Complete',
    id: 6,
    uuid: 6,
  },
  {
    name: 'Stopped',
    id: 7,
    uuid: 7,
  },
  {
    name: 'Failed',
    id: 8,
    uuid: 8,
  },
];

export class PrivateLayoutWrapper extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    history: PropTypes.object,
    children: PropTypes.any,
    setHamburger: PropTypes.func,
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
  };

  logout = () => {
    const { logoutUser, history } = this.props;
    logoutUser();
    localStorage.clear();
    history.push('/login');
  };

  handleOnSelectFilterJob = item => {
    const { history, location } = this.props;
    const route = location.pathname.split('/');

    history.push(`/projects/${route[2]}/jobs/${item.name}`);
  };

  handleOnSelectFilterDefinition = item => {
    const { history, location } = this.props;
    const route = location.pathname.split('/');

    history.push(`/projects/${route[2]}/definitions/${item.name}`);
  };

  handleOnSelectFilterOneJob = item => {
    const { history, location } = this.props;
    const route = location.pathname.split('/');

    history.push(
      `/projects/${route[2]}/jobs/${route[4]}/job/${item.job_definition_id}`,
    );
  };

  handleOnSelectFilterDefinitionsList = item => {
    const { history, location } = this.props;
    const route = location.pathname.split('/');

    history.push(
      `/projects/${route[2]}/definitions/${route[4]}/definition/${
        item.job_definition_id
      }`,
    );
  };

  handleOnSelectFilterProject = item => {
    const { history, location } = this.props;
    const route = location.pathname.split('/');
    history.push(`/projects/${item.project_id}/jobs/${route[4]}`);
  };

  handleOnSelectFilterProjectDef = item => {
    const { history, location } = this.props;
    const route = location.pathname.split('/');
    history.push(`/projects/${item.project_id}/definitions/${route[4]}`);
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
      settings: { project, job, jobs, definitions, definitionChanged },
      history,
      projects,
      jobs: jobsData,
      definitions: definitionsData,
      saveDefinition,
    } = this.props;
    const route = location.pathname.split('/');
    if (route.length === 2) {
      return (
        <>
          <div className={cn.header}>Projects</div>
          <div className={cn.flexGrow} />
          <div
            className={cn.iconContainer}
            onClick={() => toggleModal({ project: true })}
          >
            <FontAwesomeIcon icon="plus" color="#818fa3" />
          </div>
          <div className={cn.logout} onClick={this.logout}>
            <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
          </div>
        </>
      );
    }
    if (route.length === 7 && route[5] === 'job') {
      return (
        <>
          <Breadcrumbs
            separator={<FontAwesomeIcon icon="chevron-right" color="#818fa3" />}
            aria-label="breadcrumb"
            classes={{ separator: cn.separator, root: cn.text }}
          >
            <ProjectBread
              projects={projects}
              handleOnSelectFilterProject={this.handleOnSelectFilterProject}
              route={route}
            />
            <JobFilterBread
              route={route}
              filtersJob={filtersJob}
              handleOnSelectFilterJob={this.handleOnSelectFilterJob}
            />
            <div>Jobs</div>
            {/* fill work when api will be ready */}
            {/* <JobBread route={route} handleOnSelectFilterOneJob={this.handleOnSelectFilterOneJob} jobs={jobsData}/> */}
            <div>{job.jobName}</div>
          </Breadcrumbs>
          <div className={cn.flex} />
          <div className={cn.logout} onClick={this.logout}>
            <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
          </div>
        </>
      );
    }

    if (route.length === 5 && route[3] === 'jobs') {
      return (
        <>
          <Breadcrumbs
            separator={<FontAwesomeIcon icon="chevron-right" color="#818fa3" />}
            aria-label="breadcrumb"
            classes={{ separator: cn.separator, root: cn.text }}
          >
            <ProjectBread
              projects={projects}
              handleOnSelectFilterProject={this.handleOnSelectFilterProject}
              route={route}
            />
            <JobFilterBread
              route={route}
              filtersJob={filtersJob}
              handleOnSelectFilterJob={this.handleOnSelectFilterJob}
            />
          </Breadcrumbs>
          <div className={cn.flexGrow} />
          <div className={cn.actionWrapper}>
            <div className={cn.searchContainer}>
              <CustomizedInputBase onSearch={this.onSearch} />
            </div>
            <div className={cn.iconContainer}>
              <DropdownMulti
                rows={jobs.headers.filter(
                  header => !!header.title && !header.flex_grow,
                )}
                checked={jobs.columns}
                checked_key="title"
                row_key="title"
                icon={['fas', 'cog']}
                inner_title="Hide Columns"
                handleOnSelect={item => this.handleOnColumnCheck(item, 'jobs')}
              />
            </div>
            <div className={cn.logout} onClick={this.logout}>
              <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
            </div>
          </div>
        </>
      );
    }
    if (route.length === 5 && route[3] === 'definitions') {
      return (
        <>
          <Breadcrumbs
            separator={<FontAwesomeIcon icon="chevron-right" color="#818fa3" />}
            aria-label="breadcrumb"
            classes={{ separator: cn.separator, root: cn.text }}
          >
            <ProjectBread
              projects={projects}
              handleOnSelectFilterProject={this.handleOnSelectFilterProjectDef}
              route={route}
            />
            <DefinitionFilter
              route={route}
              filtersDefinition={filtersDefinition}
              handleOnSelectFilterDefinition={
                this.handleOnSelectFilterDefinition
              }
            />
          </Breadcrumbs>
          <div className={cn.actionWrapper}>
            <div className={cn.searchContainer}>
              <CustomizedInputBase onSearch={this.handleTableSearch} />
            </div>
            <div className={cn.iconContainer}>
              <DropdownMulti
                rows={definitions.headers.filter(
                  header => !!header.title && !header.flex_grow,
                )}
                checked={definitions.columns}
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
            <div className={cn.logout} onClick={this.logout}>
              <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
            </div>
          </div>
        </>
      );
    }
    if (route.length === 7 && route[5] === 'definition') {
      return (
        <>
          <Breadcrumbs
            separator={<FontAwesomeIcon icon="chevron-right" color="#818fa3" />}
            aria-label="breadcrumb"
            classes={{ separator: cn.separator, root: cn.text }}
          >
            <ProjectBread
              projects={projects}
              handleOnSelectFilterProject={this.handleOnSelectFilterProjectDef}
              route={route}
            />
            <DefinitionFilter
              route={route}
              filtersDefinition={filtersDefinition}
              handleOnSelectFilterDefinition={
                this.handleOnSelectFilterDefinition
              }
            />
            <div>Definition</div>
            <DefinitionsList
              route={route}
              definitions={definitionsData}
              handleOnSelectFilterDefinitionsList={
                this.handleOnSelectFilterDefinitionsList
              }
            />
          </Breadcrumbs>
          <div className={cn.actionWrapperDefinition}>
            <div
              className={cn.iconContainer}
              onClick={() => saveDefinition(true)}
            >
              <FontAwesomeIcon
                icon={['far', 'save']}
                color={definitionChanged ? 'orange' : '#818fa3'}
              />
            </div>
            <div className={cn.logout} onClick={this.logout}>
              <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
            </div>
          </div>
        </>
      );
    }
  };

  render() {
    const {
      loading,
      settings: { project },
    } = this.props;
    this.generateToolbar();
    return (
      <div className={cn.privateLayout}>
        <Menu />
        <div className={cn.content}>
          <Navigation>{this.generateToolbar()}</Navigation>
          <div className={cn.views}>{this.props.children}</div>
        </div>
        <Alert />
        {loading && <Loading variant="dark" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hamburger: state.hamburger,
  settings: state.settings,
  loading: state.settings.loading,
  project: state.project,
  projects: state.projects,
  jobs: state.jobs,
  definitions: state.definitions,
});

const mapDispatchToProps = {
  getProjects: getProjectsAction,
  toggleModal: toggleModalAction,
  setCurrentJobs: setCurrentJobsAction,
  saveDefinition: saveDefinitionAction,
  setCurrentDefinitions: setCurrentDefinitionsAction,
  logoutUser: logoutUserProps,
};

export const StyledPrivateLayout = withStyles(styles, { withTheme: true })(
  PrivateLayoutWrapper,
);

const PrivateLayout = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(StyledPrivateLayout),
);
export default PrivateLayout;
