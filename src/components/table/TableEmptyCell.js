import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from './Table.module.scss';
export class TableEmptyCell extends PureComponent {
  static propTypes = {
    header: PropTypes.object,
  };

  static defaultProps = {
    header: {},
  };

  render() {
    const { header } = this.props;
    const { flex_grow, min_width, show } = header;

    const cell_style = {
      minWidth: min_width,
      width: min_width,
      flexGrow: flex_grow || 0,
    };
    if (!show) {
      return null;
    }
    return <div className={cn.tableCell} style={cell_style}></div>;
  }
}
