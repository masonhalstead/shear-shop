import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getJobConfig as getJobConfigAction } from 'ducks/operators/job';
import * as Sentry from '@sentry/browser';
import { Toolbar, Breadcrumbs, Paper, Tabs, Tab } from '@material-ui/core';
import { CustomAppBar } from 'components/app-bar/AppBar';
import { logoutUser, setLoading } from 'ducks/actions';
import { TableContainer } from 'components/table-view/TableContainer';
import { TableContent } from 'components/table-view/TableContent';
import cn from './Job.module.scss';
import { configureColumnsOutput } from './outputColumns';
import { configureColumnsInput, data } from './columnsInput';
import { configureHistoryColums, data as dataHistory } from './historyColumns';

const tabStyle = {
  width: '300px',
  fontSize: 14,
  fontWeight: 400,
  minHeight: 44,
  textTransform: 'capitalize',
  borderBottom: '1px solid transparent',
  borderRight: '1px solid #cfd7e6',
};

class JobPage extends PureComponent {
  static propTypes = {
    getProjects: PropTypes.func,
    hamburger: PropTypes.object,
    projects: PropTypes.array,
    lookups: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
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
    pagination: false,
    filter: false,
    download: false,
    viewColumns: false,
    print: false,
  };

  state = {
    label: 'Unarchived',
    definitionName: '',
    dockerImage: '',
    startupCommand: '',
    description: '',
    cpu: '',
    timeout: '',
    location: 'empty',
    retries: '',
    gpu: '',
    memory: '',
    region: 'empty',
    success: '',
    tab: 0,
    open: false,
    openEnv: false,
    index: '',
    project: '',
    parameter: '',
    method: '',
    encrypted: '',
    prefix: '',
    assignment: '',
    ignore: '',
    escaped: '',
    params: [
      {
        value: '',
        description: '',
      },
    ],
    data: [
      {
        name: '',
        reference_parameter: '',
        required: false,
        method: '',
        reference: '',
        default: '',
        description: '',
        prefix: '',
        encrypted: '',
        assignment: '',
        escaped: '',
        ignore: '',
        id: 1,
      },
    ],
    changes: false,
    anchorEl: null,
    anchorElEnv: null,
  };

  componentDidMount() {
    this.setInitialData();
  }

  componentWillUnmount() {
    this.setState({ changes: false });
  }

  setInitialData = async () => {
    const { getJobConfig, setLoadingAction, location } = this.props;
    const [, , , , job_id] = location.pathname.split('/');

    try {
      await setLoadingAction(true);
      await getJobConfig(job_id);
    } catch (err) {
      // Only fires if the server is off line or the body isnt set correctly
      Sentry.captureException(err);
    }
    setLoadingAction(false);
  };

  handleChangeTab = (event, newValue) => {
    this.setState({ tab: newValue });
  };

  changeName = (value, index) => {
    const { params } = this.state;
    if (params.length === index + 1) {
      this.addMoreParameters();
    }
    this.setState(prevState => {
      const newItems = [...prevState.params];
      newItems[index].value = value;
      return { params: newItems, changes: true };
    });
  };

  changeDescription = (description, index) => {
    this.setState(prevState => {
      const newItems = [...prevState.params];
      newItems[index].description = description;
      return { params: newItems, changes: true };
    });
  };

  deleteOutputRow = index => {
    const { params } = this.state;
    const result = params.filter((item, indexNew) => indexNew !== index);
    this.setState({ params: result, changes: true });
  };

  addMoreParameters = () => {
    this.setState(prevState => {
      const newItems = [...prevState.params];
      newItems.push({
        value: '',
        description: '',
      });
      return { params: newItems, changes: true };
    });
  };

  secondTab = () => (
    <TableContainer style={cn.tableContainerWrapper}>
      <TableContent
        tableData={data}
        tableOptions={this.options}
        columns={this.createColumnsInputs()}
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
              '&:nth-child(2)': {
                width: 189,
              },
              '&:nth-child(4)': {
                width: 189,
              },
            },
            head: {
              fontSize: '1rem',
            },
          },
        }}
      />
    </TableContainer>
  );

  thirdTab = () => (
    <TableContainer style={cn.tableContainerWrapper}>
      <TableContent
        tableData={data}
        tableOptions={this.options}
        columns={this.createColumnsOutput()}
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
              '&:nth-child(2)': {
                width: 189,
              },
              '&:nth-child(4)': {
                width: 189,
              },
            },
            head: {
              fontSize: '1rem',
            },
          },
        }}
      />
    </TableContainer>
  );

  fourthTab = () => (
    <TableContainer style={cn.tableContainerWrapper}>
      <TableContent
        tableData={dataHistory}
        tableOptions={this.options}
        columns={this.createColumnsHistory()}
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
              '&:nth-child(2)': {
                width: 489,
              },
            },
            head: {
              fontSize: '1rem',
            },
          },
        }}
      />
    </TableContainer>
  );

  createColumnsInputs = () => configureColumnsInput();

  createColumnsHistory = () => configureHistoryColums();

  createColumnsOutput = () =>
    configureColumnsOutput(
      this.changeName,
      this.changeDescription,
      this.deleteOutputRow,
    );

  firstTab = () => (
    <div className={cn.stdoutContainer}>
      <p className={cn.stdoutText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
  );

  logout = () => {
    const { logoutUserProps, history } = this.props;
    logoutUserProps();
    localStorage.clear();
    history.push('/login');
  };

  insideContent = () => (
    <>
      <div className={cn.containerTabRow}>
        <div className={cn.padding}>
          <div className={cn.label}>Docker Image</div>
          <div className={cn.text}>cognitiv/umbro</div>
        </div>
        <div className={cn.padding}>
          <div className={cn.label}>Description</div>
          <div className={cn.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <div className={cn.padding}>
          <div className={cn.label}>Startup command</div>
          <div className={cn.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
      <div className={cn.containerConfigRow}>
        <div className={cn.rowConfig}>
          <div className={cn.textAlign}>
            <div className={cn.label}>CPU</div>
            <div className={cn.text}>12</div>
          </div>
          <div className={cn.textAlign}>
            <div className={cn.label}>GPU</div>
            <div className={cn.text}>0</div>
          </div>
          <div className={cn.textAlign}>
            <div className={cn.label}>Memory GB</div>
            <div className={cn.text}>20</div>
          </div>
        </div>
        <div className={cn.rowConfig}>
          <div className={cn.textAlign}>
            <div className={cn.label}>Max Retries</div>
            <div className={cn.text}>0</div>
          </div>
          <div className={cn.textAlign}>
            <div className={cn.label}>Timeout</div>
            <div className={cn.text}>1 day</div>
          </div>
        </div>
        <div className={cn.rowConfig}>
          <div className={cn.textAlign}>
            <div className={cn.label}>Location</div>
            <div className={cn.text}>us-east-1</div>
          </div>
          <div className={cn.textAlign}>
            <div className={cn.label}>Method</div>
            <div className={cn.text}>Auto</div>
          </div>
        </div>
      </div>
    </>
  );

  render() {
    const {
      hamburger,
      history,
      projects,
      settings: { project },
      location,
    } = this.props;
    const { label, tab, changes, ignore } = this.state;
    const id = 1;
    let content = '';
    let contentInside = '';
    if (tab === 0) {
      content = this.firstTab();
    }
    if (tab === 1) {
      content = this.secondTab();
      contentInside = this.insideContent();
    }
    if (tab === 2) {
      content = this.thirdTab();
    }

    if (tab === 3) {
      content = this.fourthTab();
    }

    let projectName = '';
    if (projects.length > 0) {
      if (!Object(project).hasOwnProperty('project_id')) {
        const projectId = location.pathname.split('/')[2];
        projectName = projects.filter(
          project => project.project_id === Number(projectId),
        )[0].project_name;
      } else {
        projectName = project.project_name;
      }
    }

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
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  history.push(`/projects`);
                }}
              >
                {projectName}
              </div>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  history.push(`/projects/${id}/definitions/unarchived`);
                }}
              >
                Job Definitions
              </div>
              <div>{label}</div>
            </Breadcrumbs>
            <div className={cn.flex} />
            <div className={cn.logout} onClick={this.logout}>
              <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
            </div>
          </Toolbar>
        </CustomAppBar>
        <Paper className={cn.contentAlignHeader}>
          <div className={cn.firstRow}>
            <div className={cn.textMarginBig}>
              <div className={cn.circle} />
              <div>Job: 543433</div>
            </div>
            <div className={cn.textColor}>Running</div>
          </div>
          <div className={cn.firstRow}>
            <div className={cn.textMargin}>Parse Logs: 2019-02-01</div>
            <div className={cn.textMargin}>16h 32m 12s</div>
          </div>
          <div className={cn.firstRow}>
            <div className={cn.textMargin}>LogPredict</div>
            <div className={cn.textMargin}>460MB / 900MB</div>
          </div>
        </Paper>
        <Paper className={cn.contentAlignSecond}>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            classes={{
              root: cn.tabsWrapper,
            }}
            onChange={this.handleChangeTab}
            TabIndicatorProps={{
              style: {
                backgroundColor: '#3e96ed',
              },
            }}
          >
            <Tab
              style={{
                ...tabStyle,
                color: tab === 0 ? '#3e96ed' : '#62738d',
              }}
              label="STDOUT"
            />
            <Tab
              style={{
                ...tabStyle,
                color: tab === 1 ? '#3e96ed' : '#62738d',
              }}
              label="Inputs"
            />
            <Tab
              style={{
                ...tabStyle,
                color: tab === 2 ? '#3e96ed' : '#62738d',
              }}
              label="Outputs"
            />
            <Tab
              style={{
                ...tabStyle,
                color: tab === 3 ? '#3e96ed' : '#62738d',
              }}
              label="History"
            />
          </Tabs>
          {tab === 0 && <div className={cn.tabValueFirst}>{content}</div>}
          {tab === 1 && (
            <div className={cn.tabValueSecond}>{contentInside}</div>
          )}
          {tab !== 0 && <div className={cn.tabValueAlt}>{content}</div>}
        </Paper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  hamburger: state.hamburger,
  lookups: state.lookups,
  projects: state.projects,
  settings: state.settings,
});

const mapDispatchToProps = {
  getJobConfig: getJobConfigAction,
  logoutUserProps: logoutUser,
  setLoadingAction: setLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobPage);
