import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TableContainer } from 'components/table-view/TableContainer';
import { TableContent } from 'components/table-view/TableContent';
import { configureColumnsOutput } from './outputColumns';

import cn from './Definition.module.scss';

export class OutputsTab extends PureComponent {
  static propTypes = {
    callbacks: PropTypes.object,
    parameters: PropTypes.array,
  };

  options = {
    filterType: 'textField',
    selectableRows: 'none',
    search: false,
    pagination: false,
    filter: false,
    download: false,
    viewColumns: false,
    print: false,
  };

  componentDidMount() {
    this.createColumns();
  }

  createColumns = () => configureColumnsOutput(this.props.callbacks);

  render() {
    const { parameters } = this.props;

    return (
      <div className={cn.tabValueAlt}>
        <TableContainer style={cn.tableContainerWrapper}>
          <TableContent
            tableData={parameters}
            tableOptions={this.options}
            columns={this.createColumns()}
            styles={{
              MuiTableCell: {
                root: {
                  border: '1px solid #dde3ee',
                  borderBottom: '1px solid #dde3ee',
                },
                body: {
                  fontSize: '13px',
                  fontWeight: 300,
                  lineHeight: '1',
                  padding: '2.5px !important',
                  '&:nth-child(2)': {
                    width: 189,
                  },
                  '&:nth-child(6)': {
                    width: 29,
                  },
                },
                head: {
                  fontSize: '1rem',
                },
              },
            }}
          />
        </TableContainer>
      </div>
    );
  }
}
