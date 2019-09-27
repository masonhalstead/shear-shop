import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectMulti } from 'components/select/SelectMulti';
import { SelectContainer } from 'components/select/SelectContainer';
import { InputIcon } from 'components/inputs/InputIcon';

export class DropdownMulti extends Component {
  static propTypes = {
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    margin: PropTypes.string,
    rows: PropTypes.array,
    row_key: PropTypes.string,
    checked: PropTypes.array,
    checked_key: PropTypes.string,
    inner_title: PropTypes.string,
    handleOnSelect: PropTypes.func,
  };

  static defaultProps = {
    icon: 'cog',
  };

  handleOnMultiSelect = item => {
    const { handleOnSelect } = this.props;
    handleOnSelect(item);
  };

  render() {
    const {
      icon,
      disabled,
      margin,
      rows,
      row_key,
      checked,
      checked_key,
      inner_title,
    } = this.props;

    return (
      <SelectContainer
        handleOnMultiSelect={this.handleOnMultiSelect}
        disabled={disabled}
        bulk
        margin={margin}
        input={{
          component: InputIcon,
          icon,
        }}
        select={{
          component: SelectMulti,
          rows,
          checked,
          checked_key,
          row_key,
          inner_title,
        }}
      />
    );
  }
}
