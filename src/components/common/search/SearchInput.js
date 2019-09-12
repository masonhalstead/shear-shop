import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: '28px',
    boxShadow: 'none',
    flex: 1,
    border: '1px solid #cfd7e6',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    paddingRight: 25,
  },
  iconButton: {
    padding: 10,
    color: '#62738d',
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export const CustomizedInputBase = ({ onSearch }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <SearchIcon className={classes.iconButton} aria-label="search" />
      <InputBase
        className={classes.input}
        placeholder="Filter Job Definition"
        inputProps={{ 'aria-label': 'filter job definition' }}
        onChange={onSearch}
      />
    </Paper>
  );
};
