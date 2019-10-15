import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TableEmptyRow } from './TableEmptyRow';
import cn from './Table.module.scss';

export class ConnectedTableRows extends PureComponent {
  static propTypes = {
    callbacks: PropTypes.object,
    settings: PropTypes.object,
    headers: PropTypes.array,
    rows: PropTypes.array,
    states: PropTypes.array,
    platforms: PropTypes.array,
    location: PropTypes.object,
    frequency_list: PropTypes.array,
    state_classes: PropTypes.object,
    row_component: PropTypes.any,
    cell_components: PropTypes.array,
  };

  static defaultProps = {
    state_classes: {},
    states: [],
    platforms: [],
    frequency_list: [],
  };

  render() {
    const {
      headers,
      rows,
      settings,
      callbacks,
      row_component: Row,
      cell_components,
      location,
      ...rest
    } = this.props;
    if (rows.length > 0) {
      return (
        <div className={cn.tableRowWrapper}>
          {rows.map(row => (
            <Row
              key={row.uuid}
              headers={headers}
              row={row}
              settings={settings}
              callbacks={callbacks}
              cell_components={cell_components}
              paths={location.pathname.split('/')}
              {...rest}
            />
          ))}
        </div>
      );
    }
    return <TableEmptyRow headers={headers} settings={settings} />;
  }
}

const mapStateToProps = state => ({
  state_classes: state.lookups.state_classes,
});

export const TableRows = withRouter(
  connect(mapStateToProps)(ConnectedTableRows),
);
