import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getProjects as getProjectsAction } from 'ducks/operators/projects';
import * as Sentry from '@sentry/browser';
import {
  Toolbar,
  Breadcrumbs,
  Paper,
  Tabs,
  Tab,
  FormControl,
  NativeSelect,
} from '@material-ui/core';
import { CustomAppBar } from 'components/app-bar/AppBar';
import { logoutUser } from 'ducks/actions';
import {
  CustomInput,
  CustomInputBack,
} from 'components/material-input/CustomInput';
import {
  BootstrapInput,
  BootstrapInputDisabled,
} from 'components/bootsrap-input/BootstrapInput';
import { TableContainer } from 'components/table-view/TableContainer';
import { TableContent } from 'components/table-view/TableContent';
import cn from './Job.module.scss';
import { configureColumnsOutput } from './outputColumns';
import { configureColumnsInput, data } from './columnsInput';

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
    const { getProjects } = this.props;
    try {
      getProjects();
    } catch (err) {
      // Only fires if the server is off line or the body isnt set correctly
      Sentry.captureException(err);
    }
  }

  componentWillUnmount() {
    this.setState({ changes: false });
  }

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

  createColumnsInputs = () => configureColumnsInput();

  createColumnsOutput = () =>
    configureColumnsOutput(
      this.changeName,
      this.changeDescription,
      this.deleteOutputRow,
    );

  // firstTab = () => {
  //   const {
  //     cpu,
  //     timeout,
  //     retries,
  //     location,
  //     gpu,
  //     method,
  //     region,
  //     memory,
  //     success,
  //   } = this.state;
  //   const {
  //     lookups: { locations, result_methods },
  //   } = this.props;
  //
  //   return (
  //     <>
  //       <div className={cn.containerRow}>
  //         <div className={cn.containerLeft}>
  //           <div className={cn.label}>CPU</div>
  //           <CustomInput
  //             className={cn.rowPadding}
  //             type="number"
  //             label="CPU"
  //             value={cpu}
  //             name="cpu"
  //             onChange={e =>
  //               this.setState({ cpu: e.target.value, changes: true })
  //             }
  //             inputStyles={{ input: cn.inputStyles }}
  //           />
  //         </div>
  //         <div className={cn.containerMiddle}>
  //           <div className={cn.label}>Timeout</div>
  //           <CustomInput
  //             type="time"
  //             className={cn.rowPadding}
  //             label="Timeout"
  //             value={timeout}
  //             name="dockerImage"
  //             onChange={e =>
  //               this.setState({ timeout: e.target.value, changes: true })
  //             }
  //             inputStyles={{ input: cn.inputStyles }}
  //           />
  //         </div>
  //         <div className={cn.containerRight}>
  //           <div className={cn.label}>Max Retries</div>
  //           <CustomInput
  //             className={cn.rowPadding}
  //             type="number"
  //             label="Max Retries"
  //             value={retries}
  //             name="retries"
  //             onChange={e =>
  //               this.setState({ retries: e.target.value, changes: true })
  //             }
  //             inputStyles={{ input: cn.inputStyles }}
  //           />
  //         </div>
  //       </div>
  //       <div className={cn.containerRow}>
  //         <div className={cn.containerLeft}>
  //           <div className={cn.label}>GPU</div>
  //           <CustomInput
  //             className={cn.rowPadding}
  //             label="GPU"
  //             type="number"
  //             value={gpu}
  //             name="gpu"
  //             onChange={e =>
  //               this.setState({ gpu: e.target.value, changes: true })
  //             }
  //             inputStyles={{ input: cn.inputStyles }}
  //           />
  //         </div>
  //         <FormControl className={cn.containerMiddle}>
  //           <div className={cn.label}>Location</div>
  //           <NativeSelect
  //             disabled={region !== 'empty'}
  //             value={location}
  //             onChange={e =>
  //               this.setState({ location: e.target.value, changes: true })
  //             }
  //             input={
  //               region !== 'empty' ? (
  //                 <BootstrapInputDisabled name="location" id="location" />
  //               ) : (
  //                 <BootstrapInput name="location" id="location" />
  //               )
  //             }
  //           >
  //             <option key="empty" value="empty" />
  //             {locations.map(item => (
  //               <option key={item.uuid} value={item.location_id}>
  //                 {item.location_name}
  //               </option>
  //             ))}
  //           </NativeSelect>
  //         </FormControl>
  //         <FormControl className={cn.containerRight}>
  //           <div className={cn.label}>Result Method</div>
  //           <NativeSelect
  //             value={method}
  //             onChange={e =>
  //               this.setState({ method: e.target.value, changes: true })
  //             }
  //             input={<BootstrapInput name="method" id="method" />}
  //           >
  //             <option key="empty" value="empty" />
  //             {result_methods.map(item => (
  //               <option key={item.uuid} value={item.result_method_id}>
  //                 {item.result_method_name}
  //               </option>
  //             ))}
  //           </NativeSelect>
  //         </FormControl>
  //       </div>
  //       <div className={cn.containerRow}>
  //         <div className={cn.containerLeft}>
  //           <div className={cn.label}>Memory GB</div>
  //           <CustomInput
  //             className={cn.rowPadding}
  //             label="Memory GB"
  //             type="number"
  //             value={memory}
  //             name="memory"
  //             onChange={e =>
  //               this.setState({ memory: e.target.value, changes: true })
  //             }
  //             inputStyles={{ input: cn.inputStyles }}
  //           />
  //         </div>
  //         <FormControl className={cn.containerMiddle}>
  //           <div className={cn.label}>Region Hint</div>
  //           <NativeSelect
  //             disabled={location !== 'empty'}
  //             value={region}
  //             onChange={e =>
  //               this.setState({ region: e.target.value, changes: true })
  //             }
  //             input={
  //               location !== 'empty' ? (
  //                 <BootstrapInputDisabled name="region" id="region" />
  //               ) : (
  //                 <BootstrapInput name="region" id="region" />
  //               )
  //             }
  //           >
  //             <option key="empty" value="empty" />
  //             {locations.map(item => (
  //               <option key={item.uuid} value={item.location_id}>
  //                 {item.location_name}
  //               </option>
  //             ))}
  //           </NativeSelect>
  //         </FormControl>
  //         <div className={cn.containerRight}>
  //           <div className={cn.label}>Success Text</div>
  //           {Number(method) === 2 ? (
  //             <CustomInput
  //               className={cn.rowPadding}
  //               label="Success Text"
  //               value={success}
  //               name="success"
  //               onChange={e =>
  //                 this.setState({ success: e.target.value, changes: true })
  //               }
  //               inputStyles={{
  //                 input: cn.inputStyles,
  //               }}
  //             />
  //           ) : (
  //             <CustomInputBack
  //               disabled
  //               className={cn.rowPadding}
  //               label="Success Text"
  //               value={success}
  //               name="success"
  //               onChange={e =>
  //                 this.setState({ success: e.target.value, changes: true })
  //               }
  //               inputStyles={{
  //                 input: cn.inputStyles,
  //               }}
  //             />
  //           )}
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  logout = () => {
    const { logoutUserProps, history } = this.props;
    logoutUserProps();
    localStorage.clear();
    history.push('/login');
  };

  insideContent = () => (
    <div className={cn.containerRow}>
      <div className={cn.padding}>
        <div className={cn.label}>Docker Image</div>
        <div className={cn.text}>cognitiv/umbro</div>
      </div>
      <div className={cn.padding}>
        <div className={cn.label}>Description</div>
        <div className={cn.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </div>
      <div className={cn.padding}>
        <div className={cn.label}>Startup command</div>
        <div className={cn.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </div>
      <div className={cn.row}>
        <div className={cn.rowFirst}>
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
        <div className={cn.rowSecond}>
          <div className={cn.textAlign}>
            <div className={cn.label}>Max Retries</div>
            <div className={cn.text}>0</div>
          </div>
          <div className={cn.textAlign}>
            <div className={cn.label}>Timeout</div>
            <div className={cn.text}>1 day</div>
          </div>
        </div>
        <div className={cn.elseRows}>
          <div className={cn.textAlign}>
            <div className={cn.label}>Location</div>
            <div className={cn.text}>us-east-1</div>
          </div>
        </div>
        <div className={cn.elseRows}>
          <div className={cn.textAlign}>
            <div className={cn.label}>Method</div>
            <div className={cn.text}>Auto</div>
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    const { hamburger, history, projects } = this.props;
    const { label, tab, changes, ignore } = this.state;
    const id = 1;
    let content = '';
    let contentInside = '';
    if (tab === 0) {
      // content = this.firstTab();
    }
    if (tab === 1) {
      content = this.secondTab();
      contentInside = this.insideContent();
    }
    if (tab === 2) {
      content = this.thirdTab();
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
                Lynx (Prod)
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
            <div className={cn.iconContainer}>
              <FontAwesomeIcon
                icon={['far', 'save']}
                color={changes ? 'orange' : '#818fa3'}
              />
            </div>
            <div className={cn.logout} onClick={this.logout}>
              <FontAwesomeIcon icon="sign-out-alt" color="#818fa3" />
            </div>
          </Toolbar>
        </CustomAppBar>
        <Paper className={cn.contentAlign}></Paper>
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
          {tab === 0 ||
            (tab === 1 && (
              <div className={cn.tabValue}>
                {tab === 1 ? contentInside : content}
              </div>
            ))}
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
});

const mapDispatchToProps = {
  getProjects: getProjectsAction,
  logoutUserProps: logoutUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobPage);
