import { Button, Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'components/dialogs/Dialogs';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import { getJobsConfig as getJobsConfigAction } from 'ducks/operators/jobs';
import { handleError as handleErrorAction } from 'ducks/operators/settings';
import {
  setLoading as setLoadingAction,
  toggleModal as toggleModalAction,
  clearJob as clearJobAction,
} from 'ducks/actions';
import { connect } from 'react-redux';
import cn from './BatchModal.module.scss';

class BatchModal extends PureComponent {
  static propTypes = {
    getJobsConfig: PropTypes.func,
    clearJob: PropTypes.func,
    setLoading: PropTypes.func,
    toggleModal: PropTypes.func,
    handleError: PropTypes.func,
    history: PropTypes.func,
    job: PropTypes.object,
    modals: PropTypes.object,
  };

  state = {
    job_id: null,
    batch_descriptor: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.job.job_id !== state.job_id) {
      return {
        job_id: props.job.job_id,
        batch_descriptor: props.job.batch_descriptor,
      };
    }
    return null;
  }

  handleCloseBatch = () => {
    const { toggleModal, clearJob } = this.props;
    clearJob();
    toggleModal({ batch: false });
  };

  changeBatchName = name => {
    this.setState({ batch_descriptor: name });
  };

  createBatch = async () => {
    const { getJobsConfig, history, setLoading, handleError } = this.props;

    const [, , project_id, , filter] = history.location.pathname.split('/');

    setLoading(true);
    try {
      // TODO: Still need a route to update batch descriptor
      await getJobsConfig(project_id, filter);
      this.handleCloseBatch();
    } catch (err) {
      handleError(err);
    }
    setLoading(false);
  };

  render() {
    const { batch_descriptor } = this.state;
    const { modals } = this.props;
    return (
      <Dialog
        onClose={this.handleCloseBatch}
        aria-labelledby="customized-dialog-title"
        open={modals.batch}
        classes={{ paper: cn.paper }}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={this.handleCloseBatch}
        >
          <div className={cn.title}>Edit Batch</div>
        </DialogTitle>
        <DialogContent>
          <div className={cn.container}>
            <InputWrapper
              label="Batch Descriptor"
              value={batch_descriptor}
              component={Input}
              handleOnChange={input => this.changeBatchName(input.value)}
            />
          </div>
        </DialogContent>
        <DialogActions className={cn.actions}>
          <Button
            onClick={this.createBatch}
            color="primary"
            size="large"
            className={classNames(cn.btn, cn.btnPrimary)}
          >
            Edit Batch
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  modals: state.settings.modals,
  job: state.job,
});

const mapDispatchToProps = {
  getJobsConfig: getJobsConfigAction,
  handleError: handleErrorAction,
  setLoading: setLoadingAction,
  clearJob: clearJobAction,
  toggleModal: toggleModalAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BatchModal);
