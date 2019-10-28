import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Select } from 'components/select/Select';
import { SelectContainer } from 'components/select/SelectContainer';
import { InputSelect } from 'components/inputs/InputSelect';

export class ConnectedDropdownNav extends Component {
  static propTypes = {
    label: PropTypes.string,
    left_icon: PropTypes.any,
    right_icon: PropTypes.any,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    empty_text: PropTypes.string,
    height: PropTypes.string,
    extended: PropTypes.array,
    inner_title: PropTypes.any,
    display: PropTypes.string,
    list_id: PropTypes.any,
    route_id: PropTypes.string,
    list_key: PropTypes.string,
    list_name: PropTypes.string,
    margin: PropTypes.string,
    handleOnSelect: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    left_icon: false,
    right_icon: 'sort',
    placeholder: 'Projects',
    type: 'text',
    height: '100%',
    display: 'flex',
    disabled: false,
    margin: '',
    extended: [],
    inner_title: false,
    empty_text: 'Nothing to select',
  };

  handleOnSelect = row => {
    const { handleOnSelect } = this.props;
    handleOnSelect(row);
  };

  handleBreadcrumb = () => {
    const { list_key, list_name, list_id, route_id, placeholder } = this.props;
    let name = placeholder;
    const items = this.props[list_key];
    if (items.length > 0) {
      let list_object = items.find(item => item[list_id] === route_id);
      list_object = list_object || {};
      name = list_object[list_name];
    }
    return name;
  };

  render() {
    const {
      label,
      left_icon,
      right_icon,
      placeholder,
      disabled,
      type,
      margin,
      list_key,
      extended,
      height,
      display,
      inner_title,
      list_name,
      empty_text,
    } = this.props;
    const value = this.handleBreadcrumb();
    return (
      <SelectContainer
        handleOnSelect={this.handleOnSelect}
        disabled={disabled}
        bulk
        margin={margin}
        width="auto"
        height={height}
        input={{
          component: InputSelect,
          label,
          left_icon,
          right_icon,
          placeholder,
          disabled,
          value,
          type,
          display,
          height,
        }}
        select={{
          component: Select,
          rows: this.props[list_key],
          extended,
          width: '200px',
          inner_title,
          row_key: [list_name],
          empty_text,
          disabled,
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  filter_jobs: state.lookups.filter_jobs,
  filter_definitions: state.lookups.filter_definitions,
});

export const DropdownNav = withRouter(
  connect(mapStateToProps)(ConnectedDropdownNav),
);
