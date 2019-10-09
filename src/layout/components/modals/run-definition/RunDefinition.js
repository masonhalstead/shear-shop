import React, { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { CustomizedDialogs } from 'components/modal/CustomModal';
import { DefinitionBlock } from './DefinitonBlock';
import * as Sentry from '@sentry/browser';
import uuid from 'uuid';
import { getJobDefinition as getJobDefinitionAction } from 'ducks/operators/job_definition';
import { addJob as addJobAction } from 'ducks/operators/job';
import { setLoading } from 'ducks/actions';
import { handleError } from 'ducks/operators/settings';
import { connect } from 'react-redux';
import { DefinitionParameters } from './DefinitionParameters';
import { AdditionalParameters } from './AdditionalParameters';

class RunDefinition extends PureComponent {
  static propTypes = {
    opened: PropTypes.bool,
    handleClose: PropTypes.func,
    runJob: PropTypes.func,
    title: PropTypes.string,
    locations: PropTypes.array,
  };

  static getDerivedStateFromProps(props, state) {
    const { job_definition, parameters } = props;
    const { job_definition_id } = state;
    if (job_definition.job_definition_id !== job_definition_id) {
      return {
        ...job_definition,
        parameters: [...parameters],
      };
    }
    return null;
  }

  componentDidMount() {
    this.setInitialData();
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
    additionalParameters: [
      {
        parameter_name: '',
        parameter_direction_id: 1,
        parameter_method_id: 1,
        parameter_value: '',
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

  setInitialData = async () => {
    const { getJobDefinition, setLoadingAction, id } = this.props;

    try {
      await setLoadingAction(true);
      await getJobDefinition(id);
    } catch (err) {
      // Only fires if the server is off line or the body isnt set correctly
      Sentry.captureException(err);
    }
    setLoadingAction(false);
  };

  saveDefault = (row, value) => {
    const { parameters } = this.state;
    const index = parameters.findIndex(parameter => parameter.uuid === row.uuid);
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
      parameter_name: value,
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
    this.setState(
      {
        additionalParameters: [...additionalParameters],
        row_id: null,
      },
      () => this.handleRowManagement(),
    );
  };

  runJob = async () => {
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
      batch_id,
      batch_description,
      additionalParameters
    } = this.state;
    const {
      projectId,
      runJob,
      setLoadingAction,
      handleErrorProps,
      job_definition,
      locations,
      addJob,
    } = this.props;

    const { job_definition_id } = job_definition;
    const timeOut = timeout.split(':');

    const params = [...parameters, ...additionalParameters];

    const post_data = {
      project_id: Number(projectId),
      job_definition_name,
      description,
      docker_image,
      result_method_id,
      startup_command,
      timeout_seconds: Number(timeOut[0]) * 3600 + Number(timeOut[1] * 60),
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
      batch_id,
      batch_description,
      parameters: params.filter(filter => filter.parameter_name.length > 0),
    };

    try {
      await setLoadingAction(true);
      await addJob(post_data, job_definition_id);
      runJob();
    } catch (err) {
      handleErrorProps(err, data);
    }
    setLoadingAction(false);
  };


  handleDefinitionBlock = input => {
    this.setState({ ...input, changes: true });
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

  render() {
    const { opened, handleClose, title, locations } = this.props;
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
        open={opened}
        handleClose={handleClose}
        runJob={this.runJob}
        title={title}
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
        <DefinitionParameters
          callbacks={callbacks}
          rows={parameters.filter(
            parameter => parameter.parameter_direction_id === 1,
          )}
        />
        <AdditionalParameters
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
  job_definition: state.job_definition,
});

const mapDispatchToProps = {
  getJobDefinition: getJobDefinitionAction,
  addJob: addJobAction,
  setLoadingAction: setLoading,
  handleErrorProps: handleError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RunDefinition);
