import React, { PureComponent } from 'react';

import { toggleAlertAction } from 'ducks/actions';
import * as PropTypes from 'prop-types';
import { selectAlert } from 'ducks/selectors';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';

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
    const { message, open } = this.props;
    return (
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        open={open}
        message={message || 'Oops, something went wrong. Please try later.'}
        autoHideDuration={5000}
        onClose={this.handleClose}
      />
    );
  }
}

const mapStateToProps = state => ({
  open: selectAlert(state),
});

const mapDispatchToProps = {
  toggleAlert: toggleAlertAction,
};

export const Alert = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlertWrapper);
