import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import cn from './Input.module.scss';

export const InputSelect = ({ placeholder, value, handleOpen }) => (
  <div
    onClick={handleOpen}
    className={classNames(cn.selectInputWrapper, cn.overflow)}
  >
    {placeholder && !value && <p className={cn.placeholder}>{placeholder}</p>}
    {value && <p className={cn.selectValue}>{value}</p>}
  </div>
);

InputSelect.propTypes = {
  handleOpen: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
