import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InputWrapper } from 'components/inputs/InputWrapper';
import cn from './Select.module.scss';

export const SelectContainer = ({
  input,
  select,
  margin,
  width,
  height,
  disabled,
  bulk,
  handleOnKeyDown,
  handleOnChange,
  handleOnSelect,
  handleOnMultiSelect,
}) => {
  const [open, setToggle] = useState(false);
  const node = useRef();
  const handleOpen = () => {
    setToggle(true);
  };
  const handleClose = () => {
    setToggle(false);
  };
  const handleToggle = () => {
    setToggle(!open);
  };
  const handleSelect = item => {
    handleOnSelect(item);
    handleClose();
  };
  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    handleClose();
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);
  const { component: Select } = select;
  return (
    <div
      ref={node}
      className={cn.selectContainer}
      style={{ margin, width, height }}
    >
      <InputWrapper
        {...input}
        bulk={bulk}
        disabled={disabled}
        handleClose={handleClose}
        handleOpen={handleOpen}
        handleToggle={handleToggle}
        handleOnKeyDown={handleOnKeyDown}
        handleOnChange={handleOnChange}
        open={open}
      />
      {open && !disabled && (
        <Select
          {...select}
          bulk={bulk}
          handleClose={handleClose}
          handleOpen={handleOpen}
          handleSelect={handleSelect}
          handleMultiSelect={handleOnMultiSelect}
        />
      )}
    </div>
  );
};

SelectContainer.defaultProps = {
  input: {},
  select: {},
  disabled: false,
  margin: '',
  width: '100%',
  height: 'auto',
  bulk: false,
  handleOnKeyDown: () => {},
  handleOnChange: () => {},
  handleOnSelect: () => {},
  handleOnMultiSelect: () => {},
};

SelectContainer.propTypes = {
  input: PropTypes.object,
  select: PropTypes.object,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
  width: PropTypes.string,
  bulk: PropTypes.bool,
  handleOnKeyDown: PropTypes.func,
  handleOnChange: PropTypes.func,
  handleOnSelect: PropTypes.func,
  handleOnMultiSelect: PropTypes.func,
};
