import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import cn from './Input.module.scss';

export const InputIcon = ({ icon, handleOpen, color }) => (
  <div
    onClick={handleOpen}
    className={classNames(cn.inputNavIcon, cn.overflow)}
  >
    {icon && <FontAwesomeIcon icon={icon} style={{ color }} />}
  </div>
);

InputIcon.propTypes = {
  handleOpen: PropTypes.func,
  color: PropTypes.string,
  icon: PropTypes.string,
};
