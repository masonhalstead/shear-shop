import React, { PureComponent } from 'react';

import { toggleAlertAction } from 'ducks/actions';
import * as PropTypes from 'prop-types';
import { selectAlert } from 'ducks/selectors';
import { connect } from 'react-redux';
import { Button, Dialog } from '@material-ui/core';
import cn from './Alert.module.scss';
import { DialogActions, DialogContent, DialogTitle } from './dialogs/Dialogs';
import classNames from 'classnames';

class AlertWrapper extends PureComponent {
  static propTypes = {
    toggleAlert: PropTypes.func,
    message: PropTypes.string,
    open: PropTypes.bool,
  };

  handleClose = () => {
    const { toggleAlert } = this.props;
    toggleAlert(false);
  };

  render() {
    const { open, settings } = this.props;
    return (
      <Dialog
        onClose={this.handleCloseProject}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{ paper: cn.paper }}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={this.handleCloseProject}
        >
          <div className={cn.title}>Error from API</div>
        </DialogTitle>
        <DialogContent>
          <div className={cn.container}>
            {settings.error_message.error_message ||
              'Oops, something went wrong. Please try later.'}
          </div>
        </DialogContent>
        <DialogActions className={cn.actions}>
          <Button
            onClick={this.handleClose}
            color="primary"
            size="large"
            className={classNames(cn.btn, cn.btnPrimary)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  open: selectAlert(state),
  settings: state.settings,
});

const mapDispatchToProps = {
  toggleAlert: toggleAlertAction,
};

export const Alert = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlertWrapper);
