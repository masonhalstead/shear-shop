import React from 'react';
import PropTypes from 'prop-types';
import cn from './Checkbox.module.scss';

export const CheckboxAlt = ({ checked, onChange, label, margin }) => (
  <div
    className={cn.checkboxContainer}
    onClick={() => onChange(!checked)}
    style={{ margin }}
  >
    <input
      type="checkbox"
      className={cn.checkboxInput}
      checked={checked}
      readOnly
    />
    {label && <p className={cn.checkboxLabel}>{label}</p>}
  </div>
);
CheckboxAlt.defaultProps = {
  checked: false,
  label: false,
  margin: '0px',
  onChange: () => {},
};
CheckboxAlt.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.any,
  margin: PropTypes.string,
  checked: PropTypes.bool,
};
