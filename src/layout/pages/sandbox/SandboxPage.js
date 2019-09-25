import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'components/dropdowns/Dropdown';
import { InputWrapper } from 'components/inputs/InputWrapper';
import { Input } from 'components/inputs/Input';

const array_items = [
  {
    name: 'name 1',
    id: 1,
    uuid: 1,
  },
  {
    name: 'name 2',
    id: 2,
    uuid: 2,
  },
  {
    name: 'name 3',
    id: 3,
    uuid: 3,
  },
  {
    name: 'name 4',
    id: 4,
    uuid: 4,
  },
  {
    name: 'name 5',
    id: 5,
    uuid: 5,
  },
  {
    name: 'name 6',
    id: 6,
    uuid: 6,
  },
  {
    name: 'name 7',
    id: 7,
    uuid: 7,
  },
  {
    name: 'name 8',
    id: 8,
    uuid: 8,
  },
  {
    name: 'name 9',
    id: 9,
    uuid: 9,
  },
];
const extended = [
  {
    name: 'Remove value',
    id: null,
    uuid: 1,
  },
];

class SandboxPage extends PureComponent {
  static propTypes = {
    getProjects: PropTypes.func,
    hamburger: PropTypes.object,
    projects: PropTypes.array,
    lookups: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
  };

  state = {
    value: '',
    input_value: '',
  };

  handleOnSelectBudget = item => {
    if (item.id === null) {
      return this.setState({ value: '' });
    }
    this.setState({ value: item.name });
  };

  handleOnChange = input => {
    this.setState({ input_value: input.value });
  };

  render() {
    const { value, input_value } = this.state;
    return (
      <div style={{ width: 400, margin: 50 }}>
        <p>Sandbox</p>
        <Dropdown
          rows={array_items}
          row_key="name"
          value={value}
          placeholder="Optional Placeholder"
          label="With Label"
          right_icon="chevron-down"
          handleOnSelect={this.handleOnSelectBudget}
        />
        <Dropdown
          rows={array_items}
          extended={extended}
          margin="10px 0px 10px 0px"
          row_key="name"
          value={value}
          right_icon="chevron-down"
          handleOnSelect={this.handleOnSelectBudget}
        />
        <Dropdown
          rows={array_items}
          extended={extended}
          margin="10px 0px 10px 0px"
          placeholder="Bulk for table cells"
          row_key="name"
          value={value}
          right_icon="chevron-down"
          bulk
          handleOnSelect={this.handleOnSelectBudget}
        />
        <InputWrapper
          value={input_value}
          component={Input}
          margin="0px 10px 0px 0px"
          handleOnChange={this.handleOnChange}
        />
        <InputWrapper
          value="Bulk Example"
          component={Input}
          margin="0px 10px 0px 0px"
          bulk
          handleOnChange={this.handleOnChange}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hamburger: state.hamburger,
  lookups: state.lookups,
  projects: state.projects,
  settings: state.settings,
});

export default connect(mapStateToProps)(SandboxPage);
