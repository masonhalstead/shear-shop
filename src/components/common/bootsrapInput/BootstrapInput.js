import { InputBase, withStyles } from '@material-ui/core';

export const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #cfd7e6',
    fontSize: 13,
    padding: '5px',
    height: '18px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#818fa3',
    },
  },
}))(InputBase);

export const BootstrapInputDisabled = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#e9f2ff',
    border: '1px solid #cfd7e6',
    fontSize: 13,
    padding: '5px',
    height: '18px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#818fa3',
    },
  },
}))(InputBase);
