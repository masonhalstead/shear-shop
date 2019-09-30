import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Loading } from 'components/loading/Loading';
import {
  Toolbar,
  Breadcrumbs,
} from '@material-ui/core';
import {
  setHamburger as setHamburgerAction,
  toggleModal as toggleModalAction,
  setCurrentJobs as setCurrentJobsAction,
  setCurrentDefinitions as setCurrentDefinitionsAction,
} from 'ducks/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Alert } from 'components/Alert';
import { getProjects as getProjectsAction } from 'ducks/operators/projects';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styles } from './styles';
import cn from './PrivateLayout.module.scss';
import * as Sentry from '@sentry/browser';
import { CustomAppBar } from 'components/app-bar/AppBar';
import { CustomizedInputBase } from 'components/search/SearchInput';
import { DropdownMulti } from 'components/dropdowns/DropdownMulti';
import { DrawerWrapper } from './Drawer';

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

  handleDrawerOpen = () => {
    const { open } = this.state;
    const { setHamburger } = this.props;
    this.setState({ open: !open }, () => {
      setHamburger({ open: !open });
    });
  };

  logout = () => {
    const { logoutUserProps, history } = this.props;
    logoutUserProps();
    localStorage.clear();
    history.push('/login');
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

    let columns = jobs.columns;
    let headers = jobs.headers;

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
      settings: { project, job, jobs, definitions },
      history,
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
    if (route.length === 6 && route[5] === 'job') {
      return (
        <>
          <Breadcrumbs
            separator={<FontAwesomeIcon icon="chevron-right" color="#818fa3" />}
            aria-label="breadcrumb"
            classes={{ separator: cn.separator, root: cn.text }}
          >
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                history.push(`/projects`);
              }}
            >
              {project.project_name}
            </div>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                history.push(`/projects/${project.project_id}/jobs/24`);
              }}
            >
              Jobs
            </div>
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
      let label = 'Last 24 Hours';

      if (route[4] === '7') {
        label = 'Last 7 Days';
      }
      if (route[4] !== '24' && route[4] !== '7') {
        label = route[4].charAt(0).toUpperCase() + route[4].slice(1);
      }
      return (
        <>
          <Breadcrumbs
            separator={<FontAwesomeIcon icon="chevron-right" color="#818fa3" />}
            aria-label="breadcrumb"
            classes={{ separator: cn.separator, root: cn.text }}
          >
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                history.push(`/projects`);
              }}
            >
              {project.project_name}
            </div>
            <div>{label}</div>
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
      const label = route[4].charAt(0).toUpperCase() + route[4].slice(1);
      return (
        <>
          <Breadcrumbs
            separator={<FontAwesomeIcon icon="chevron-right" color="#818fa3" />}
            aria-label="breadcrumb"
            classes={{ separator: cn.separator, root: cn.text }}
          >
            <div
              className={cn.text}
              onClick={() => {
                history.push(`/projects`);
              }}
            >
              {project.project_name}
            </div>
            <div>{label}</div>
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
  };

  buildCustomToolbar = () => (
    <Toolbar className={cn.toolbar}>{this.generateToolbar()}</Toolbar>
  );

  render() {
    const { open } = this.state;
    const {
      classes,
      history,
      loading,
      settings: { project },
      hamburger,
    } = this.props;
    const id = Object(project).hasOwnProperty('project_id')
      ? project.project_id
      : 1;

    this.generateToolbar();

    return (
      <div className={cn.cognBody}>
        <DrawerWrapper open={open} classes={classes} handleDrawerOpen={this.handleDrawerOpen} history={history} id={id}/>
        <main
          className={classNames(
            open ? classes.content : classes.contentClosed,
            {
              [classes.contentShift]: open,
            },
          )}
        >
          <div className={cn.cognViews}>
            <CustomAppBar hamburger={hamburger.open}>
              {this.buildCustomToolbar()}
            </CustomAppBar>
            {this.props.children}
          </div>
        </main>
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
});

const mapDispatchToProps = {
  setHamburger: setHamburgerAction,
  getProjects: getProjectsAction,
  toggleModal: toggleModalAction,
  setCurrentJobs: setCurrentJobsAction,
  setCurrentDefinitions: setCurrentDefinitionsAction,
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
