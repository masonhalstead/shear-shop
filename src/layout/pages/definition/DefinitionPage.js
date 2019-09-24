import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  getJobDefinition as getJobDefinitionAction,
  editJobDefinition as editJobDefinitionAction,
  editDefinitionParams as editDefinitionParamsAction,
} from 'ducks/operators/job_definition';
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
import { Poper } from 'components/poper/Poper';
import { CustomAppBar } from 'components/app-bar/AppBar';
import { logoutUser, setLoading } from 'ducks/actions';
import CustomCheckbox from 'components/checkbox/Checkbox';
import {
  CustomInput,
  CustomInputTextArea,
  CustomInputBack,
} from 'components/material-input/CustomInput';
import {
  BootstrapInput,
  BootstrapInputDisabled,
} from 'components/bootsrap-input/BootstrapInput';
import { TableContainer } from 'components/table-view/TableContainer';
import { TableContent } from 'components/table-view/TableContent';
import classNames from 'classnames';
import cn from './Definition.module.scss';
import { configureColumns } from './columns';
import { configureColumnsOutput } from './outputColumns';

const tabStyle = {
  width: '300px',
  fontSize: 14,
  fontWeight: 400,
  minHeight: 44,
  textTransform: 'capitalize',
  borderBottom: '1px solid transparent',
  borderRight: '1px solid #cfd7e6',
};

class DefinitionPage extends PureComponent {
  static propTypes = {
    getJobDefinition: PropTypes.func,
    setLoadingAction: PropTypes.func,
    hamburger: PropTypes.object,
    projects: PropTypes.array,
    lookups: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
  };

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
    job_definition_name: '',
    docker_image: '',
    startup_command: '',
    description: '',
    cpu: '',
    timeout_seconds: '',
    location_id: 'empty',
    max_retries: '',
    gpu: '',
    memory_gb: '',
    region: 'empty',
    stdout_success_text: '',
    tab: 0,
    open: false,
    openEnv: false,
    index: 0,
    project: '',
    result_method_id: '',
    ignore: '',
    params: [
      {
        parameter_name: '',
        description: '',
      },
    ],
    data: [
      {
        parameter_name: '',
        parameter_direction_id: 1,
        reference_parameter_name: '',
        is_required: false,
        parameter_method_id: 1,
        reference: '',
        parameter_value: '',
        description: '',
        command_line_prefix: '',
        is_encrypted: false,
        command_line_assignment_char: '',
        command_line_escaped: '',
        command_line_ignore_name: '',
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
    const {
      getJobDefinition,
      setLoadingAction,
      location,
      lookups,
    } = this.props;
    const [, , , , definition_id] = location.pathname.split('/');

    try {
      await setLoadingAction(true);
      const result = await getJobDefinition(definition_id);
      const definition = result[0];
      const parameters = result[1];
      if (parameters.length > 0) {
        const input = parameters.filter(
          filter => filter.parameter_direction_id === 1,
        );
        const output = parameters.filter(
          filter => filter.parameter_direction_id === 2,
        );

        const params = input.map(parameter => ({
          ...parameter,
          // TODO clarification about reference_id and reference_type_id
          reference: parameter.reference_type_id,
        }));

        if (params.length > 0) {
          params.push({
            parameter_name: '',
            reference_parameter_name: '',
            parameter_direction_id: 1,
            is_required: false,
            parameter_method_id: 1,
            reference: '',
            parameter_value: '',
            description: '',
            command_line_prefix: '',
            is_encrypted: false,
            command_line_assignment_char: '',
            command_line_escaped: '',
            command_line_ignore_name: '',
          });
        }

        if (output.length > 0) {
          output.push({
            parameter_name: '',
            description: '',
          });
        }

        if (params.length > 0 && output.length > 0) {
          this.setState({ data: params, params: output });
        }
        if (params.length > 0 && output.length === 0) {
          this.setState({ data: params });
        }
        if (params.length === 0 && output.length > 0) {
          this.setState({ params: output });
        }
      }

      const region = lookups.locations.filter(
        filter => filter.location_name === definition.region_endpoint_hint,
      );

      this.setState({
        ...definition,
        timeout_seconds: new Date(definition.timeout_seconds * 1000)
          .toUTCString()
          .match(/(\d\d:\d\d)/)[0],
        region: region.length > 0 ? region[0].location_id : 'empty',
        location_id:
          definition.location_id === null ? 'empty' : definition.location_id,
      });
      await this.createColumns();
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
      newItems[index].parameter_name = value;
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
    this.setState({ params: result, changes: true, index: 0 });
  };

  deleteInputRow = index => {
    const { data } = this.state;
    const result = data.filter((item, indexNew) => indexNew !== index);
    this.setState({ data: result, changes: true, index: 0 });
  };

  changeReferenceParameter = referenceParameter => {
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems[this.state.index].reference_parameter_name = referenceParameter;
      return { data: newItems, parameter: referenceParameter, changes: true };
    });
  };

  handleClickOpen = (event, index) => {
    this.setState({
      open: true,
      index,
      anchorEl: this.state.anchorEl ? null : event.currentTarget,
    });
  };

  handleClickOpenMethod = (event, index) => {
    this.setState({
      openEnv: true,
      index,
      anchorElEnv: this.state.anchorElEnv ? null : event.currentTarget,
    });
  };

  addMoreParameters = () => {
    this.setState(prevState => {
      const newItems = [...prevState.params];
      newItems.push({
        parameter_name: '',
        description: '',
      });
      return { params: newItems, changes: true };
    });
  };

  addMNewRow = () => {
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems.push({
        parameter_name: '',
        parameter_direction_id: 1,
        reference_parameter_name: '',
        is_required: false,
        parameter_method_id: 1,
        reference: '',
        parameter_value: '',
        description: '',
        command_line_prefix: '',
        is_encrypted: false,
        command_line_assignment_char: '',
        id: newItems.length + 1,
      });
      return { data: newItems, changes: true };
    });
  };

  secondTab = () => (
    <TableContainer style={cn.tableContainerWrapper}>
      <TableContent
        tableData={this.state.data}
        tableOptions={this.options}
        columns={this.createColumns()}
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
                width: 79,
              },
              '&:nth-child(6)': {
                width: 79,
              },
              '&:nth-child(8)': {
                width: 139,
              },
              '&:nth-child(10)': {
                width: 139,
              },
              '&:nth-child(14)': {
                width: 29,
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

  saveName = (name, index) => {
    const { data } = this.state;
    if (data.length === index + 1) {
      this.addMNewRow();
    }
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems[index].parameter_name = name;
      return { data: newItems, changes: true };
    });
  };

  saveDefault = (defaultValue, index) => {
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems[index].parameter_value = defaultValue;
      return { data: newItems, changes: true };
    });
  };

  handleChangeMethod = defaultValue => {
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems[this.state.index].parameter_method_id = defaultValue;
      return { data: newItems, changes: true };
    });
  };

  saveDescription = (description, index) => {
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems[index].description = description;
      return { data: newItems, changes: true };
    });
  };

  changeRequired = index => {
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems[index].is_required = !newItems[index].is_required;
      return { data: newItems, changes: true };
    });
  };

  changeEnv = (name, value) => {
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems[this.state.index][name] = value;
      return { data: newItems, changes: true };
    });
  };

  saveDefinition = async () => {
    const {
      job_definition_name,
      description,
      docker_image,
      result_method_id,
      startup_command,
      timeout_seconds,
      stdout_success_text,
      region,
      cpu,
      gpu,
      max_retries,
      memory_gb,
      data,
      params,
      location_id,
    } = this.state;
    const {
      editJobDefinition,
      location,
      lookups,
      editDefinitionParams,
    } = this.props;
    const [, , , , definition_id] = location.pathname.split('/');
    const timeOut = timeout_seconds.split(':');

    const dataForApi = {
      job_definition_name,
      description,
      docker_image,
      result_method_id,
      startup_command,
      timeout_seconds: Number(timeOut[0]) * 3600 + Number(timeOut[1] * 60),
      stdout_success_text,
      region_endpoint_hint:
        region !== 'empty'
          ? lookups.locations.filter(
              filter => filter.location_id === Number(region),
            )[0].location_name
          : 'empty',
      location_id: location_id === 'empty' ? null : location_id,
      cpu,
      gpu,
      max_retries,
      memory_gb,
    };
    await editJobDefinition(dataForApi, definition_id);

    const filteredData = data.filter(
      filter => filter.parameter_name.length > 1,
    );
    if (filteredData.length > 0) {
      filteredData.forEach(parameter => {
        delete parameter['owner_id'];
        const keys = Object.keys(parameter);
        keys.forEach(async key => {
          console.log(key);
          await editDefinitionParams(
            {
              [key]: parameter[key],
              parameter_method_id: parameter.parameter_method_id,
              parameter_direction_id: parameter.parameter_direction_id,
              parameter_name: parameter.parameter_name,
            },
            definition_id,
          );
        });
      });
    }

    const filteredDataOutput = params.filter(
      filter => filter.parameter_name.length > 1,
    );
    if (filteredDataOutput.length > 0) {
      filteredDataOutput.forEach(parameter => {
        const keys = Object.keys(parameter);
        keys.forEach(async key => {
          await editDefinitionParams({ [key]: parameter[key] }, definition_id);
        });
      });
    }
  };

  thirdTab = () => (
    <TableContainer style={cn.tableContainerWrapper}>
      <TableContent
        tableData={this.state.params}
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
              padding: '2.5px !important',
              '&:nth-child(2)': {
                width: 189,
              },
              '&:nth-child(6)': {
                width: 29,
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

  createColumns = () =>
    configureColumns(
      this.saveName,
      this.changeRequired,
      this.saveDefault,
      this.saveDescription,
      this.handleClickOpen,
      this.deleteInputRow,
      this.handleClickOpenMethod,
    );

  createColumnsOutput = () =>
    configureColumnsOutput(
      this.changeName,
      this.changeDescription,
      this.deleteOutputRow,
    );

  firstTab = () => {
    const {
      cpu,
      timeout_seconds,
      max_retries,
      location_id,
      gpu,
      result_method_id,
      region,
      memory_gb,
      stdout_success_text,
    } = this.state;
    const {
      lookups: { locations, result_methods },
    } = this.props;

    return (
      <>
        <div className={cn.containerRow}>
          <div className={cn.containerLeft}>
            <div className={cn.label}>CPU</div>
            <CustomInput
              className={cn.rowPadding}
              type="number"
              label="CPU"
              value={cpu}
              name="cpu"
              onChange={e =>
                this.setState({ cpu: e.target.value, changes: true })
              }
              inputStyles={{ input: cn.inputStyles }}
            />
          </div>
          <div className={cn.containerMiddle}>
            <div className={cn.label}>Timeout</div>
            <CustomInput
              type="time"
              className={cn.rowPadding}
              label="Timeout"
              value={timeout_seconds}
              name="timeout"
              onChange={e =>
                this.setState({
                  timeout_seconds: e.target.value,
                  changes: true,
                })
              }
              inputStyles={{ input: cn.inputStyles }}
            />
          </div>
          <div className={cn.containerRight}>
            <div className={cn.label}>Max Retries</div>
            <CustomInput
              className={cn.rowPadding}
              type="number"
              label="Max Retries"
              value={max_retries}
              name="retries"
              onChange={e =>
                this.setState({ max_retries: e.target.value, changes: true })
              }
              inputStyles={{ input: cn.inputStyles }}
            />
          </div>
        </div>
        <div className={cn.containerRow}>
          <div className={cn.containerLeft}>
            <div className={cn.label}>GPU</div>
            <CustomInput
              className={cn.rowPadding}
              label="GPU"
              type="number"
              value={gpu}
              name="gpu"
              onChange={e =>
                this.setState({ gpu: e.target.value, changes: true })
              }
              inputStyles={{ input: cn.inputStyles }}
            />
          </div>
          <FormControl className={cn.containerMiddle}>
            <div className={cn.label}>Location</div>
            <NativeSelect
              disabled={region !== 'empty'}
              value={location_id}
              onChange={e =>
                this.setState({ location_id: e.target.value, changes: true })
              }
              input={
                region !== 'empty' ? (
                  <BootstrapInputDisabled name="location" id="location" />
                ) : (
                  <BootstrapInput name="location" id="location" />
                )
              }
            >
              <option key="empty" value="empty" />
              {locations.map(item => (
                <option key={item.uuid} value={item.location_id}>
                  {item.location_name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl className={cn.containerRight}>
            <div className={cn.label}>Result Method</div>
            <NativeSelect
              value={result_method_id}
              onChange={e =>
                this.setState({
                  result_method_id: e.target.value,
                  changes: true,
                })
              }
              input={<BootstrapInput name="method" id="method" />}
            >
              <option key="empty" value="empty" />
              {result_methods.map(item => (
                <option key={item.uuid} value={item.result_method_id}>
                  {item.result_method_name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
        <div className={cn.containerRow}>
          <div className={cn.containerLeft}>
            <div className={cn.label}>Memory GB</div>
            <CustomInput
              className={cn.rowPadding}
              label="Memory GB"
              type="number"
              value={memory_gb}
              name="memory"
              onChange={e =>
                this.setState({ memory_gb: e.target.value, changes: true })
              }
              inputStyles={{ input: cn.inputStyles }}
            />
          </div>
          <FormControl className={cn.containerMiddle}>
            <div className={cn.label}>Region Hint</div>
            <NativeSelect
              disabled={location_id !== 'empty'}
              value={region}
              onChange={e =>
                this.setState({ region: e.target.value, changes: true })
              }
              input={
                location_id !== 'empty' ? (
                  <BootstrapInputDisabled name="region" id="region" />
                ) : (
                  <BootstrapInput name="region" id="region" />
                )
              }
            >
              <option key="empty" value="empty" />
              {locations.map(item => (
                <option key={item.uuid} value={item.location_id}>
                  {item.location_name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <div className={cn.containerRight}>
            <div className={cn.label}>Success Text</div>
            {Number(result_method_id) === 2 ? (
              <CustomInput
                className={cn.rowPadding}
                label="Success Text"
                value={stdout_success_text}
                name="success"
                onChange={e =>
                  this.setState({
                    stdout_success_text: e.target.value,
                    changes: true,
                  })
                }
                inputStyles={{
                  input: cn.inputStyles,
                }}
              />
            ) : (
              <CustomInputBack
                disabled
                className={cn.rowPadding}
                label="Success Text"
                value={stdout_success_text}
                name="success"
                onChange={e =>
                  this.setState({
                    stdout_success_text: e.target.value,
                    changes: true,
                  })
                }
                inputStyles={{
                  input: cn.inputStyles,
                }}
              />
            )}
          </div>
        </div>
      </>
    );
  };

  handleChangeProject = reference => {
    this.setState(prevState => {
      const newItems = [...prevState.data];
      newItems[this.state.index].reference = 'Reference Added';
      return { data: newItems, project: reference, changes: true };
    });
  };

  logout = () => {
    const { logoutUserProps, history } = this.props;
    logoutUserProps();
    localStorage.clear();
    history.push('/login');
  };

  getWidth = () => {
    if (Number(this.state.data[this.state.index].parameter_method_id) === 2) {
      return { width: 300 };
    }

    return { width: 200 };
  };

  render() {
    const { hamburger, history, projects } = this.props;
    const {
      job_definition_name,
      docker_image,
      startup_command,
      description,
      tab,
      open,
      project,
      changes,
      anchorEl,
      anchorElEnv,
      openEnv,
      ignore,
    } = this.state;
    const id = 1;
    let content = '';
    if (tab === 0) {
      content = this.firstTab();
    }
    if (tab === 1) {
      content = this.secondTab();
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
                className={cn.text}
                onClick={() => {
                  history.push(`/projects`);
                }}
              >
                Lynx (Prod)
              </div>
              <div
                className={cn.text}
                onClick={() => {
                  history.push(`/projects/${id}/definitions/unarchived`);
                }}
              >
                Job Definitions
              </div>
              <div>{job_definition_name}</div>
            </Breadcrumbs>
            <div className={cn.flex} />
            <div className={cn.iconContainer} onClick={this.saveDefinition}>
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
        <Paper className={cn.contentAlign}>
          <div className={cn.containerRow}>
            <div className={classNames(cn.container, cn.inputSmall)}>
              <div className={cn.label}>Job Definition</div>
              <CustomInput
                label="Job Definition"
                value={job_definition_name}
                name="definitionName"
                onChange={e =>
                  this.setState({
                    job_definition_name: e.target.value,
                    changes: true,
                  })
                }
                inputStyles={{ input: cn.inputStyles }}
              />
            </div>
            <div className={classNames(cn.containerLast, cn.inputMedium)}>
              <div className={cn.label}>Docker Image</div>
              <CustomInput
                label="Docker Image"
                value={docker_image}
                name="dockerImage"
                onChange={e =>
                  this.setState({ docker_image: e.target.value, changes: true })
                }
                inputStyles={{ input: cn.inputStyles }}
              />
            </div>
          </div>
          <div className={cn.containerLast}>
            <div className={cn.label}>Startup Command</div>
            <CustomInputTextArea
              multiline
              label="Startup Command"
              value={startup_command}
              name="startupCommand"
              onChange={e =>
                this.setState({
                  startup_command: e.target.value,
                  changes: true,
                })
              }
              inputStyles={{ input: cn.inputStyles }}
              className={cn.top}
            />
          </div>
          <div className={classNames(cn.containerLast, cn.topItem)}>
            <div className={cn.label}>Description</div>
            <CustomInputTextArea
              multiline
              label="Description"
              value={description}
              name="description"
              onChange={e =>
                this.setState({ description: e.target.value, changes: true })
              }
              inputStyles={{ input: cn.inputStyles }}
              className={cn.top}
            />
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
              label="Configurations"
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
          </Tabs>
          {tab === 0 && <div className={cn.tabValue}>{content}</div>}
          {tab !== 0 && <div className={cn.tabValueAlt}>{content}</div>}
        </Paper>
        <Poper
          open={open}
          anchorEl={anchorEl}
          clickAway={() => this.setState({ open: false, anchorEl: null })}
        >
          <Paper>
            <div className={cn.formWrapper}>
              <div className={cn.label}>Project</div>
              <NativeSelect
                style={{ width: '225px', marginBottom: '10px' }}
                value={project}
                onChange={e => this.handleChangeProject(e.target.value)}
                input={<BootstrapInput name="project" id="project" />}
              >
                <option value="" />
                {projects.map(project => (
                  <option value={project.project_id}>
                    {project.project_name}
                  </option>
                ))}
              </NativeSelect>
              <CustomInput
                placeholder="Parameter Name"
                value={
                  this.state.data[this.state.index].reference_parameter_name
                }
                name="referenceParameter"
                onChange={e => this.changeReferenceParameter(e.target.value)}
                inputStyles={{ input: cn.inputStyles }}
              />
            </div>
          </Paper>
        </Poper>
        <Poper
          open={openEnv}
          anchorEl={anchorElEnv}
          clickAway={() => this.setState({ openEnv: false, anchorElEnv: null })}
        >
          <Paper>
            <div className={cn.formWrapper} style={this.getWidth()}>
              <div className={cn.label}>Environment Variable</div>
              <NativeSelect
                style={{ ...this.getWidth(), marginBottom: '10px' }}
                value={this.state.data[this.state.index].parameter_method_id}
                onChange={e => this.handleChangeMethod(e.target.value)}
                input={<BootstrapInput name="method" id="method" />}
              >
                <option value="" />
                <option value={1}>Command Line</option>
                <option value={2}>Environment Variable</option>
              </NativeSelect>
              {Number(this.state.data[this.state.index].parameter_method_id) ===
                1 && (
                <CustomCheckbox
                  onChange={e => this.changeEnv('is_encrypted', e)}
                  checked={this.state.data[this.state.index].is_encrypted}
                  label="Encrypted"
                />
              )}
              {Number(this.state.data[this.state.index].parameter_method_id) ===
                2 && (
                <>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <CustomInput
                        placeholder="Prefix"
                        value={
                          this.state.data[this.state.index].command_line_prefix
                        }
                        name="prefix"
                        onChange={e =>
                          this.changeEnv('command_line_prefix', e.target.value)
                        }
                        inputStyles={{ input: cn.inputStyles }}
                      />
                    </div>
                    <div>
                      <CustomInput
                        placeholder="Assignment"
                        value={
                          this.state.data[this.state.index]
                            .command_line_assignment_char
                        }
                        name="assignment"
                        onChange={e =>
                          this.changeEnv(
                            'command_line_assignment_char',
                            e.target.value,
                          )
                        }
                        inputStyles={{ input: cn.inputStyles }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}
                  >
                    <div>
                      <CustomCheckbox
                        onChange={value =>
                          this.changeEnv('command_line_escaped', value)
                        }
                        checked={
                          this.state.data[this.state.index].command_line_escaped
                        }
                        label="Escaped"
                      />
                    </div>
                    <div style={{ width: '46%' }}>
                      <CustomCheckbox
                        onChange={value =>
                          this.changeEnv('command_line_ignore_name', value)
                        }
                        checked={
                          this.state.data[this.state.index]
                            .command_line_ignore_name
                        }
                        label="Ignore Name"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </Paper>
        </Poper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  hamburger: state.hamburger,
  lookups: state.lookups,
  projects: state.projects,
  parameters: state.parameters,
});

const mapDispatchToProps = {
  getJobDefinition: getJobDefinitionAction,
  editJobDefinition: editJobDefinitionAction,
  editDefinitionParams: editDefinitionParamsAction,
  logoutUserProps: logoutUser,
  setLoadingAction: setLoading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionPage);
