import React, { PureComponent } from 'react';

import { Button, Dialog } from '@material-ui/core';
import cn from './CreateJobDefinition.module.scss';
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

class CreateJobDefinition extends PureComponent {
  state = {
    jobName: '',
  };

  openDefinition = definition_id => {
    const { history, location } = this.props;
    const [, , project_id, filter] = location.pathname.split('/');
    history.push(
      `/projects/${project_id}/definitions/${filter}/definition/${definition_id}`,
    );
  };

  changeJobName = name => {
    this.setState({ jobName: name });
  };

  handleCloseDefinition = () => {
    const { toggleModal } = this.props;
    toggleModal({ definitions: false });
  };

  createDefinition = async () => {
    const { jobName } = this.state;
    const {
      createDefinition,
      getDefinitionsConfig,
      location,
      setLoadingAction,
      toggleModal,
    } = this.props;

    const [, , project_id] = location.pathname.split('/');

    await setLoadingAction(true);

    const definition_id = await createDefinition({
      job_definition_name: jobName,
      project_id,
      description: 'Testing Project Description',
      docker_image: '/dockerimage',
      result_method_id: 1,
      startup_command: 'nothing',
      timeout_seconds: 86400,
      stdout_success_text: 'winning',
      region_endpoint_hint: 'us-east-1e',
      cpu: 0,
      gpu: 0,
      memory_gb: 0,
      parameters: [
        {
          parameter_name: 'Parameter2',
          parameter_direction_id: 1,
          parameter_method_id: 1,
          is_required: true,
          is_encrypted: true,
          parameter_value: 'Default Value',
          description: 'Parameter description',
          command_line_prefix: null,
          command_line_assignment_char: null,
          command_line_escaped: null,
          command_line_ignore_name: null,
          reference_type_id: null,
          reference_id: null,
          reference_parameter_name: null,
        },
        {
          parameter_name: 'Parameter3',
          parameter_direction_id: 2,
          parameter_method_id: 1,
          is_required: true,
          is_encrypted: true,
          parameter_value: 'Default Value',
          description: 'Parameter description',
          command_line_prefix: null,
          command_line_assignment_char: null,
          command_line_escaped: null,
          command_line_ignore_name: null,
          reference_type_id: null,
          reference_id: null,
          reference_parameter_name: null,
        },
      ],
    });
    await toggleModal({ definitions: false });

    await getDefinitionsConfig(project_id);
    await setLoadingAction(false);
    this.openDefinition(definition_id);
  };
  render() {
    const { modals } = this.props.settings;
    const { jobName } = this.state;

    return (
      <Dialog
        onClose={this.handleCloseDefinition}
        aria-labelledby="customized-dialog-title"
        open={modals.definitions}
        classes={{ paper: cn.paper }}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseDefinition}>
          <div className={cn.title}>Create Job Definition</div>
        </DialogTitle>
        <DialogContent>
          <div className={cn.container}>
            <InputWrapper
              label="Job Definition Name"
              value={jobName}
              component={Input}
              handleOnChange={input =>
                this.changeJobName(input.value)
              }
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

    )
  }
}

const mapStateToProps = state => ({
  hamburger: state.hamburger,
  settings: state.settings,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateJobDefinition);
