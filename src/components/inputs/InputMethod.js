import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import cn from './Input.module.scss';

export const InputMethod = ({ icon, handleOpen, color }) => (
  <div onClick={handleOpen} className={classNames(cn.inputIcon, cn.overflow)}>
    {icon && <FontAwesomeIcon icon={icon} style={{ color }} />}
  </div>
);

InputMethod.propTypes = {
  handleOpen: PropTypes.func,
  color: PropTypes.string,
  icon: PropTypes.string,
};
