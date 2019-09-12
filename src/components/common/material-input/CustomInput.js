import { fade, withStyles } from '@material-ui/core/styles';
import { InputBase } from '@material-ui/core';

export const CustomInput = withStyles(theme => ({
  root: {
    width: '100%',
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #cfd7e6',
    fontSize: 13,
    height: '18px !important',
    padding: '5px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#818fa3',
    },
  },
}))(InputBase);

export const CustomInputNoBorders = withStyles(theme => ({
  root: {
    width: '100%',
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    fontSize: 13,
    height: '18px !important',
    padding: '5px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#818fa3',
    },
  },
}))(InputBase);

export const CustomInputTextArea = withStyles(theme => ({
  root: {
    width: '100%',
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #cfd7e6',
    fontSize: 13,
    height: '58px !important',
    width: '100%',
    padding: '0px 5px 0px 5px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#818fa3',
    },
  },
}))(InputBase);
