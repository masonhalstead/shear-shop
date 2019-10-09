import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import cn from './RunDefinition.module.scss';

export const ParameterNameCell = ({ row, callbacks }) => (
  <InputWrapper
    value={row.parameter_name}
    component={Input}
    placeholder="Enter Parameter Name"
    bulk
    handleOnChange={input => callbacks.saveKey(row, input.value)}
  />
);
ParameterNameCell.propTypes = {
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
      value={row.parameter_value}
      component={Input}
      bulk
      handleOnChange={input => callbacks.saveValue(row, input.value)}
    />
  );
};
DescriptionCell.propTypes = {
  row: PropTypes.object,
  callbacks: PropTypes.object,
};

export const ParameterNameCellDisabled = ({ row }) => (
  <InputWrapper
    value={row.is_required ? `${row.parameter_name} *` : row.parameter_name}
    component={Input}
    bulk
  />
);
ParameterNameCellDisabled.propTypes = {
  row: PropTypes.object,
};

export const DescriptionNameCellDisabled = ({ row }) => (
  <InputWrapper
    value={row.description}
    component={Input}
    bulk
  />
);
ParameterNameCellDisabled.propTypes = {
  row: PropTypes.object,
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
