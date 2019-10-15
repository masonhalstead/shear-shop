import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setLoading,
  triggerSaveDefiniton as triggerSaveDefinitonAction,
  definitionChanged as definitionChangedAction,
} from 'ducks/actions';
import {
  getDefinitionConfig as getDefinitionConfigAction,
  saveDefinition as saveDefinitionAction,
} from 'ducks/operators/definition';
import {
  editParameters as editParametersProps,
  saveParameters as saveParametersProps,
} from 'ducks/operators/parameters';
import { handleError } from 'ducks/operators/settings';
import uuid from 'uuid';
import { DefinitionBlock } from './DefinitionBlock';
import { DefinitionTabs } from './DefinitionTabs';
import { ConfigTab } from './ConfigTab';
import { InputsTab } from './InputsTab';
import { OutputsTab } from './OutputsTab';
import cn from './Definition.module.scss';

class DefinitionPage extends Component {
  static propTypes = {
    getDefinitionConfig: PropTypes.func,
    setLoadingAction: PropTypes.func,
    handleErrorProps: PropTypes.func,
    triggerSaveDefiniton: PropTypes.func,
    saveDefinition: PropTypes.func,
    locations: PropTypes.array,
    location: PropTypes.object,
  };

  state = {
    job_definition_id: null,
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
    result_method_id: '',
    parameters: [],
    data: {
      create: [],
      remove: [],
      update: [],
    },
    callbacks: {
      saveParameterName: (row, value) => this.saveParameterName(row, value),
      changeRequired: id => this.changeRequired(id),
      saveDefault: (value, id) => this.saveDefault(value, id),
      saveDescription: (value, id) => this.saveDescription(value, id),
      handleReference: (value, id) => this.handleReference(value, id),
      deleteRow: id => this.deleteRow(id),
      handleMethod: (item, id) => this.handleMethod(item, id),
    },
  };

  componentDidMount() {
    this.setInitialData();
  }

  shouldComponentUpdate(nextProps) {
    const { triggerSaveDefiniton } = this.props;
    if (nextProps.settings.save_definition === true) {
      this.handleSubmit();
      triggerSaveDefiniton(false);
    }
    return true;
  }

  componentWillUnmount() {
    const { triggerSaveDefiniton, definitionChanged } = this.props;
    triggerSaveDefiniton(false);
    definitionChanged(false);
  }

  handleChangeTab = (e, value) => {
    this.setState({ tab: value });
  };

  handleDefinitionBlock = input => {
    const { definitionChanged } = this.props;
    definitionChanged(true);
    this.setState({ ...input });
  };

  handleDefinitionTabs = input => {
    const { definitionChanged } = this.props;
    definitionChanged(true);
    this.setState({ ...input });
  };

  saveParameterName = (row, value) => {
    const { parameters } = this.state;
    const index = parameters.findIndex(
      parameter => parameter.uuid === row.uuid,
    );
    parameters[index] = {
      ...parameters[index],
      parameter_name: value,
      modified: true,
    };
    this.setState(
      {
        parameters: [...parameters],
      },
      () => this.handleRowManagement(),
    );
  };

  changeRequired = row => {
    const { parameters } = this.state;
    const index = parameters.findIndex(
      parameter => parameter.uuid === row.uuid,
    );
    parameters[index] = {
      ...parameters[index],
      is_required: !parameters[index].is_required,
      modified: true,
    };
    this.setState(
      {
        parameters: [...parameters],
      },
      () => this.handleRowManagement(),
    );
  };

  handleMethod = (row, item) => {
    const { parameters } = this.state;
    const index = parameters.findIndex(
      parameter => parameter.uuid === row.uuid,
    );
    parameters[index] = {
      ...parameters[index],
      parameter_method_id: item.parameter_method_id,
      parameter_method_name: item.parameter_method_name,
      command_line_assignment_char: item.command_line_assignment_char,
      command_line_escaped: item.command_line_escaped,
      command_line_ignore_name: item.command_line_ignore_name,
      command_line_prefix: item.command_line_prefix,
      is_encrypted: item.is_encrypted,
      modified: true,
    };
    this.setState(
      {
        parameters: [...parameters],
      },
      () => this.handleRowManagement(),
    );
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

  handleOnSelectMethod = item => {
    let { stdout_success_text } = this.state;
    if (item.result_method_id !== 2) {
      stdout_success_text = '';
    }
    this.setState({
      result_method_id: item.result_method_id,
      result_method_name: item.result_method_name,
      stdout_success_text,
    });
  };

  handleReference = (row, item) => {
    const { parameters } = this.state;
    const index = parameters.findIndex(
      parameter => parameter.uuid === row.uuid,
    );

    parameters[index] = {
      ...parameters[index],
      reference_id: item.reference_id,
      reference_parameter_name: item.reference_parameter_name,
      reference: item.reference,
      modified: true,
    };
    this.setState(
      {
        parameters: [...parameters],
      },
      () => this.handleRowManagement(),
    );
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
    this.setState(
      {
        parameters: [...parameters],
      },
      () => this.handleRowManagement(),
    );
  };

  saveDescription = (row, value) => {
    const { parameters } = this.state;
    const index = parameters.findIndex(
      parameter => parameter.uuid === row.uuid,
    );
    parameters[index] = {
      ...parameters[index],
      description: value,
      modified: true,
    };
    this.setState(
      {
        parameters: [...parameters],
      },
      () => this.handleRowManagement(),
    );
  };

  deleteRow = row => {
    const { parameters, data } = this.state;
    const index = parameters.findIndex(
      parameter => parameter.uuid === row.uuid,
    );
    const parameter = parameters[index];
    parameters.splice(index, 1);
    this.setState(
      {
        parameters: [...parameters],
        data: {
          ...data,
          remove: [...data.remove, parameter],
        },
      },
      () => this.handleRowManagement(),
    );
  };

  handleParametersPayload = parameters => {
    const { data } = this.state;

    const filtered_parameters = parameters.filter(
      parameter => parameter.modified,
    );

    const update = filtered_parameters.filter(parameter => parameter.owner_id);
    const create = filtered_parameters.filter(parameter => !parameter.owner_id);

    this.setState({
      data: {
        ...data,
        update,
        create,
      },
    });
  };

  handleRowManagement = () => {
    const { definitionChanged } = this.props;
    definitionChanged(true);
    const { parameters } = this.state;
    const inputs = parameters.filter(
      p => p.parameter_direction_id === 1 && p.modified === false,
    );
    const outputs = parameters.filter(
      p => p.parameter_direction_id === 2 && p.modified === false,
    );

    this.handleParametersPayload(parameters);

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
    const {
      getDefinitionConfig,
      setLoadingAction,
      handleErrorProps,
      location,
    } = this.props;
    const [, , project_id, , , , definition_id] = location.pathname.split('/');

    setLoadingAction(true);
    try {
      const config = await getDefinitionConfig(project_id, definition_id);
      this.setState({
        ...config.definition,
        parameters: config.parameters,
      });
    } catch (err) {
      handleErrorProps(err);
    }
    setLoadingAction(false);
  };

  handleSubmit = async () => {
    const {
      job_definition_name,
      job_definition_id,
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
      location_id,
    } = this.state;

    const {
      saveDefinition,
      setLoadingAction,
      handleErrorProps,
      locations,
    } = this.props;

    const definition = {
      job_definition_name,
      job_definition_id,
      description,
      docker_image,
      result_method_id,
      startup_command,
      timeout_seconds,
      stdout_success_text,
      region_endpoint_hint:
        region !== 'empty'
          ? locations.filter(filter => filter.location_id === Number(region))[0]
              .location_name
          : 'empty',
      location_id: location_id === 'empty' ? null : location_id,
      cpu,
      gpu,
      max_retries,
      memory_gb,
    };

    setLoadingAction(true);
    try {
      await saveDefinition(definition, data);
      this.setState({
        data: {
          create: [],
          remove: [],
          update: [],
        },
      });
    } catch (err) {
      handleErrorProps(err, data);
    }
    setLoadingAction(false);
  };

  render() {
    const {
      job_definition_name,
      docker_image,
      startup_command,
      description,
      cpu,
      timeout,
      max_retries,
      gpu,
      stdout_success_text,
      location_name,
      location_id,
      region_endpoint_hint,
      result_method_name,
      result_method_id,
      memory_gb,
      parameters,
      callbacks,
      tab,
    } = this.state;

    return (
      <div className={cn.pageWrapper}>
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
              location_name={location_name}
              location_id={location_id}
              result_method_name={result_method_name}
              result_method_id={result_method_id}
              region_endpoint_hint={region_endpoint_hint}
              memory_gb={memory_gb}
              handleOnSelectLocation={this.handleOnSelectLocation}
              handleOnSelectRegion={this.handleOnSelectRegion}
              handleOnSelectMethod={this.handleOnSelectMethod}
              handleDefinitionTabs={this.handleDefinitionTabs}
            />
          )}
          {tab === 1 && (
            <InputsTab
              callbacks={callbacks}
              rows={parameters.filter(
                parameter => parameter.parameter_direction_id === 1,
              )}
            />
          )}
          {tab === 2 && (
            <OutputsTab
              callbacks={callbacks}
              rows={parameters.filter(
                parameter => parameter.parameter_direction_id === 2,
              )}
            />
          )}
        </DefinitionTabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locations: state.lookups.locations,
  parameters: state.parameters,
  definition: state.definition,
  settings: state.settings,
});

const mapDispatchToProps = {
  getDefinitionConfig: getDefinitionConfigAction,
  editParameters: editParametersProps,
  saveParameters: saveParametersProps,
  triggerSaveDefiniton: triggerSaveDefinitonAction,
  setLoadingAction: setLoading,
  handleErrorProps: handleError,
  saveDefinition: saveDefinitionAction,
  definitionChanged: definitionChangedAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefinitionPage);
