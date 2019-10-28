import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import cn from './Input.module.scss';

export class InputWrapper extends Component {
  static propTypes = {
    component: PropTypes.any,
    label: PropTypes.string,
    left_icon: PropTypes.any,
    right_icon: PropTypes.any,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    bulk: PropTypes.bool,
    data_mask: PropTypes.any,
    margin: PropTypes.string,
    handleOnKeyDown: PropTypes.func,
    handleClose: PropTypes.func,
    handleOpen: PropTypes.func,
    handleToggle: PropTypes.func,
    handleOnChange: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    value: '',
    placeholder: '',
    disabled: false,
    data_mask: false,
    left_icon: false,
    right_icon: false,
    type: 'text',
    display: 'initial',
    height: 'auto',
    margin: '0px',
    bulk: false,
    handleClose() {},
    handleOpen() {},
    handleToggle() {},
    handleOnChange() {},
    handleOnKeyDown() {},
  };

  handleDataMask = input => {
    const { handleOnChange } = this.props;
    handleOnChange({
      value: input.value,
      masked: input.formattedValue,
      raw: input.floatValue,
    });
  };

  handleOnChange = e => {
    const { handleOnChange, data_mask } = this.props;
    if (data_mask === 'timeout') {
      return this.handleDataMask(e);
    }
    return handleOnChange({ value: e.target.value });
  };

  render() {
    const {
      component: Input,
      label,
      left_icon,
      right_icon,
      bulk,
      margin,
      display,
      width,
      height,
      ...rest
    } = this.props;
    return (
      <div
        className={cn.inputWrapper}
        style={{ margin, width, height, display }}
      >
        {label && (
          <InputLabel label={label} handleClose={this.props.handleClose} />
        )}
        <div
          className={classNames(cn.inputContainer, {
            [cn.inputDisabled]: this.props.disabled,
            [cn.inputBulk]: bulk,
          })}
        >
          {left_icon && (
            <div className={cn.inputLeftIcon} onClick={this.props.handleToggle}>
              <FontAwesomeIcon icon={left_icon} />
            </div>
          )}
          <Input {...rest} handleOnChange={this.handleOnChange} />
          {right_icon && (
            <div
              className={cn.inputRightIcon}
              onClick={this.props.handleToggle}
            >
              <FontAwesomeIcon icon={right_icon} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const InputLabel = React.memo(({ label, handleClose }) => (
  <p className={cn.inputLabel} role="presentation" onClick={handleClose}>
    {label}
  </p>
));
