import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const defaultViewColStyles = theme => ({
  root: {
    padding: '16px 24px 16px 24px',
    fontFamily: 'Roboto',
  },
  title: {
    marginLeft: '-7px',
    fontSize: '14px',
    color: theme.palette.text.secondary,
    textAlign: 'left',
    fontWeight: 500,
  },
  formGroup: {
    marginTop: '8px',
  },
  formControl: {},
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

class TableViewCol extends React.Component {
  static propTypes = {
    /** Columns used to describe table */
    columns: PropTypes.array.isRequired,
    /** Callback to trigger View column update */
    handleColChange: PropTypes.func,
    /** Extend the style applied to components */
    classes: PropTypes.object,
  };

  render() {
    const { classes, columns, handleColChange } = this.props;

    return (
      <FormControl component="fieldset" className={classes.root}>
        <FormGroup className={classes.formGroup}>
          {columns.map(
            (column, index) =>
              column.display !== 'excluded' &&
              column.options.viewColumns !== false && (
                <FormControlLabel
                  key={index}
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
                        handleColChange(e.target.value, index, e.target.checked)
                      }
                      checked={
                        column.options.display === true ||
                        column.options.display === 'true'
                      }
                      value={column.name}
                    />
                  }
                  label={column.label}
                />
              ),
          )}
        </FormGroup>
      </FormControl>
    );
  }
}

export default withStyles(defaultViewColStyles, {
  name: 'MUIDataTableViewCol',
})(TableViewCol);
