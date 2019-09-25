import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import classNames from 'classnames';
import cn from './Select.module.scss';

export const Select = ({
  rows,
  inner_title,
  row_key,
  empty_text,
  extended,
  bulk,
  width,
  handleSelect,
}) => (
  <Scrollbars
    className={classNames(cn.scrollContainer, { [cn.selectBulk]: bulk })}
    autoHeight
    autoHeightMin={30}
    autoHeightMax={200}
    style={{ minWidth: width }}
  >
    <div className={cn.selectWrapper}>
      {inner_title && <p className={cn.innerTitle}>{inner_title}</p>}
      {rows.length > 0 &&
        rows.map(row => (
          <p
            key={row.uuid}
            className={cn.item}
            role="presentation"
            onClick={() => handleSelect(row)}
          >
            {row[row_key]}
          </p>
        ))}
      {rows.length === 0 && <p className={cn.itemEmpty}>{empty_text}</p>}
      {extended.length > 0 && (
        <div className={cn.extendedWrapper}>
          {extended.map(ext => (
            <p
              key={ext.uuid}
              className={cn.itemExtended}
              role="presentation"
              onClick={() => handleSelect(ext)}
            >
              {ext[row_key]}
            </p>
          ))}
        </div>
      )}
    </div>
  </Scrollbars>
);

Select.defaultProps = {
  rows: [],
  extended: [],
  row_key: 'uuid',
  inner_title: '',
  bulk: false,
  width: 'auto',
  empty_text: 'Nothing returned',
  handleSelect: () => {},
};
Select.propTypes = {
  rows: PropTypes.array,
  extended: PropTypes.array,
  inner_title: PropTypes.string,
  row_key: PropTypes.string,
  bulk: PropTypes.bool,
  width: PropTypes.any,
  empty_text: PropTypes.string,
  handleSelect: PropTypes.func,
};
