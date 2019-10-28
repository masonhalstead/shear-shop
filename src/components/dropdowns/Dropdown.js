import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'components/select/Select';
import { SelectContainer } from 'components/select/SelectContainer';
import { InputSelect } from 'components/inputs/InputSelect';

export class Dropdown extends Component {
  static propTypes = {
    label: PropTypes.string,
    left_icon: PropTypes.any,
    right_icon: PropTypes.any,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    height: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    empty_text: PropTypes.string,
    rows: PropTypes.array,
    extended: PropTypes.array,
    inner_title: PropTypes.any,
    row_key: PropTypes.string,
    margin: PropTypes.string,
    bulk: PropTypes.bool,
    handleOnSelect: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    left_icon: false,
    right_icon: false,
    placeholder: '',
    type: 'text',
    disabled: false,
    value: '',
    margin: '',
    rows: [],
    extended: [],
    inner_title: false,
    row_key: 'uuid',
    height: 'auto',
    empty_text: 'Nothing to select',
    bulk: false,
  };

  handleOnSelect = row => {
    const { handleOnSelect } = this.props;
    handleOnSelect(row);
  };

  render() {
    const {
      label,
      left_icon,
      right_icon,
      placeholder,
      disabled,
      value,
      type,
      margin,
      rows,
      height,
      extended,
      inner_title,
      row_key,
      empty_text,
      bulk,
    } = this.props;

    return (
      <SelectContainer
        handleOnSelect={this.handleOnSelect}
        disabled={disabled}
        bulk={bulk}
        margin={margin}
        height={height}
        input={{
          component: InputSelect,
          label,
          left_icon,
          right_icon,
          placeholder,
          disabled,
          height,
          value,
          type,
        }}
        select={{
          component: Select,
          rows,
          extended,
          inner_title,
          row_key,
          empty_text,
          disabled,
        }}
      />
    );
  }
}
