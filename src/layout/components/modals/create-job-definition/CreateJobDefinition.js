import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog } from '@material-ui/core';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'components/dialogs/Dialogs';
import classNames from 'classnames';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import { getDefinitionsConfig as getDefinitionsConfigAction } from 'ducks/operators/definitions';
import {
  createDefinition as createDefinitionAction,
  getDefinitionConfig as getDefinitionConfigAction,
} from 'ducks/operators/definition';
import { handleError as handleErrorAction } from 'ducks/operators/settings';
import { setLoading, toggleModal as toggleModalAction } from 'ducks/actions';
import { connect } from 'react-redux';
import cn from './CreateJobDefinition.module.scss';
import { TextAreaWrapper } from 'components/textarea/TextAreaWrapper';

class ConnectedCreateJobDefinition extends PureComponent {
  static propTypes = {
    createDefinition: PropTypes.func,
    getDefinitionsConfig: PropTypes.func,
    setLoadingAction: PropTypes.func,
    toggleModal: PropTypes.func,
    handleError: PropTypes.func,
    history: PropTypes.object,
    modals: PropTypes.object,
  };

  state = {
    job_definition_name: '',
    docker_image: '',
    startup_command: '',
  };

  openDefinition = definition_id => {
    const { history } = this.props;
    const [, , project_id, filter] = history.location.pathname.split('/');
    history.push(
      `/projects/${project_id}/definitions/${filter}/definition/${definition_id}`,
    );
  };

  changeParams = (name, value) => {
    this.setState({ [name]: value });
  };

  handleCloseDefinition = () => {
    const { toggleModal } = this.props;
    toggleModal({ definitions: false });
  };

  createDefinition = async () => {
    const { job_definition_name, docker_image, startup_command } = this.state;
    const {
      createDefinition,
      getDefinitionsConfig,
      history,
      setLoadingAction,
      handleError,
      toggleModal,
    } = this.props;

    const [, , project_id] = history.location.pathname.split('/');

    setLoadingAction(true);
    try {
      const definition_id = await createDefinition({
        job_definition_name,
        project_id,
        description: 'N/A',
        docker_image,
        result_method_id: 1,
        startup_command,
        timeout_seconds: 0,
        max_retries: 0,
        stdout_success_text: null,
        region_endpoint_hint: 'us-east-1c',
        cpu: 0,
        gpu: 0,
        memory_gb: 0,
        parameters: [],
      });
      await toggleModal({ definitions: false });
      await getDefinitionsConfig(project_id);
      this.openDefinition(definition_id);
    } catch (err) {
      handleError(err);
    }
    setLoadingAction(false);
  };

  render() {
    const { modals } = this.props;
    const { job_definition_name, docker_image, startup_command } = this.state;
    const buttonStyle =
      job_definition_name.length > 0 &&
      docker_image.length > 0 &&
      startup_command.length > 0
        ? cn.btnPrimary
        : cn.btnPrimaryDisabled;

    return (
      <Dialog
        onClose={this.handleCloseDefinition}
        aria-labelledby="customized-dialog-title"
        open={modals.definitions}
        classes={{ paper: cn.paper }}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={this.handleCloseDefinition}
        >
          <div className={cn.title}>Create Job Definition</div>
        </DialogTitle>
        <DialogContent>
          <div className={cn.container}>
            <InputWrapper
              required
              label="Job Definition Name"
              value={job_definition_name}
              component={Input}
              handleOnChange={input =>
                this.changeParams('job_definition_name', input.value)
              }
            />
            <InputWrapper
              margin="5px 0 0 0"
              required
              label="Docker Image"
              value={docker_image}
              component={Input}
              handleOnChange={input =>
                this.changeParams('docker_image', input.value)
              }
            />
            <TextAreaWrapper
              margin="5px 0 0 0"
              label="Startup Command"
              value={startup_command}
              handleOnChange={input =>
                this.changeParams('startup_command', input.value)
              }
            />
          </div>
        </DialogContent>
        <DialogActions className={cn.actions}>
          <Button
            disabled
            onClick={this.createDefinition}
            color="primary"
            size="large"
            className={classNames(cn.btn, buttonStyle)}
          >
            Create Definition
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  modals: state.settings.modals,
  project: state.project,
  projects: state.projects,
});

const mapDispatchToProps = {
  getDefinitionsConfig: getDefinitionsConfigAction,
  getDefinitionConfig: getDefinitionConfigAction,
  createDefinition: createDefinitionAction,
  handleError: handleErrorAction,
  setLoadingAction: setLoading,
  toggleModal: toggleModalAction,
};

export const CreateJobDefinition = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedCreateJobDefinition);
