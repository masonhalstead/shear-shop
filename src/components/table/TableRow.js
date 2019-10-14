import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compareJSON } from 'utils/helpers';
import cn from './Table.module.scss';
import { Cell } from './Cell';

export class TableRow extends Component {
  static propTypes = {
    row: PropTypes.object,
    headers: PropTypes.array,
    settings: PropTypes.object,
    callbacks: PropTypes.object,
    cell_components: PropTypes.array,
  };

  static defaultProps = {
    row: [],
    headers: [],
    callbacks: {},
    cell_components: [],
  };

  shouldComponentUpdate(nextProps) {
    const { row, headers } = nextProps;
    const { props } = this;

    if (!compareJSON(row, props.row) || !compareJSON(headers, props.headers)) {
      return true;
    }
    return false;
  }

  render() {
    const {
      headers,
      row,
      settings,
      callbacks,
      cell_components,
      path,
    } = this.props;

    const row_styles = {
      minHeight: `${settings.row_height}px`,
      maxHeight: `${settings.row_height}px`,
    };

    if (settings.row_grow) {
      row_styles.maxHeight = 'auto';
    }

    return (
      <div className={cn.tableRow} style={row_styles}>
        {cell_components.map((ChildComponent, index) => {
          const cell_key = `${row.uuid}${index}`;
          return (
            <Cell row={row} key={cell_key} header={headers[index]}>
              <ChildComponent
                path={path}
                row={row}
                column_index={index}
                header={headers[index]}
                callbacks={callbacks}
              />
            </Cell>
          );
        })}
      </div>
    );
  }
}
