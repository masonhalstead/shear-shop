import React from 'react';
import PropTypes from 'prop-types';
import cn from './TextArea.module.scss';

export const TextArea = React.memo(
  ({
    value,
    placeholder,
    disabled,
    handleOpen,
    handleOnChange,
    handleOnKeyDown,
  }) => (
    <textarea
      className={cn.textAreaCustom}
      disabled={disabled}
      spellCheck="false"
      autoComplete="none"
      placeholder={placeholder}
      value={value}
      onChange={handleOnChange}
      onFocus={handleOpen}
      onKeyDown={handleOnKeyDown}
    />
  ),
);
TextArea.defaultProps = {
  placeholder: '',
  value: '',
  disabled: false,
  handleOpen: () => {},
  handleOnChange: () => {},
  handleOnKeyDown: () => {},
};
TextArea.propTypes = {
  disabled: PropTypes.any,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  handleOpen: PropTypes.func,
  handleOnChange: PropTypes.func,
  handleOnKeyDown: PropTypes.func,
};
