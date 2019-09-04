import React from 'react';
import { AppBar, withStyles } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import { styles } from './styles';

const AppBarWrapper = React.memo(({ children, classes, hamburger }) => (
  <AppBar className={hamburger ? classes.appBar : classes.appBarClosed}>
    {children}
  </AppBar>
));

AppBarWrapper.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.any,
  hamburger: PropTypes.bool,
};

export const CustomAppBar = withStyles(styles, { withTheme: true })(
  AppBarWrapper,
);
