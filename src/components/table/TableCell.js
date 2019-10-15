import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from './Table.module.scss';
export class TableCell extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    header: PropTypes.object,
  };

  static defaultProps = {
    header: {},
  };

  render() {
    const { children, header } = this.props;
    const { flex_grow, min_width, show } = header;

    const cell_style = {
      minWidth: min_width,
      width: min_width,
      flexGrow: flex_grow || 0,
    };
    if (!show) {
      return null;
    }
    return (
      <div className={cn.tableCell} style={cell_style}>
        {children}
      </div>
    );
  }
}
