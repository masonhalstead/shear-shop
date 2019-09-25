import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'components/dropdowns/Dropdown';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';
import cn from './Select.module.scss';

const extended = [
  {
    project_name: 'Remove Project Reference',
    project_id: null,
  },
];

class ConnectedSelectReference extends Component {
  state = {
    project_name: '',
    reference_parameter_name: '',
    reference_id: null,
  };

  handleProjectSelect = item => {
    let state = {
      reference_id: item.project_id,
      project_name: item.project_name,
      reference: 'References Added',
    };

    if (item.project_id === null) {
      state = {
        reference_id: null,
        project_name: '',
        reference_parameter_name: '',
        reference: '',
      };
    }
    this.setState(state, () => this.handleRowManagement());
  };

  handleRowManagement = () => {
    const { handleMultiSelect } = this.props;
    handleMultiSelect(this.state);
  };

  handleReferenceName = item => {
    this.setState({ reference_parameter_name: item.value }, () =>
      this.handleRowManagement(),
    );
  };

  render() {
    const { projects } = this.props;
    const { reference_parameter_name, project_name } = this.state;
    return (
      <div className={cn.selectMethodContainer}>
        <Dropdown
          rows={projects}
          row_key="project_name"
          value={project_name}
          extended={extended}
          label="Select Project"
          placeholder="Select Project"
          right_icon="chevron-down"
          margin="0px 0px 15px 0px"
          handleOnSelect={this.handleProjectSelect}
        />
        <InputWrapper
          value={reference_parameter_name}
          placeholder="Parameter Name"
          component={Input}
          margin="0px 10px 0px 0px"
          handleOnChange={this.handleReferenceName}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  projects: state.projects,
});
export const SelectReference = connect(mapStateToProps)(
  ConnectedSelectReference,
);
