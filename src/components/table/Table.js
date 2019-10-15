import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableRows } from 'components/table/TableRows';
import { TableHeader } from './TableHeader';
import { TableHeaderCell } from './TableHeaderCell';
import { TableRow } from './TableRow';
import cn from './Table.module.scss';

export class Table extends Component {
  static propTypes = {
    callbacks: PropTypes.object,
    headers: PropTypes.array,
    headers_component: PropTypes.any,
    header_component: PropTypes.any,
    rows_component: PropTypes.any,
    row_component: PropTypes.any,
    cell_components: PropTypes.array,
    creative_groups: PropTypes.array,
    settings: PropTypes.object,
    rows: PropTypes.array,
    handleSort: PropTypes.func,
  };

  rowsRef = React.createRef();

  static defaultProps = {
    headers: [],
    rows: [],
    callbacks: {},
    settings: {},
    creative_groups: [],
    handleSort: () => {},
    headers_component: TableHeaderCell,
    header_component: TableHeader,
    rows_component: TableRows,
    row_component: TableRow,
  };

  state = {
    table_height: 62, // default value header + row
    header: true,
    header_height: 32,
    row_height: 30,
    search_key: false,
    keyword_key: false,
    row_length: 1,
    height: 62, // default value header + row
  };

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      ...props.settings,
    };
  }

  render() {
    const {
      handleSort,
      callbacks,
      creative_groups,
      headers,
      headers_component,
      header_component: Header,
      rows,
      rows_component: Rows,
      row_component: Row,
      cell_components,
    } = this.props;
    const settings = { ...this.state };

    return (
      <div className={cn.table}>
        <Header
          headers_component={headers_component}
          headers={headers}
          settings={settings}
          handleSort={handleSort}
        />
        <Rows
          headers={headers}
          rows={rows}
          settings={settings}
          callbacks={callbacks}
          creative_groups={creative_groups}
          row_component={Row}
          cell_components={cell_components}
        />
      </div>
    );
  }
}
