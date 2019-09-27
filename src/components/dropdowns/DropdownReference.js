import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectReference } from 'components/select/SelectReference';
import { SelectContainer } from 'components/select/SelectContainer';
import { InputSelect } from 'components/inputs/InputSelect';

export class DropdownReference extends Component {
  static propTypes = {
    value: PropTypes.string,
    right_icon: PropTypes.any,
    row: PropTypes.object,
    handleOnSelect: PropTypes.func,
  };

  handleOnMultiSelect = item => {
    const { handleOnSelect } = this.props;
    handleOnSelect(item);
  };

  render() {
    const { right_icon, row, value } = this.props;
    return (
      <SelectContainer
        handleOnMultiSelect={this.handleOnMultiSelect}
        bulk
        input={{
          component: InputSelect,
          right_icon,
          value,
        }}
        select={{
          component: SelectReference,
          row,
        }}
      />
    );
  }
}
