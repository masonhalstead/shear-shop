import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableContainer } from 'components/table-view/TableContainer';
import { TableContent } from 'components/table-view/TableContent';
import { Toolbar, Breadcrumbs } from '@material-ui/core';
import { CustomAppBar } from 'components/app-bar/AppBar';
import { getProjects as getProjectsAction } from 'ducks/operators/projects';
import { logoutUser } from 'ducks/actions';

import * as Sentry from '@sentry/browser';
import cn from './Jobs.module.scss';
import { configureColumns } from './columns';
import { CustomizedInputBase } from 'components/search/SearchInput';
import Popover from 'components/popover/Popover';
import TableViewCol from 'components/view-column/ViewColumn';

const result = {
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
    search: '',
    viewColumns: [],
    columns: [],
  };

  componentDidMount() {
    const { getProjects } = this.props;
    this.createColumns();
    try {
      getProjects();
    } catch (err) {
      // Only fires if the server is off line or the body isnt set correctly
      Sentry.captureException(err);
    }
  }

  onSearch = e => {
    this.setState({ search: e.target.value });
  };

  handleColChange = (value, index, checked) => {
    const { viewColumns } = this.state;
    const filtered = [];
    const viewColumnsNew = [];
    viewColumns.forEach(column => {
      if (value !== column.name) {
        viewColumnsNew.push(column);
      } else {
        column.options.display = checked;
        viewColumnsNew.push(column);
      }
    });

    this.setState({ viewColumns: viewColumnsNew });
  };

  createColumns = () => {
    const columns = configureColumns(this.openModal, this.openDefinition);
    this.setState({ columns, viewColumns: columns });
  };

  logout = () => {
    const { logoutUserProps, history } = this.props;
    logoutUserProps();
    localStorage.clear();
    history.push('/login');
  };

  render() {
    const { hamburger, projects, history } = this.props;
    const { label, search, viewColumns, columns } = this.state;
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
            <div className={cn.flexGrow} />
            <div className={cn.actionWrapper}>
              <div className={cn.searchContainer}>
                <CustomizedInputBase onSearch={this.onSearch} />
              </div>
              <div className={cn.iconContainer}>
                <Popover
                  trigger={<FontAwesomeIcon icon="cog" color="#818fa3" />}
                  content={
                    <TableViewCol
                      data={result.data}
                      columns={viewColumns}
                      options={this.options}
                      handleColChange={this.handleColChange}
                    />
                  }
                />
              </div>
              <div className={cn.logout} onClick={this.logout}>
                <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
              </div>
            </div>
          </Toolbar>
        </CustomAppBar>
        {columns.length > 0 && (
          <TableContainer>
            <TableContent
              tableData={
                search.length > 0
                  ? result.data.filter(item =>
                    item.jobname.toLowerCase().includes(search),
                  )
                  : result.data
              }
              tableOptions={this.options}
              columns={viewColumns}
              styles={{
                MuiTableCell: {
                  root: {
                    border: '1px solid #dde3ee',
                    borderBottom: '1px solid #dde3ee',
                  },
                  body: {
                    fontSize: '13px',
                    fontWeight: 300,
                    lineHeight: '1',
                    padding: '5px !important',
                    '&:nth-child(4)': {
                      width: 99,
                    },
                    '&:nth-child(6)': {
                      width: 114,
                    },
                    '&:nth-child(8)': {
                      width: 114,
                    },
                    '&:nth-child(10)': {
                      width: 114,
                    },
                    '&:nth-child(12)': {
                      width: 124,
                    },
                    '&:nth-child(14)': {
                      width: 39,
                    },
                    '&:nth-child(16)': {
                      width: 39,
                    },
                  },
                  head: {
                    fontSize: '1rem',
                  },
                },
              }}
            />
          </TableContainer>
        )}
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
