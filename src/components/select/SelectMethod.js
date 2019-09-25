import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'components/dropdowns/Dropdown';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import { CheckboxAlt } from 'components/checkbox/CheckboxAlt';
import cn from './Select.module.scss';

class ConnectedSelectMethod extends Component {
  state = {
    parameter_method_name: 'Command Line',
    parameter_method_id: 1,
    is_encrypted: false,
    command_line_prefix: '',
    command_line_assignment_char: '',
    command_line_escaped: null,
    command_line_ignore_name: null,
  };

  handleParameterSelect = item => {
    const { handleMultiSelect } = this.props;
    let command_line = {};
    let environment_var = {};

    if (item.parameter_method_id === 1) {
      command_line = {
        command_line_prefix: '',
        command_line_assignment_char: '',
        command_line_escaped: null,
        command_line_ignore_name: null,
      };
    }

    if (item.parameter_method_id === 1) {
      environment_var = {
        is_encrypted: null,
      };
    }

    const state = {
      ...item,
      ...command_line,
      ...environment_var,
    };

    handleMultiSelect(state);
    this.setState(state);
  };

  handleRowManagement = () => {
    const { handleMultiSelect } = this.props;
    handleMultiSelect(this.state);
  };

  handlePrefix = item => {
    this.setState({ command_line_prefix: item.value }, () =>
      this.handleRowManagement(),
    );
  };

  handleAssignment = item => {
    this.setState({ command_line_assignment_char: item.value }, () =>
      this.handleRowManagement(),
    );
  };

  handleEncrypt = value => {
    this.setState({ is_encrypted: value }, () => this.handleRowManagement());
  };

  handleEscaped = value => {
    this.setState({ command_line_escaped: value }, () =>
      this.handleRowManagement(),
    );
  };

  handleIgnored = value => {
    this.setState({ command_line_ignore_name: value }, () =>
      this.handleRowManagement(),
    );
  };

  render() {
    const { parameter_methods } = this.props;
    const {
      command_line_prefix,
      command_line_assignment_char,
      parameter_method_name,
      parameter_method_id,
      command_line_escaped,
      command_line_ignore_name,
      is_encrypted,
    } = this.state;
    return (
      <div className={cn.selectMethodContainer}>
        <Dropdown
          rows={parameter_methods}
          row_key="parameter_method_name"
          value={parameter_method_name}
          label="Select Method"
          right_icon="chevron-down"
          margin="0px 0px 15px 0px"
          handleOnSelect={this.handleParameterSelect}
        />
        {parameter_method_id === 2 && (
          <CheckboxAlt
            onChange={this.handleEncrypt}
            checked={is_encrypted}
            label="Encrypted"
          />
        )}
        {parameter_method_id === 1 && (
          <>
            <div style={{ display: 'flex' }}>
              <InputWrapper
                value={command_line_prefix}
                placeholder="Prefix"
                component={Input}
                margin="0px 10px 0px 0px"
                handleOnChange={this.handlePrefix}
              />
              <InputWrapper
                value={command_line_assignment_char}
                placeholder="Assignment"
                component={Input}
                margin="0px 0px 0px 10px"
                handleOnChange={this.handleAssignment}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <CheckboxAlt
                onChange={this.handleEscaped}
                checked={command_line_escaped}
                margin="12px 10px 0px 0px"
                label="Escaped"
              />
              <CheckboxAlt
                onChange={this.handleIgnored}
                checked={command_line_ignore_name}
                margin="12px 0px 0px 10px"
                label="Ignored"
              />
            </div>
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  parameter_methods: state.lookups.parameter_methods,
});
export const SelectMethod = connect(mapStateToProps)(ConnectedSelectMethod);
