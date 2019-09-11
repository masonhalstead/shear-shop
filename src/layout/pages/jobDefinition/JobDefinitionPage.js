import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableContainer } from 'components/common/table-view/TableContainer';
import { TableContent } from 'components/common/table-view/TableContent';
import { Toolbar, Breadcrumbs, Dialog, Button } from '@material-ui/core';
import { CustomAppBar } from 'components/common/appBar/AppBar';
import { getJobDefinitions as getJobDefinitionsAction } from 'ducks/operators/job_definitions';
import { addJobDefinition as addJobDefinitionAction } from 'ducks/operators/job_definition';
import * as Sentry from '@sentry/browser';
import { CustomizedInputBase } from 'components/common/search/SearchInput';
import Popover from 'components/common/popover/Popover';
import TableViewCol from 'components/common/viewColumn/ViewColumn';
import classNames from 'classnames';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'components/common/dialogs/Dialogs';
import { CustomInput } from 'components/common/material-input/CustomInput';
import cn from './JobDefinitionPage.module.scss';
import { configureColumns } from './columns';
import RunDefinition from './runDefinition/RunDefinition';

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
    search: false,
    pagination: true,
    filter: false,
    download: false,
    viewColumns: false,
    print: false,
  };

  state = {
    label: 'Unarchived',
    run: false,
    title: '',
    search: '',
    jobName: '',
    columns: [],
    viewColumns: [],
    open: false,
  };

  componentDidMount() {
    const { getJobDefinitions } = this.props;
    this.createColumns();
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

  handleCloseDefinition = () => {
    this.setState({ open: false });
  };

  openModal = (title, id) => {
    this.setState({ run: true, title, id });
  };

  openDefinition = id => {
    const { history } = this.props;
    const projectId = 1;
    history.push(`/projects/${projectId}/definitions/${id}/definition`);
  };

  onSearch = e => {
    this.setState({ search: e.target.value });
  };

  createColumns = () => {
    const columns = configureColumns(this.openModal, this.openDefinition);
    this.setState({ columns, viewColumns: columns });
  };

  changeJobName = name => {
    this.setState({ jobName: name });
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

  createDefinition = () => {
    const { jobName } = this.state;
    const { addJobDefinition } = this.props;
    addJobDefinition({ job_definition_name: jobName });
    this.setState({ open: false });
  };

  render() {
    const { hamburger, jobDefinitions, history, lookups } = this.props;
    const {
      label,
      run,
      title,
      search,
      columns,
      viewColumns,
      open,
      jobName,
    } = this.state;
    return (
      <>
        <CustomAppBar hamburger={hamburger.open}>
          <Toolbar className={cn.toolbar}>
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              classes={{ separator: cn.separator }}
            >
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
            <div
              style={{ display: 'flex', flexDirection: 'row', width: '50%' }}
            >
              <div className={cn.search}>
                <CustomizedInputBase onSearch={this.onSearch} />
              </div>
              <div className={cn.logout}>
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
              <div
                className={cn.add}
                onClick={() => this.setState({ open: true })}
              >
                <FontAwesomeIcon icon="plus" color="#818fa3" />
              </div>
              <div className={cn.upperLine} />
              <div className={cn.logout}>
                <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
              </div>
            </div>
          </Toolbar>
        </CustomAppBar>
        {columns.length > 0 && (
          <div style={{ margin: '25px' }}>
            <TableContainer>
              <TableContent
                tableData={
                  search.length > 0
                    ? result.data.filter(item =>
                        item.jobdefinition.toLowerCase().includes(search),
                      )
                    : result.data
                }
                tableOptions={this.options}
                columns={viewColumns}
              />
            </TableContainer>
          </div>
        )}
        <RunDefinition
          opened={run}
          toggleModal={() => this.setState({ run: false })}
          runJob={this.runJob}
          handleClose={this.handleClose}
          title={title}
          locations={lookups.locations}
        />
        <Dialog
          onClose={this.handleCloseDefinition}
          aria-labelledby="customized-dialog-title"
          open={open}
          classes={{ paper: cn.paper }}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.handleCloseDefinition}
          >
            <div className={cn.title}>Create Job Definition</div>
          </DialogTitle>
          <DialogContent dividers>
            <div className={cn.container}>
              <div className={cn.label}>Job Definition Name</div>
              <CustomInput
                value={jobName}
                name="jobName"
                onChange={e => this.changeJobName(e.target.value)}
              />
            </div>
          </DialogContent>
          <DialogActions className={cn.actions}>
            <Button
              onClick={this.createDefinition}
              color="primary"
              size="large"
              className={classNames(cn.btn, cn.btnPrimary)}
            >
              Create Definition
            </Button>
          </DialogActions>
        </Dialog>
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
  addJobDefinition: addJobDefinitionAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobDefinitionPage);
