import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectMethod } from 'components/select/SelectMethod';
import { SelectContainer } from 'components/select/SelectContainer';
import { InputMethod } from 'components/inputs/InputMethod';

export class DropdownMethod extends Component {
  static propTypes = {
    icon: PropTypes.string,
    handleOnSelect: PropTypes.func,
    row: PropTypes.object,
  };

  static defaultProps = {
    icon: 'chevron-down',
  };

  handleOnMultiSelect = item => {
    const { handleOnSelect } = this.props;
    handleOnSelect(item);
  };

  render() {
    const { icon, row } = this.props;

    return (
      <SelectContainer
        handleOnMultiSelect={this.handleOnMultiSelect}
        bulk
        input={{
          component: InputMethod,
          icon,
        }}
        select={{
          component: SelectMethod,
          row,
        }}
      />
    );
  }
}
