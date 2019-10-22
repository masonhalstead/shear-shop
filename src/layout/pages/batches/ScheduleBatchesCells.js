import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import cn from './Batches.module.scss';

export const BatchNameCell = ({ row, paths }) => (
  <Link
    className={classNames(cn.jobCell, cn.overflow)}
    // to={`/projects/${paths[2]}/definitions/${paths[4]}/definition/${
    //   row.batch_id
    //   }`}
  >
    {row.scheduled_batch_name}
  </Link>
);
BatchNameCell.propTypes = {
  row: PropTypes.object,
};

export const BatchIntervalCell = ({ row }) => (
  <p className={classNames(cn.cell, cn.overflow)}>{row.interval_name}</p>
);
BatchIntervalCell.propTypes = {
  row: PropTypes.object,
};

export const CreatedByCell = ({ row }) => (
  <p className={classNames(cn.cell, cn.textCenter, cn.overflow)}>
    {row.created_by}
  </p>
);
CreatedByCell.propTypes = {
  row: PropTypes.object,
};

export const CreatedCell = ({ row }) => (
  <p className={classNames(cn.cell, cn.textCenter, cn.overflow)}>
    {`${new Date(row.created_datetime_utc).toLocaleDateString(
      'en-US',
    )} ${new Date(row.created_datetime_utc).toLocaleTimeString('en-US', {
      hour12: false,
    })}`}
  </p>
);
CreatedCell.propTypes = {
  row: PropTypes.object,
};
