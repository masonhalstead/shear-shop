import React from 'react';
import PropTypes from 'prop-types';
import cn from './Input.module.scss';

export const Input = React.memo(
  ({
    value,
    type,
    placeholder,
    disabled,
    handleOpen,
    handleOnChange,
    handleOnKeyDown,
  }) => (
    <input
      className={cn.inputCustom}
      disabled={disabled}
      spellCheck="false"
      autoComplete="none"
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={handleOnChange}
      onFocus={handleOpen}
      onKeyDown={handleOnKeyDown}
    />
  ),
);
Input.defaultProps = {
  placeholder: '',
  value: '',
  type: 'text',
  disabled: false,
  handleOpen: () => {},
  handleOnChange: () => {},
  handleOnKeyDown: () => {},
};
Input.propTypes = {
  disabled: PropTypes.any,
  value: PropTypes.any,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  handleOpen: PropTypes.func,
  handleOnChange: PropTypes.func,
  handleOnKeyDown: PropTypes.func,
};
