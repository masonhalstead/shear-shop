import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const defaultViewColStyles = theme => ({
  formControl: {
    marginLeft: 1,
  },
  checkbox: {
    padding: '0px',
    width: '20px',
    height: '20px',
  },
  checkboxRoot: {
    '&$checked': {
      color: '#62738d',
    },
  },
  checked: {},
  label: {
    fontSize: '13px',
    marginLeft: '8px',
    color: '#62738d',
    fontWeight: 300,
  },
});

class CustomCheckbox extends React.Component {
  static propTypes = {
    /** Columns used to describe table */
    columns: PropTypes.array.isRequired,
    /** Callback to trigger View column update */
    handleColChange: PropTypes.func,
    /** Extend the style applied to components */
    classes: PropTypes.object,
  };

  render() {
    const { classes, onChange, checked, label } = this.props;

    return (
      <FormControlLabel
        classes={{
          root: classes.formControl,
          label: classes.label,
        }}
        control={
          <Checkbox
            className={classes.checkbox}
            classes={{
              root: classes.checkboxRoot,
              checked: classes.checked,
            }}
            onChange={e =>
              onChange(e.target.checked)
            }
            checked={checked}
          />
        }
        label={label}
      />
    );
  }
}

export default withStyles(defaultViewColStyles)(CustomCheckbox);
