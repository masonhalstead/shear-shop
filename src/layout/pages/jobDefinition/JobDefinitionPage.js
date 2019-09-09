import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableContainer } from 'components/common/table-view/TableContainer';
import { TableContent } from 'components/common/table-view/TableContent';
import { Toolbar, Breadcrumbs } from '@material-ui/core';
import { CustomAppBar } from 'components/common/appBar/AppBar';
import { getJobDefinitions as getJobDefinitionsAction } from 'ducks/operators/job_definitions';
import * as Sentry from '@sentry/browser';
import cn from './JobDefinitionPage.module.scss';
import { configureColumns } from './columns';
import RunDefinition from './runDefinition/RunDefinition';
import CustomToolbar from './CustomToolbarIcon';

const result = {
  client: 'Edelman',
  statement: 'April 2019',
  startdate: '2019-04-01T00:00:00',
  enddate: '2019-04-30T00:00:00',
  data: [
    {
      jobdefinition: 'Run Python',
      requirements: '1CPU, 16GM RAM',
      location: 'us east-1',
      timeout: '32min',
      method: 'STDOUT JSON',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 1,
    },
    {
      jobdefinition: 'QScopeUpdate',
      requirements: '1CPU, 16GM RAM',
      location: 'us east-14',
      timeout: '12h 32min',
      method: 'STDOUT',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 2,
    },
    {
      jobdefinition: 'QScopeUpdate Strategy2',
      requirements: '1CPU, 16GM RAM',
      location: 'us east-14',
      timeout: '1h 32min',
      method: 'STDOUT("done")',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 3,
    },
    {
      jobdefinition: 'QScopeUpdate Strategy1',
      requirements: '1CPU, 16GM RAM',
      location: 'us east-2',
      timeout: '2min',
      method: 'Auto',
      createdBy: 'Linyx User',
      created: '8/13/19 13:00:00',
      id: 3,
    },
  ],
};

class JobDefinitionPage extends PureComponent {
  static propTypes = {
    getJobDefinitions: PropTypes.func,
    hamburger: PropTypes.object,
    jobDefinitions: PropTypes.array,
    history: PropTypes.object,
    location: PropTypes.object,
    lookups: PropTypes.object,
  };

  static getDerivedStateFromProps(props, state) {
    const filter = props.location.pathname.split('/');
    const label = filter[4].charAt(0).toUpperCase() + filter[4].slice(1);

    if (state.label !== label) {
      return { label };
    }

    return state;
  }

  options = {
    filterType: 'textField',
    selectableRows: 'none',
    search: true,
    pagination: true,
    filter: true,
    download: false,
    viewColumns: true,
    print: false,
  };

  state = {
    label: 'Unarchived',
    run: false,
    title: '',
    id: '',
  };

  componentDidMount() {
    const { getJobDefinitions } = this.props;
    try {
      getJobDefinitions();
    } catch (err) {
      // Only fires if the server is off line or the body isnt set correctly
      Sentry.captureException(err);
    }
  }

  runJob = () => {
    this.setState({ run: false });
  };

  handleClose = () => {
    this.setState({ run: false });
  };

  openModal = (title, id) => {
    this.setState({ run: true, title, id });
  };

  openDefinition = id => {
    const { history } = this.props;
    const projectId = 1;
    history.push(`/projects/${projectId}/definitions/${id}/definition`);
  };

  createColumns = () => configureColumns(this.openModal, this.openDefinition);

  render() {
    const { hamburger, jobDefinitions, history, lookups } = this.props;
    const { label, run, title, id } = this.state;
    return (
      <>
        <CustomAppBar hamburger={hamburger.open}>
          <Toolbar className={cn.toolbar}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
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
            <div className={cn.logout}>
              <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
            </div>
          </Toolbar>
        </CustomAppBar>
        <TableContainer>
          <TableContent
            tableData={result.data}
            tableOptions={this.options}
            columns={this.createColumns()}
            customActions={<CustomToolbar handleClick={() => {}} />}
          />
        </TableContainer>
        <RunDefinition
          opened={run}
          toggleModal={() => this.setState({ run: false })}
          runJob={this.runJob}
          handleClose={this.handleClose}
          title={title}
          locations={lookups.locations}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  hamburger: state.hamburger,
  jobDefinitions: state.jobDefinitions,
  lookups: state.lookups,
});

const mapDispatchToProps = {
  getJobDefinitions: getJobDefinitionsAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobDefinitionPage);
