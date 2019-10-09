import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'components/tooltip/Tooltip';
import cn from './Menu.module.scss';
const { PUBLIC_URL } = process.env;
export const Menu = () => {
  return (
    <div className={cn.menuContainer}>
      <div className={cn.logoWrapper}>
        <img
          className={cn.logo}
          src={`${PUBLIC_URL}/brain-light.svg`}
          alt="Andromeda"
        />
      </div>
      <div className={cn.linkWrapper}>
        <FontAwesomeIcon icon="folder-open" />
        <Tooltip title="something" />
      </div>
    </div>
  );
};
