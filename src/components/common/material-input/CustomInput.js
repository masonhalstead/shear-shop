import React from 'react';
import * as PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import classNames from 'classnames';
import cn from './MaterialInput.module.scss';

export const CustomInput = React.memo(
  ({
    label,
    name,
    id,
    value,
    onChange,
    required,
    select,
    children,
    className,
    disabled,
    error,
    variant,
    endAdornment,
    InputProps,
    inputStyles,
    placeholder,
    ...props
  }) => (
    <div className={classNames(cn.cell, { [cn.error]: error }, className)}>
      {label && (
        <label className={cn.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={cn.field}>
        <TextField
          placeholder={placeholder}
          error={!!error}
          select={select}
          fullWidth
          required={required}
          name={name}
          margin="none"
          variant={variant || 'outlined'}
          value={value}
          id={id}
          onChange={onChange}
          classes={{
            root: cn.textField,
          }}
          InputLabelProps={{
            classes: {
              root: cn.labexl,
            },
          }}
          InputProps={{
            classes: {
              focused: cn.inputFocused,
              notchedOutline:
                !variant || variant === 'outlined' ? cn.notchedBorder : null,
              ...inputStyles,
            },
            endAdornment,
            'data-role': props['data-role'],
            ...InputProps,
          }}
          disabled={disabled}
          {...props}
        >
          {children}
        </TextField>
        <div className={cn.errorMessage}>{error}</div>
      </div>
    </div>
  ),
);

CustomInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  required: PropTypes.bool,
  select: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  InputProps: PropTypes.object,
  inputStyles: PropTypes.object,
  endAdornment: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  'data-role': PropTypes.string,
};
