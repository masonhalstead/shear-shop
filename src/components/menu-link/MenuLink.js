import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import cn from 'components/common/menu-link/MenuLink.module.scss';

const MenuLinkWrapper = React.memo(({ to, name, location }) => (
  <Link to={to} className={cn.linkItem}>
    <ListItem
      button
      selected={location.pathname === to}
      className={cn.listItem}
    >
      <ListItemText primary={name} className={cn.linkText} />
    </ListItem>
  </Link>
));

MenuLinkWrapper.propTypes = {
  to: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.object,
};

export const MenuLink = withRouter(MenuLinkWrapper);
