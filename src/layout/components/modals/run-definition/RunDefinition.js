import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { CustomizedDialogs } from 'components/modal/CustomModal';
import uuid from 'uuid';
import { getDefinitionConfig as getDefinitionConfigAction } from 'ducks/operators/definition';
import { addJob as addJobAction } from 'ducks/operators/job';
import {
  setLoading,
  toggleModal,
  clearDefinition,
  clearParameters,
} from 'ducks/actions';
import { handleError } from 'ducks/operators/settings';
import { connect } from 'react-redux';
import { postData } from 'utils/axios';
import { DefinitionBlock } from './DefinitonBlock';
import { ParametersTable } from './ParametersTable';
import { AdditionalParametersTable } from './AdditionalParametersTable';
import cn from './RunDefinition.module.scss';

class ConnectedRunDefinition extends PureComponent {
  static propTypes = {
    toggleModalAction: PropTypes.func,
    clearDefinitionAction: PropTypes.func,
    clearParametersAction: PropTypes.func,
    handleErrorProps: PropTypes.func,
    setLoadingAction: PropTypes.func,
    run_definition: PropTypes.bool,
    definition: PropTypes.object,
    parameters: PropTypes.array,
    locations: PropTypes.array,
  };

  static getDerivedStateFromProps(props, state) {
    const { definition, parameters } = props;
    const { job_definition_id } = state;

    if (definition.job_definition_id !== job_definition_id) {
      return {
        ...definition,
        parameters: [...parameters],
      };
    }
    return null;
  }

  state = {
    docker_image: '',
    startup_command: '',
    cpu: '',
    gpu: '',
    memory_gb: '',
    timeout: '',
    location_id: 'empty',
    region: 'empty',
    batch_description: '',
    batch_id: '',
    parameters: [],
    additionalParameters: [
      {
        parameter_name: '',
        parameter_direction_id: 1,
        parameter_method_id: 1,
        parameter_value: '',
        is_required: false,
        is_encrypted: false,
        description: null,
        command_line_prefix: null,
        command_line_assignment_char: null,
        command_line_escaped: null,
        command_line_ignore_name: null,
        reference_type_id: null,
        reference_id: null,
        reference_parameter_name: null,
        modified: false,
        uuid: uuid.v1(),
      },
    ],
    callbacks: {
      saveDefault: (value, id) => this.saveDefault(value, id),
      saveKey: (value, id) => this.saveKey(value, id),
      saveValue: (value, id) => this.saveValue(value, id),
      deleteRow: id => this.deleteRow(id),
    },
  };

  saveDefault = (row, value) => {
    const { parameters } = this.state;
    const index = parameters.findIndex(
      parameter => parameter.uuid === row.uuid,
    );
    parameters[index] = {
      ...parameters[index],
      parameter_value: value,
      modified: true,
    };
    this.setState({
      parameters: [...parameters],
    });
  };

  saveValue = (row, value) => {
    const { additionalParameters } = this.state;
    const index = additionalParameters.findIndex(
      parameter => parameter.uuid === row.uuid,
    );
    additionalParameters[index] = {
      ...additionalParameters[index],
      parameter_value: value,
      modified: true,
    };
    this.setState(
      {
        additionalParameters: [...additionalParameters],
      },
      () => this.handleRowManagement(),
    );
  };

  saveKey = (row, value) => {
    const { additionalParameters } = this.state;
    const index = additionalParameters.findIndex(
      parameter => parameter.uuid === row.uuid,
    );
    additionalParameters[index] = {
      ...additionalParameters[index],
      parameter_name: value.trim(),
      modified: true,
    };
    this.setState(
      {
        additionalParameters: [...additionalParameters],
      },
      () => this.handleRowManagement(),
    );
  };

  handleRowManagement = () => {
    const { additionalParameters } = this.state;

    const inputs = additionalParameters.filter(p => p.modified === false);

    if (inputs.length === 0) {
      this.configNewRow();
    }
  };

  configNewRow = () => {
    const { additionalParameters } = this.state;
    const new_row = {
      parameter_name: '',
      parameter_direction_id: 1,
      parameter_method_id: 1,
      parameter_value: '',
      modified: false,
      uuid: uuid.v1(),
    };
    additionalParameters.push(new_row);
    this.setState({
      additionalParameters: [...additionalParameters],
    });
  };

  deleteRow = row => {
    const { additionalParameters } = this.state;
    const index = additionalParameters.findIndex(
      parameter => parameter.uuid === row.uuid,
    );
    additionalParameters.splice(index, 1);
    this.setState({ additionalParameters: [...additionalParameters] }, () =>
      this.handleRowManagement(),
    );
  };

  handleSubmit = async () => {
    const {
      project_id,
      description,
      job_definition_id,
      docker_image,
      startup_command,
      cpu,
      gpu,
      memory_gb,
      storage_gb,
      timeout_seconds,
      region_endpoint_hint,
      result_method_id,
      stdout_success_text,
      max_retries,
      location_id,
      parameters,
      additionalParameters,
    } = this.state;
    const { handleErrorProps, setLoadingAction } = this.props;

    const data = {
      project_id,
      batch_id: null,
      batch_descriptor: null,
      description,
      job_definition_id,
      docker_image,
      startup_command,
      required_cpu: cpu,
      required_gpu: gpu,
      required_memory_gb: memory_gb,
      required_storage_gb: storage_gb,
      timeout_seconds,
      region_endpoint_hint,
      result_method_id,
      stdout_success_text,
      max_retries,
      location_id,
      depends_on: [],
      input_file_id_list: [],
      output_file_id_list: [],
      parameters: this.handleParametersFormat([
        ...parameters,
        ...additionalParameters,
      ]),
    };

    setLoadingAction(true);
    try {
      await postData('/jobs/create', data);
    } catch (err) {
      handleErrorProps(err, data);
    }
    setLoadingAction(false);
  };

  handleParametersFormat = (params = []) =>
    params
      .filter(param => !!param.parameter_name)
      .map(param => ({
        parameter_name: param.parameter_name,
        parameter_direction_id: param.parameter_direction_id,
        parameter_method_id: param.parameter_method_id,
        is_required: param.is_required,
        is_encrypted: param.is_encrypted,
        parameter_value: param.parameter_value,
        description: param.description,
        command_line_prefix: param.command_line_prefix,
        command_line_assignment_char: param.command_line_assignment_char,
        command_line_escaped: param.command_line_escaped,
        command_line_ignore_name: param.command_line_ignore_name,
        reference_type_id: param.reference_type_id,
        reference_id: param.reference_id,
        reference_parameter_name: param.reference_parameter_name,
      }));

  handleDefinitionBlock = input => {
    this.setState({ ...input });
  };

  handleOnSelectLocation = item => {
    if (item.location_id === null) {
      this.setState({
        location_id: null,
        location_name: '',
      });
      return;
    }
    this.setState({
      location_id: item.location_id,
      location_name: item.location_name,
      region_endpoint_hint: null,
    });
  };

  handleOnSelectRegion = item => {
    if (item.location_id === null) {
      this.setState({ region_endpoint_hint: null });
      return;
    }
    this.setState({
      location_id: null,
      location_name: null,
      region_endpoint_hint: item.location_name,
    });
  };

  handleModalClose = () => {
    const {
      toggleModalAction,
      clearDefinitionAction,
      clearParametersAction,
    } = this.props;

    clearDefinitionAction();
    clearParametersAction();
    toggleModalAction({ run_definition: false });
  };

  render() {
    const { run_definition, definition, locations } = this.props;
    const {
      docker_image,
      startup_command,
      cpu,
      gpu,
      memory_gb,
      timeout,
      location_id,
      region,
      batch_id,
      batch_description,
      parameters,
      callbacks,
      additionalParameters,
      location_name,
      region_endpoint_hint,
    } = this.state;
    return (
      <CustomizedDialogs
        open={run_definition}
        handleClose={this.handleModalClose}
        handleSubmit={this.handleSubmit}
        title={definition.job_definition_name}
        description={definition.description}
      >
        <DefinitionBlock
          docker_image={docker_image}
          startup_command={startup_command}
          cpu={cpu}
          gpu={gpu}
          memory_gb={memory_gb}
          timeout={timeout}
          locations={locations}
          location_id={location_id}
          region={region}
          batch_id={batch_id}
          region_endpoint_hint={region_endpoint_hint}
          location_name={location_name}
          batch_description={batch_description}
          handleDefinitionBlock={this.handleDefinitionBlock}
          handleOnSelectLocation={this.handleOnSelectLocation}
          handleOnSelectRegion={this.handleOnSelectRegion}
        />
        <p className={cn.parameterTitle}>Parameters</p>
        <ParametersTable
          callbacks={callbacks}
          rows={parameters.filter(
            parameter => parameter.parameter_direction_id === 1,
          )}
        />
        <AdditionalParametersTable
          callbacks={callbacks}
          rows={additionalParameters}
        />
      </CustomizedDialogs>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.lookups.locations,
  projects: state.projects,
  parameters: state.parameters,
  run_definition: state.settings.modals.run_definition,
  definition: state.definition,
});

const mapDispatchToProps = {
  getDefinitionConfig: getDefinitionConfigAction,
  addJob: addJobAction,
  toggleModalAction: toggleModal,
  clearDefinitionAction: clearDefinition,
  clearParametersAction: clearParameters,
  setLoadingAction: setLoading,
  handleErrorProps: handleError,
};

export const RunDefinition = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedRunDefinition);
