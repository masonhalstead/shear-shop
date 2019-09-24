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
              borderRadius: 'unset',
            },
            elevation2: {
              marginTop: '18px !important',
            },
          },
          // MuiToolbar: {
          //   root: {
          //     width: '50%',
          //     marginLeft: 'auto',
          //   },
          // },
          MuiFormControlLabel: {
            label: {
              color: 'red !important',
            },
          },
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
            mypopper: {
              display: 'none',
            },
            sortAction: {
              display: 'inline',
            },
          },
          // MuiButtonBase: {
          //   root: {
          //     color: '#62738d !important',
          //     width: '20px !important',
          //     height: '20px !important',
          //   }
          // },
          MuiIconButton: {
            root: {
              width: '10px !important',
              height: '10px !important',
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
          MUIDataTableBody: {
            emptyTitle: {
              color: '#62738d',
              fontSize: '13px',
            },
          },
          MuiTableRow: {
            root: {
              height: '33px',
              '&$hover:hover': { backgroundColor: 'none' },
            },
          },
          MUIDataTable: {
            paper: {
              overflowX: 'auto',
              boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.08)',
            },
          },
          // MuiTypography: {
          //   root: {
          //     color: '#62738d !important',
          //     fontSize: 13,
          //     fontWeight: 300,
          //   }
          // },
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
