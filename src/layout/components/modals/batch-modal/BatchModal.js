import { Button, Dialog } from '@material-ui/core';
import cn from './BatchModal.module.scss';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'components/dialogs/Dialogs';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import {
  addJobBatch as addJobBatchAction,
  getJobsConfig as getJobsConfigAction,
} from 'ducks/operators/jobs';

import { handleError } from 'ducks/operators/settings';
import {
  setLoading,
  toggleModal as toggleModalAction,
  setBatchRow as setBatchRowAction,
} from 'ducks/actions';
import { connect } from 'react-redux';

class BatchModal extends PureComponent {
  state = {
    batchName: this.props.settings.editBatchRow.batchName,
  };

  handleCloseBatch = () => {
    const { toggleModal, setBatchRow } = this.props;
    toggleModal({ batch: false });
    setBatchRow({
      jobId: '',
      batchName: '',
    });
  };

  changeBatchName = name => {
    this.setState({ batchName: name });
  };

  createBatch = async () => {
    const { batchName, jobId } = this.state;
    const {
      addJobBatch,
      getJobsConfig,
      location,
      toggleModal,
      setBatchRow,
    } = this.props;
    const [, , project_id, , filter] = location.pathname.split('/');
    toggleModal({ batch: false });
    await addJobBatch({ batch_name: batchName, job_id: jobId, project_id });

    await getJobsConfig(project_id, filter);

    setBatchRow({
      jobId: '',
      batchName: '',
    });
  };

  render() {
    const { batchName } = this.state;
    const { settings } = this.props;
    return (
      <Dialog
        onClose={this.handleCloseBatch}
        aria-labelledby="customized-dialog-title"
        open={settings.modals.batch}
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
              label="Batch Name"
              value={batchName}
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
  hamburger: state.hamburger,
  projects: state.projects,
  settings: state.settings,
  jobs: state.jobs,
});

const mapDispatchToProps = {
  getJobsConfig: getJobsConfigAction,
  handleErrorAction: handleError,
  setLoadingAction: setLoading,
  addJobBatch: addJobBatchAction,
  toggleModal: toggleModalAction,
  setBatchRow: setBatchRowAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BatchModal);
