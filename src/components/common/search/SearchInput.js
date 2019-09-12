import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames';
import cn from './SearchInput.module.scss';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: '24px',
    boxShadow: 'none',
    flex: 1,
    border: '1px solid #dde3ee',
  },
  input: {
    fontSize: '13px',
    flex: 1,
    paddingRight: 5,
  },
  iconButton: {
    padding: '0px 10px 0px 5px',
    fontSize: '18px',
    color: '#62738d',
  },
  divider: {
    height: 24,
    margin: 4,
  },
}));

export const CustomizedInputBase = ({ onSearch }) => {
  const classes = useStyles();
  console.log(classes);
  return (
    <Paper className={classes.root}>
      <SearchIcon className={classes.iconButton} aria-label="search" />
      <InputBase
        className={classNames(classes.input, cn.inputOverride)}
        placeholder="Filter Job Definition"
        inputProps={{ 'aria-label': 'filter job definition' }}
        onChange={onSearch}
      />
    </Paper>
  );
};
