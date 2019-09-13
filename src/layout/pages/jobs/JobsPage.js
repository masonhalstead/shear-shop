import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableContainer } from 'components/common/table-view/TableContainer';
import { TableContent } from 'components/common/table-view/TableContent';
import { Toolbar, Breadcrumbs } from '@material-ui/core';
import { CustomAppBar } from 'components/common/appBar/AppBar';
import { getProjects as getProjectsAction } from 'ducks/operators/projects';
import { logoutUser } from 'ducks/actions';

import * as Sentry from '@sentry/browser';
import cn from './Jobs.module.scss';
import { columns } from './columns';

const result = {
  client: 'Edelman',
  statement: 'April 2019',
  startdate: '2019-04-01T00:00:00',
  enddate: '2019-04-30T00:00:00',
  data: [
    {
      jobname: 'Run Python',
      state: 'queued',
      duration: '4h 23m',
      requirements: '1CPU, 16GM RAM',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 1,
    },
    {
      jobname: 'QScopeUpdate',
      state: 'complete',
      duration: '1d 4h 23m',
      requirements: '1CPU, 16GM RAM',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 2,
    },
    {
      jobname: 'QScopeUpdate Strategy2',
      state: 'running',
      duration: '1d 4h 23m',
      requirements: '1CPU, 16GM RAM',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 3,
    },
    {
      jobname: 'QScopeUpdate Strategy1',
      state: 'failed',
      duration: '1d 4h 23m',
      requirements: '1CPU, 16GM RAM',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 3,
    },
  ],
};

class JobsPage extends PureComponent {
  static propTypes = {
    getProjects: PropTypes.func,
    hamburger: PropTypes.object,
    projects: PropTypes.array,
    history: PropTypes.object,
    location: PropTypes.object,
  };

  static getDerivedStateFromProps(props, state) {
    const filter = props.location.pathname.split('/');
    let label = 'Last 24 Hours';

    if (filter[4] === '7') {
      label = 'Last 7 Days';
    }
    if (filter[4] !== '24' && filter[4] !== '7') {
      label = filter[4].charAt(0).toUpperCase() + filter[4].slice(1);
    }
    if (state.label !== label) {
      return { label };
    }

    return state;
  }

  options = {
    filterType: 'textField',
    selectableRows: 'none',
    search: true,
    pagination: false,
    filter: true,
    download: false,
    viewColumns: true,
    print: false,
  };

  state = {
    label: 'Last 24 Hours',
  };

  componentDidMount() {
    const { getProjects } = this.props;
    try {
      getProjects();
    } catch (err) {
      // Only fires if the server is off line or the body isnt set correctly
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
    const { label } = this.state;
    return (
      <>
        <CustomAppBar hamburger={hamburger.open}>
          <Toolbar className={cn.toolbar}>
            <Breadcrumbs
              separator={
                <FontAwesomeIcon icon="chevron-right" color="#818fa3" />
              }
              aria-label="breadcrumb"
              classes={{ separator: cn.separator, root: cn.text }}
            >
              {' '}
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  history.push(`/projects`);
                }}
              >
                Lynx (Prod)
              </div>
              <div>{label}</div>
            </Breadcrumbs>
            <div className={cn.logout} onClick={this.logout}>
              <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
            </div>
          </Toolbar>
        </CustomAppBar>
        <TableContainer>
          <TableContent
            tableData={result.data}
            tableOptions={this.options}
            columns={columns}
          />
        </TableContainer>
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
)(JobsPage);
