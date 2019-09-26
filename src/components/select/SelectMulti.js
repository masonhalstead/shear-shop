import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxAlt } from 'components/checkbox/CheckboxAlt';
import cn from './Select.module.scss';

export const SelectMulti = ({
  rows,
  checked,
  checked_key,
  row_key,
  empty_text,
  handleMultiSelect,
}) => (
  <div className={cn.selectMultiWrapper}>
    {rows.length > 0 &&
      rows.map((row, index) => (
        <CheckboxAlt
          key={row.uuid}
          onChange={() => handleMultiSelect(row, index)}
          checked={checked.includes(row[checked_key])}
          margin="10px 0px"
          weight={300}
          label={row[row_key]}
        />
      ))}
    {rows.length === 0 && <p className={cn.itemEmpty}>{empty_text}</p>}
  </div>
);

SelectMulti.defaultProps = {
  rows: [],
  checked: [],
  row_key: 'uuid',
  empty_text: 'Nothing returned',
  handleMultiSelect: () => {},
};
SelectMulti.propTypes = {
  rows: PropTypes.array,
  checked: PropTypes.array,
  checked_key: PropTypes.string,
  row_key: PropTypes.string,
  empty_text: PropTypes.string,
  handleMultiSelect: PropTypes.func,
};
