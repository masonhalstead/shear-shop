import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, setLoading } from 'ducks/actions';
import {
  getJobDefinition as getJobDefinitionAction,
  editDefinition as editDefinitionProps,
} from 'ducks/operators/job_definition';
import {
  editParameters as editParametersProps,
  saveParameters as saveParametersProps,
} from 'ducks/operators/parameters';
import { handleError } from 'ducks/operators/settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Sentry from '@sentry/browser';
import { Toolbar, Breadcrumbs, Paper, NativeSelect } from '@material-ui/core';
import { Poper } from 'components/poper/Poper';
import { CustomAppBar } from 'components/app-bar/AppBar';
import CustomCheckbox from 'components/checkbox/Checkbox';
import { CustomInput } from 'components/material-input/CustomInput';
import { BootstrapInput } from 'components/bootsrap-input/BootstrapInput';
import uuid from 'uuid';
import { DefinitionBlock } from './DefinitionBlock';
import { DefinitionTabs } from './DefinitionTabs';
import { ConfigTab } from './ConfigTab';
import { InputsTab } from './InputsTab';
import { OutputsTab } from './OutputsTab';
import cn from './Definition.module.scss';

class DefinitionPage extends PureComponent {
  static propTypes = {
    getJobDefinition: PropTypes.func,
    setLoadingAction: PropTypes.func,
    editDefinition: PropTypes.func,
    handleErrorProps: PropTypes.func,
    editParameters: PropTypes.func,
    saveParameters: PropTypes.func,
    logoutUserProps: PropTypes.func,
    hamburger: PropTypes.object,
    job_definition: PropTypes.object,
    projects: PropTypes.array,
    parameters: PropTypes.array,
    locations: PropTypes.array,
    history: PropTypes.object,
    location: PropTypes.object,
  };

  state = {
    description: '',
    cpu: '',
    timeout: '',
    location_id: 'empty',
    max_retries: '',
    gpu: '',
    memory_gb: '',
    region: 'empty',
    stdout_success_text: '',
    tab: 0,
    open: false,
    openEnv: false,
    row_id: null,
    project: '',
    result_method_id: '',
    project_id: null,
    changes: false,
    anchorEl: null,
    anchorElEnv: null,
    parameters: [],
    callbacks: {
      saveName: (value, id) => this.saveName(value, id),
      changeRequired: id => this.changeRequired(id),
      saveDefault: (value, id) => this.saveDefault(value, id),
      saveDescription: (value, id) => this.saveDescription(value, id),
      handleOpenRef: (value, id) => this.handleOpenRef(value, id),
      deleteRow: id => this.deleteRow(id),
      handleOpenMethod: (value, id) => this.handleOpenMethod(value, id),
    },
  };

  static getDerivedStateFromProps(props, state) {
    const { job_definition, parameters } = props;
    const { job_definition_id } = state;
    if (job_definition.job_definition_id !== job_definition_id) {
      return {
        ...job_definition,
        parameters: [
          ...parameters,
          {
            parameter_name: '',
            description: '',
            parameter_direction_id: 1,
            parameter_method_id: 1,
            modified: false,
            saved: false,
            uuid: uuid.v1(),
          },
          {
            parameter_name: '',
            description: '',
            parameter_direction_id: 2,
            parameter_method_id: 1,
            modified: false,
            saved: false,
            uuid: uuid.v1(),
          },
        ],
      };
    }
    return null;
  }

  componentDidMount() {
    this.setInitialData();
  }

  componentWillUnmount() {
    this.setState({
      changes: false,
      row_id: null,
      open: false,
      openEnv: false,
    });
  }

  handleChangeTab = (e, value) => {
    this.setState({ tab: value });
  };

  handleDefinitionBlock = input => {
    this.setState({ ...input, changes: true });
  };

  handleDefinitionTabs = input => {
    this.setState({ ...input, changes: true });
  };

  saveName = (name, id) => {
    const { parameters } = this.state;
    const index = parameters.findIndex(parameter => parameter.uuid === id);
    parameters[index] = {
      ...parameters[index],
      parameter_name: name,
      modified: true,
    };
    this.setState(
      {
        parameters: [...parameters],
        changes: true,
      },
      () => this.handleRowManagement(),
    );
  };

  changeRequired = id => {
    const { parameters } = this.state;
    const index = parameters.findIndex(parameter => parameter.uuid === id);
    parameters[index] = {
      ...parameters[index],
      is_required: !parameters[index].is_required,
      modified: true,
    };
    this.setState(
      {
        parameters: [...parameters],
        changes: true,
      },
      () => this.handleRowManagement(),
    );
  };

  handleOpenMethod = (event, id) => {
    const { anchorElEnv } = this.state;
    this.setState({
      openEnv: true,
      row_id: id,
      anchorElEnv: anchorElEnv ? null : event.currentTarget,
    });
  };

  handleOpenRef = (event, id) => {
    const { anchorEl } = this.state;
    this.setState({
      open: true,
      row_id: id,
      anchorEl: anchorEl ? null : event.currentTarget,
    });
  };

  changeReferenceParameter = reference_parameter_name => {
    const { row_id, parameters } = this.state;
    const index = parameters.findIndex(parameter => parameter.uuid === row_id);
    parameters[index] = {
      ...parameters[index],
      reference_parameter_name,
      modified: true,
    };
    this.setState(
      {
        parameters: [...parameters],
        changes: true,
      },
      () => this.handleRowManagement(),
    );
  };

  handleChangeMethod = parameter_method_id => {
    const { row_id, parameters } = this.state;
    const index = parameters.findIndex(parameter => parameter.uuid === row_id);
    parameters[index] = {
      ...parameters[index],
      parameter_method_id,
      modified: true,
    };
    this.setState(
      {
        parameters: [...parameters],
        changes: true,
        result_method_id: parameter_method_id,
      },
      () => this.handleRowManagement(),
    );
  };

  changeEnv = (name, value) => {
    const { row_id, parameters } = this.state;
    const index = parameters.findIndex(parameter => parameter.uuid === row_id);
    parameters[index] = {
      ...parameters[index],
      [name]: value,
      modified: true,
    };
    this.setState(
      {
        parameters: [...parameters],
        changes: true,
      },
      () => this.handleRowManagement(),
    );
  };

  handleChangeProject = reference => {
    const { row_id, parameters } = this.state;
    const index = parameters.findIndex(parameter => parameter.uuid === row_id);
    parameters[index] = {
      ...parameters[index],
      reference: 'Reference Added',
      modified: true,
    };
    this.setState(
      {
        parameters: [...parameters],
        changes: true,
        project: reference,
      },
      () => this.handleRowManagement(),
    );
  };

  saveDefault = (value, id) => {
    const { parameters } = this.state;
    const index = parameters.findIndex(parameter => parameter.uuid === id);
    parameters[index] = {
      ...parameters[index],
      parameter_value: value,
      modified: true,
    };
    this.setState(
      {
        parameters: [...parameters],
        changes: true,
      },
      () => this.handleRowManagement(),
    );
  };

  saveDescription = (value, id) => {
    const { parameters } = this.state;
    const index = parameters.findIndex(parameter => parameter.uuid === id);
    parameters[index] = {
      ...parameters[index],
      description: value,
      modified: true,
    };
    this.setState(
      {
        parameters: [...parameters],
        changes: true,
      },
      () => this.handleRowManagement(),
    );
  };

  deleteRow = id => {
    const { parameters } = this.state;
    const index = parameters.findIndex(parameter => parameter.uuid === id);
    parameters.splice(index, 1);
    this.setState(
      {
        parameters: [...parameters],
        changes: true,
        row_id: null,
      },
      () => this.handleRowManagement(),
    );
  };

  handleRowManagement = () => {
    const { parameters } = this.state;

    const inputs = parameters.filter(
      p => p.parameter_direction_id === 1 && p.modified === false,
    );
    const outputs = parameters.filter(
      p => p.parameter_direction_id === 2 && p.modified === false,
    );

    if (inputs.length === 0) {
      this.configNewRow(1);
    }
    if (outputs.length === 0) {
      this.configNewRow(2);
    }
  };

  configNewRow = direction_id => {
    const { parameters } = this.state;
    const new_row = {
      parameter_name: '',
      description: '',
      parameter_direction_id: direction_id,
      modified: false,
      uuid: uuid.v1(),
    };
    parameters.push(new_row);
    this.setState({
      parameters: [...parameters],
    });
  };

  setInitialData = async () => {
    const { getJobDefinition, setLoadingAction, location } = this.props;
    const [, , , , definition_id] = location.pathname.split('/');

    try {
      await setLoadingAction(true);
      await getJobDefinition(definition_id);
    } catch (err) {
      // Only fires if the server is off line or the body isnt set correctly
      Sentry.captureException(err);
    }
    setLoadingAction(false);
  };

  saveDefinition = async () => {
    const {
      job_definition_name,
      description,
      docker_image,
      result_method_id,
      startup_command,
      timeout,
      stdout_success_text,
      region,
      cpu,
      gpu,
      max_retries,
      memory_gb,
      data,
      parameters,
      location_id,
    } = this.state;
    const {
      editDefinition,
      getJobDefinition,
      setLoadingAction,
      handleErrorProps,
      job_definition,
      locations,
      saveParameters,
      editParameters,
    } = this.props;

    const { job_definition_id } = job_definition;
    const timeOut = timeout.split(':');

    const post_data = {
      job_definition_name,
      description,
      docker_image,
      result_method_id,
      startup_command,
      timeout_seconds: Number(timeOut[0]) * 3600 + Number(timeOut[1] * 60),
      stdout_success_text,
      region_endpoint_hint:
        region !== 'empty'
          ? locations.filter(
          filter => filter.location_id === Number(region),
          )[0].location_name
          : 'empty',
      location_id: location_id === 'empty' ? null : location_id,
      cpu,
      gpu,
      max_retries,
      memory_gb,
    };

    try {
      await setLoadingAction(true);
      await editParameters(parameters, job_definition_id);
      await saveParameters(parameters, job_definition_id);
      await editDefinition(post_data, job_definition_id);
      await getJobDefinition(job_definition_id);
    } catch (err) {
      handleErrorProps(err, data);
    }
    setLoadingAction(false);
  };

  logout = () => {
    const { logoutUserProps, history } = this.props;
    logoutUserProps();
    localStorage.clear();
    history.push('/login');
  };

  render() {
    const { hamburger, history, projects, job_definition } = this.props;
    const {
      changes,
      job_definition_name,
      docker_image,
      startup_command,
      description,
      cpu,
      timeout,
      max_retries,
      gpu,
      stdout_success_text,
      location_id,
      result_method_id,
      region,
      memory_gb,
      parameters,
      callbacks,
      tab,
      project,
      openEnv,
      open,
      anchorElEnv,
      anchorEl,
      row_id,
      project_id,
    } = this.state;

    const row = parameters.find(parameter => parameter.uuid === row_id);
    const selected_row = row || {};
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
                  history.push(
                    `/projects/${project_id}/definitions/unarchived`,
                  );
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
        <DefinitionBlock
          job_definition_name={job_definition_name}
          docker_image={docker_image}
          startup_command={startup_command}
          description={description}
          handleDefinitionBlock={this.handleDefinitionBlock}
        />
        <DefinitionTabs
          job_definition={this.state}
          handleChangeTab={this.handleChangeTab}
          tab={tab}
          handleDefinitionTabs={this.handleDefinitionTabs}
        >
          {tab === 0 && (
            <ConfigTab
              cpu={cpu}
              timeout={timeout}
              max_retries={max_retries}
              gpu={gpu}
              stdout_success_text={stdout_success_text}
              location={location_id}
              result_method_id={result_method_id}
              region={region}
              memory_gb={memory_gb}
              handleDefinitionTabs={this.handleDefinitionTabs}
            />
          )}
          {tab === 1 && (
            <InputsTab
              callbacks={callbacks}
              parameters={parameters.filter(
                parameter => parameter.parameter_direction_id === 1,
              )}
            />
          )}
          {tab === 2 && (
            <OutputsTab
              callbacks={callbacks}
              parameters={parameters.filter(
                parameter => parameter.parameter_direction_id === 2,
              )}
            />
          )}
        </DefinitionTabs>
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
                {projects.map(item => (
                  <option value={item.project_id} key={item.uuid}>
                    {item.project_name}
                  </option>
                ))}
              </NativeSelect>
              <CustomInput
                placeholder="Parameter Name"
                value={selected_row.reference_parameter_name}
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
            <div className={cn.formWrapper} style={{ width: 300 }}>
              <div className={cn.label}>Environment Variable</div>
              <NativeSelect
                style={{ width: 300, marginBottom: '10px' }}
                value={selected_row.parameter_method_id}
                onChange={e => this.handleChangeMethod(e.target.value)}
                input={
                  <BootstrapInput
                    name="parameter_method_id"
                    id="parameter_method_id"
                  />
                }
              >
                <option value="" />
                <option value={1}>Command Line</option>
                <option value={2}>Environment Variable</option>
              </NativeSelect>
              {Number(selected_row.parameter_method_id) === 1 && (
                <CustomCheckbox
                  onChange={value => this.changeEnv('is_encrypted', value)}
                  checked={selected_row.is_encrypted}
                  label="Encrypted"
                />
              )}
              {Number(selected_row.parameter_method_id) === 2 && (
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
                        value={selected_row.command_line_prefix}
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
                        value={selected_row.command_line_assignment_char}
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
                        checked={selected_row.command_line_escaped}
                        label="Escaped"
                      />
                    </div>
                    <div style={{ width: '46%' }}>
                      <CustomCheckbox
                        onChange={value =>
                          this.changeEnv('command_line_ignore_name', value)
                        }
                        checked={selected_row.command_line_ignore_name}
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
  locations: state.lookups.locations,
  projects: state.projects,
  parameters: state.parameters,
  job_definition: state.job_definition,
});

const mapDispatchToProps = {
  getJobDefinition: getJobDefinitionAction,
  editDefinition: editDefinitionProps,
  editParameters: editParametersProps,
  saveParameters: saveParametersProps,
  logoutUserProps: logoutUser,
  setLoadingAction: setLoading,
  handleErrorProps: handleError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionPage);
