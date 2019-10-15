import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import cn from './Batches.module.scss';

export const BatchNameCell = ({ row, path }) => (
  <Link
    className={classNames(cn.jobCell, cn.overflow)}
    to={`/projects/${path[2]}/definitions/${path[4]}/definition/${
      row.batch_id
    }`}
  >
    {row.batch_name}
  </Link>
);
BatchNameCell.propTypes = {
  row: PropTypes.object,
};

export const NumberOfJobsCell = ({ row }) => (
  <p
    className={classNames(cn.cell, cn.overflow)}
  >200</p>
);
NumberOfJobsCell.propTypes = {
  row: PropTypes.object,
};

export const QueuedCell = ({ row }) => (
  <p
    className={classNames(cn.cell, cn.overflow)}
  >200</p>
);
QueuedCell.propTypes = {
  row: PropTypes.object,
};

export const StartingCell = ({ row }) => (
  <p
    className={classNames(cn.cell, cn.overflow)}
  >200</p>
);
StartingCell.propTypes = {
  row: PropTypes.object,
};

export const StoppedCell = ({ row }) => (
  <p
    className={classNames(cn.cell, cn.overflow)}
  >200</p>
);
StoppedCell.propTypes = {
  row: PropTypes.object,
};

export const RunningCell = ({ row }) => (
  <p
    className={classNames(cn.cell, cn.overflow)}
  >200</p>
);
RunningCell.propTypes = {
  row: PropTypes.object,
};

export const CompletedCell = ({ row }) => (
  <p
    className={classNames(cn.cell, cn.overflow)}
  >200</p>
);
CompletedCell.propTypes = {
  row: PropTypes.object,
};

export const FailedCell = ({ row }) => (
  <p
    className={classNames(cn.cell, cn.overflow)}
  >200</p>
);
FailedCell.propTypes = {
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

export const StopCell = ({ row, callbacks }) => (
  <div className={cn.runCell} onClick={() => callbacks.stopBatch(row)}>
    <FontAwesomeIcon title="Stop" icon="stop" />
  </div>
);
StopCell.propTypes = {
  row: PropTypes.object,
  callbacks: PropTypes.object,
};
