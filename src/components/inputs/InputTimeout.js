import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import cn from './Input.module.scss';

export const InputTimeout = React.memo(
  ({
    value,
    placeholder,
    disabled,
    handleOpen,
    handleOnChange,
    handleOnKeyDown,
  }) => (
    <NumberFormat
      format="##:##"
      className={cn.inputCustom}
      disabled={disabled}
      spellCheck="false"
      autoComplete="none"
      name="new-password"
      value={value}
      placeholder={placeholder}
      onValueChange={handleOnChange}
      onFocus={handleOpen}
      onKeyPress={handleOnKeyDown}
    />
  ),
);
InputTimeout.defaultProps = {
  placeholder: '',
  value: '',
  disabled: false,
  handleOpen: () => {},
  handleOnChange: () => {},
  handleOnKeyDown: () => {},
};
InputTimeout.propTypes = {
  disabled: PropTypes.any,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  handleOpen: PropTypes.func,
  handleOnChange: PropTypes.func,
  handleOnKeyDown: PropTypes.func,
};
