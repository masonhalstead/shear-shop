import React from 'react';
import PropTypes from 'prop-types';
import cn from './Checkbox.module.scss';

export const CheckboxAlt = React.memo(
  ({ checked, onChange, label, margin, weight }) => (
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
      {label && (
        <p className={cn.checkboxLabel} style={{ fontWeight: weight }}>
          {label}
        </p>
      )}
    </div>
  ),
);
CheckboxAlt.defaultProps = {
  checked: false,
  label: false,
  weight: 400,
  margin: '0px',
  onChange: () => {},
};
CheckboxAlt.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.any,
  weight: PropTypes.number,
  margin: PropTypes.string,
  checked: PropTypes.bool,
};
