import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TextArea } from './TextArea';
import cn from './TextArea.module.scss';

export class TextAreaWrapper extends Component {
  static propTypes = {
    component: PropTypes.any,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    bulk: PropTypes.bool,
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
    margin: '0px',
    bulk: false,
    component: TextArea,
    handleClose() {},
    handleOpen() {},
    handleToggle() {},
    handleOnChange() {},
    handleOnKeyDown() {},
  };

  handleOnChange = e => {
    const { handleOnChange } = this.props;
    handleOnChange({ value: e.target.value });
  };

  render() {
    const { component: Input, label, bulk, margin, ...rest } = this.props;
    return (
      <div className={cn.textAreaWrapper} style={{ margin }}>
        {label && (
          <InputLabel label={label} handleClose={this.props.handleClose} />
        )}
        <div
          className={classNames(cn.textAreaContainer, {
            [cn.textAreaDisabled]: this.props.disabled,
            [cn.textAreaBulk]: bulk,
          })}
        >
          <Input {...rest} handleOnChange={this.handleOnChange} />
        </div>
      </div>
    );
  }
}

const InputLabel = ({ label, handleClose }) => (
  <p className={cn.textAreaLabel} role="presentation" onClick={handleClose}>
    {label}
  </p>
);
