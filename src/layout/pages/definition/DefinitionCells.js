import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import { DropdownMethod } from 'components/dropdowns/DropdownMethod';
import { DropdownReference } from 'components/dropdowns/DropdownReference';
import { InputMethod } from 'components/inputs/InputMethod';
import cn from './Definition.module.scss';

export const ParameterNameCell = ({ row, callbacks }) => (
  <InputWrapper
    value={row.parameter_name}
    component={Input}
    placeholder="Enter Parameter Name"
    bulk
    handleOnChange={input => callbacks.saveParameterName(row, input.value)}
  />
);
ParameterNameCell.propTypes = {
  row: PropTypes.object,
  callbacks: PropTypes.object,
};

export const RequiredCell = ({ row, callbacks }) => {
  let icon = 'times';
  let color = '#d9534f';
  if (row.is_required) {
    icon = 'check';
    color = '#5db85b';
  }
  if (!row.parameter_name) {
    return null;
  }
  return (
    <InputMethod
      icon={icon}
      color={color}
      handleOpen={() => callbacks.changeRequired(row)}
    />
  );
};
RequiredCell.propTypes = {
  row: PropTypes.object,
  callbacks: PropTypes.object,
};

export const MethodCell = ({ row, callbacks }) => {
  let icon = 'code';
  if (row.parameter_method_id === 1) {
    icon = 'terminal';
  }
  if (!row.parameter_name) {
    return null;
  }
  return (
    <DropdownMethod
      icon={icon}
      handleOnSelect={item => callbacks.handleMethod(row, item)}
    />
  );
};
MethodCell.propTypes = {
  row: PropTypes.object,
  callbacks: PropTypes.object,
};

export const ReferencesCell = ({ row, callbacks }) => {
  if (!row.parameter_name) {
    return null;
  }
  return (
    <DropdownReference
      value={row.reference}
      right_icon="chevron-down"
      handleOnSelect={item => callbacks.handleReference(row, item)}
    />
  );
};
ReferencesCell.propTypes = {
  row: PropTypes.object,
  callbacks: PropTypes.object,
};

export const DefaultCell = ({ row, callbacks }) => {
  if (!row.parameter_name) {
    return null;
  }
  return (
    <InputWrapper
      value={row.parameter_value}
      component={Input}
      bulk
      handleOnChange={input => callbacks.saveDefault(row, input.value)}
    />
  );
};
DefaultCell.propTypes = {
  row: PropTypes.object,
  callbacks: PropTypes.object,
};

export const DescriptionCell = ({ row, callbacks }) => {
  if (!row.parameter_name) {
    return null;
  }
  return (
    <InputWrapper
      value={row.description}
      component={Input}
      bulk
      handleOnChange={input => callbacks.saveDescription(row, input.value)}
    />
  );
};
DescriptionCell.propTypes = {
  row: PropTypes.object,
  callbacks: PropTypes.object,
};

export const RemoveCell = ({ row, callbacks }) => (
  <div className={cn.removeCell} onClick={() => callbacks.deleteRow(row)}>
    <FontAwesomeIcon title="Remove Row" icon="trash" />
  </div>
);
RemoveCell.propTypes = {
  row: PropTypes.object,
  callbacks: PropTypes.object,
};
