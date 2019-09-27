import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import cn from './Table.module.scss';

export class TableHeaderCell extends Component {
  static propTypes = {
    handleSort: PropTypes.func,
    headers: PropTypes.array,
    header: PropTypes.object,
    header_index: PropTypes.number,
  };

  static defaultProps = {
    headers: [],
    header: {},
    handleSort() {},
    header_index: 0,
  };

  handleOnSort = (header, header_index) => {
    const { headers } = this.props;
    const { handleSort } = this.props;

    if (!header.sort) {
      return;
    }

    const new_headers = headers.map((item, index) => {
      if (index === header_index) {
        return {
          ...item,
          sort: header.sort === 'desc' ? 'asc' : 'desc',
        };
      }
      return {
        ...item,
        sort: item.sort && 'default',
      };
    });
    handleSort(new_headers[header_index], new_headers);
  };

  render() {
    const { header_index, header } = this.props;
    const { flex_grow, min_width, title, sort } = header;

    const header_style = {
      minWidth: min_width,
      width: min_width,
      flexGrow: flex_grow || 0,
    };

    if (!header.show) {
      return null;
    }

    return (
      <div
        className={classNames(cn.tableHeaderCell, { [cn.headerSort]: sort })}
        style={header_style}
        onClick={() => this.handleOnSort(header, header_index)}
      >
        {title}
        {sort && (
          <span>
            {sort === 'asc' && (
              <FontAwesomeIcon icon={['fas', 'sort-amount-up']} />
            )}
            {sort === 'desc' && (
              <FontAwesomeIcon icon={['fas', 'sort-amount-down']} />
            )}
            {sort === 'default' && (
              <>
                <FontAwesomeIcon icon={['fas', 'long-arrow-alt-up']} />
                <FontAwesomeIcon icon={['fas', 'long-arrow-alt-down']} />
              </>
            )}
          </span>
        )}
      </div>
    );
  }
}
