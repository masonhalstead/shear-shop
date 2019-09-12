import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { loadingColumn } from 'utils/loadingColumn';
import { selectLoading } from 'ducks/selectors';
import MUIDataTable from 'mui-datatables';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from './TableView.module.scss';

export const TableContentWrapper = React.memo(
  ({
    isDataLoading,
    tableOptions,
    tableData,
    columns,
    customActions,
    hasActions,
    styles,
  }) => {
    const getMuiTheme = () =>
      createMuiTheme({
        overrides: {
          MuiPaper: {
            elevation4: {
              boxShadow: 'none',
            },
          },
          // MuiToolbar: {
          //   root: {
          //     width: '50%',
          //     marginLeft: 'auto',
          //   },
          // },
          MUIDataTableHeadCell: {
            root: {
              textAlign: 'center',
              backgroundColor: '#f7f8fb !important',
              height: '20px',
              padding: '5px',
              fontWeight: 400,
              color: '#62738d',
              border: '1px solid #dde3ee',
              borderBottom: 'none',
              fontSize: 13,
            },
            toolButton: {
              display: 'block',
            },
            sortAction: {
              display: 'inline',
            },
          },
          MuiTableCell: {
            root: {
              border: '1px solid #dde3ee',
              borderBottom: '1px solid #dde3ee',
            },
            body: {
              fontSize: '13px',
              fontWeight: 300,
              lineHeight: '1',
              padding: '5px !important',
            },
            head: {
              fontSize: '1rem',
            },
          },
          MuiTableRow: {
            root: {
              height: '32px',
              '&$hover:hover': { backgroundColor: 'none' },
            },
          },
          MUIDataTable: {
            paper: {
              overflowX: 'auto',
            },
          },
          MUIDataTableToolbar: {
            root: {
              display: 'none',
            },
            actions: {
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            },
          },
          // MUIDataTablePagination: {
          //   root: {
          //     '&:last-child': {
          //       padding: '0px 24px 30px 24px',
          //     },
          //   },
          // },
          ...styles,
        },
      });

    const customActionToolbar =
      customActions ||
      (hasActions ? <div className={cn.customToolbarPlaceholder} /> : null);

    return (
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          data={isDataLoading ? [{}] : tableData}
          columns={isDataLoading ? loadingColumn : columns}
          options={{
            ...tableOptions,
            customToolbar: () => customActionToolbar,
          }}
        />
      </MuiThemeProvider>
    );
  },
);

TableContentWrapper.propTypes = {
  isDataLoading: PropTypes.bool,
  tableOptions: PropTypes.object,
  tableData: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  customActions: PropTypes.node,
  hasActions: PropTypes.bool,
  styles: PropTypes.object,
};

const mapStateToProps = state => ({
  isDataLoading: selectLoading(state),
});

export const TableContent = connect(mapStateToProps)(TableContentWrapper);
