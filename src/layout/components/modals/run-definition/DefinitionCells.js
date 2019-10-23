import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import classNames from 'classnames';
import cn from './RunDefinition.module.scss';

export const DefaultCell = ({ row, callbacks }) => (
  <InputWrapper
    value={row.parameter_value}
    component={Input}
    margin="4px 5px"
    handleOnChange={input => callbacks.saveDefault(row, input.value)}
  />
);
DefaultCell.propTypes = {
  row: PropTypes.object,
  callbacks: PropTypes.object,
};

export const ParameterNameCell = ({ row }) => (
  <p className={classNames(cn.cell, cn.overflow)}>
    {row.is_required ? `${row.parameter_name} *` : row.parameter_name}
  </p>
);
ParameterNameCell.propTypes = {
  row: PropTypes.object,
};

export const DescriptionCell = ({ row }) => (
  <p className={classNames(cn.cell, cn.overflow)}>{row.description}</p>
);
DescriptionCell.propTypes = {
  row: PropTypes.object,
};
export const KeyCell = ({ row, callbacks }) => (
  <InputWrapper
    value={row.parameter_name}
    component={Input}
    margin="4px 5px"
    handleOnChange={input => callbacks.saveKey(row, input.value)}
  />
);
KeyCell.propTypes = {
  row: PropTypes.object,
  callbacks: PropTypes.object,
};
export const ValueCell = ({ row, callbacks }) => (
  <InputWrapper
    value={row.parameter_value}
    component={Input}
    margin="4px 5px"
    handleOnChange={input => callbacks.saveValue(row, input.value)}
  />
);
ValueCell.propTypes = {
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
export const FlexCell = () => <p></p>;
