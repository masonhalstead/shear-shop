import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableRows } from 'components/table/TableRows';
import { TableRow } from './TableRow';
import cn from './Table.module.scss';

export class TableDefinition extends Component {
  static propTypes = {
    callbacks: PropTypes.object,
    headers: PropTypes.array,
    rows_component: PropTypes.any,
    row_component: PropTypes.any,
    cell_components: PropTypes.array,
    settings: PropTypes.object,
    rows: PropTypes.array,
  };

  rowsRef = React.createRef();

  static defaultProps = {
    headers: [],
    rows: [],
    callbacks: {},
    settings: {},
    rows_component: TableRows,
    row_component: TableRow,
  };

  state = {
    table_height: 62, // default value header + row
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
      callbacks,
      headers,
      rows,
      rows_component: Rows,
      row_component: Row,
      cell_components,
    } = this.props;
    const settings = { ...this.state };
    return (
      <div className={cn.tableDefinition}>
        <Rows
          headers={headers}
          rows={rows}
          settings={settings}
          callbacks={callbacks}
          row_component={Row}
          cell_components={cell_components}
        />
      </div>
    );
  }
}
