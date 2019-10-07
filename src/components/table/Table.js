import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatNull, containsStrings, compareJSON } from 'utils/helpers';
import { TableHeaderCell } from './TableHeaderCell';
import { TableRow } from './TableRow';
import cn from './Table.module.scss';

function handleSearchFilter(props) {
  const { rows, settings, search_input } = props;
  const { search_key } = settings;
  if (search_key) {
    return rows.filter(row => containsStrings(row[search_key], search_input));
  }
  return rows;
}
function handleSortingFilter(props) {
  const { rows, sort_key, sort } = props;
  if (!sort_key) {
    return rows;
  }
  if (sort === 'desc') {
    return rows.sort((a, b) =>
      formatNull(a[sort_key])
        .toString()
        .toLowerCase() <
      formatNull(b[sort_key])
        .toString()
        .toLowerCase()
        ? 1
        : -1,
    );
  }
  if (sort === 'asc') {
    return rows.sort((a, b) =>
      formatNull(a[sort_key])
        .toString()
        .toLowerCase() >
      formatNull(b[sort_key])
        .toString()
        .toLowerCase()
        ? 1
        : -1,
    );
  }
  return rows;
}
function handleKeywordFilter(props) {
  const { rows, settings, keywords } = props;
  const { keyword_key } = settings;

  if (keyword_key) {
    return rows.filter(row =>
      keywords.every(key => {
        const key_check = formatNull(key);
        const keyword_check = formatNull(row[keyword_key]);
        return containsStrings(keyword_check, key_check);
      }),
    );
  }
  return rows;
}

export class Table extends Component {
  static propTypes = {
    callbacks: PropTypes.object,
    headers: PropTypes.array,
    keywords: PropTypes.array,
    search_input: PropTypes.string,
    cell_components: PropTypes.array,
    settings: PropTypes.object,
    location: PropTypes.object,
    rows: PropTypes.array,
  };

  static defaultProps = {
    headers: [],
    rows: [],
    keywords: [],
    callbacks: {},
    settings: {},
    search_input: '',
  };

  state = {
    headers: [],
    headers_data: [],
    rows: [],
    sort_key: false,
    sort: 'desc',
    settings: {
      header: true,
      header_height: 32,
      row_height: 30,
      search_key: false,
      keyword_key: false,
    },
  };

  componentDidMount() {
    const { rows } = this.props;
    this.setState({ rows });
  }

  static getDerivedStateFromProps(props, state) {
    const { keywords, search_input, rows, settings, headers } = props;
    const { sort_key, sort, headers_data } = state;

    if (!compareJSON(headers_data, headers)) {
      return {
        headers_data: props.headers,
        headers: props.headers,
      };
    }
    const search_filter = handleSearchFilter({ rows, settings, search_input });
    const keyword_filter = handleKeywordFilter({
      rows: search_filter,
      settings,
      keywords,
    });
    const sort_filter = handleSortingFilter({
      rows: keyword_filter,
      sort_key,
      sort,
    });
    return {
      rows: [...sort_filter],
      settings: {
        ...state.settings,
        ...props.settings,
      },
    };
  }

  handleSort = (header, headers) => {
    const { sort_key, sort } = header;
    this.setState({ headers, sort_key, sort });
  };

  render() {
    const { headers, rows, settings } = this.state;
    const { callbacks, cell_components, path } = this.props;
    const { header, header_height } = settings;

    const headers_style = {
      minHeight: `${header_height}px`,
      maxHeight: `${header_height}px`,
    };

    return (
      <div className={cn.table}>
        {header && (
          <div className={cn.tableHeader} style={headers_style}>
            {headers.map((item, index) => (
              <TableHeaderCell
                key={item.uuid}
                header={item}
                headers={headers}
                header_index={index}
                handleSort={this.handleSort}
              />
            ))}
          </div>
        )}
        {rows.length > 0 && (
          <div className={cn.tableRowWrapper}>
            {rows.map(row => (
              <TableRow
                key={row.uuid}
                headers={headers}
                path={path}
                row={row}
                settings={settings}
                callbacks={callbacks}
                cell_components={cell_components}
              />
            ))}
          </div>
        )}
        {rows.length === 0 && (
          <div className={cn.tableRowEmpty}>No Data Available</div>
        )}
      </div>
    );
  }
}
