import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatNull, containsStrings, compareJSON } from 'utils/helpers';
import { Table } from './Table';
import { TableHeader } from './TableHeader';

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

export class TableWrapper extends Component {
  static propTypes = {
    callbacks: PropTypes.object,
    headers: PropTypes.array,
    keywords: PropTypes.array,
    search_input: PropTypes.string,
    header_component: PropTypes.any,
    cell_components: PropTypes.array,
    table_component: PropTypes.any,
    settings: PropTypes.object,
    rows: PropTypes.array,
  };

  static defaultProps = {
    headers: [],
    rows: [],
    header_component: TableHeader,
    table_component: Table,
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
  };

  componentDidMount() {
    const { rows } = this.props;
    this.setState({ rows });
  }

  static getDerivedStateFromProps(props, state) {
    const { keywords, search_input, rows, headers } = props;
    const { sort_key, sort, headers_data } = state;
    const { settings } = props;

    if (!compareJSON(headers_data, headers)) {
      return {
        headers_data: props.headers,
        headers: props.headers,
      };
    }
    const search_filter_rows = handleSearchFilter({
      rows,
      settings,
      search_input,
    });

    const keyword_filter_rows = handleKeywordFilter({
      rows: search_filter_rows,
      settings,
      keywords,
    });

    const sort_filter_rows = handleSortingFilter({
      rows: keyword_filter_rows,
      sort_key,
      sort,
    });

    return { rows: [...sort_filter_rows] };
  }

  handleSort = (header, headers) => {
    const { sort_key, sort } = header;
    this.setState({ headers, sort_key, sort });
  };

  render() {
    const { headers, rows } = this.state;

    const {
      settings,
      callbacks,
      header_component,
      cell_components,
      table_component: TableComponent,
    } = this.props;

    return (
      <TableComponent
        headers={headers}
        rows={rows}
        callbacks={callbacks}
        header_component={header_component}
        cell_components={cell_components}
        settings={settings}
        handleSort={this.handleSort}
      />
    );
  }
}
