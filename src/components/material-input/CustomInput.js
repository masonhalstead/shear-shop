import { withStyles } from '@material-ui/core/styles';
import { InputBase } from '@material-ui/core';

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

