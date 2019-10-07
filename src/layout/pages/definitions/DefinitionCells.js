import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import cn from './Definitions.module.scss';

export const JobCell = ({ row, path }) => (
  <Link
    className={classNames(cn.jobCell, cn.overflow)}
    to={`/projects/${path[2]}/definitions/${path[4]}/definition/${row.job_definition_id}`}
  >
    {row.job_definition_name}
    {row.description && (
      <span className={cn.description}>{row.description}</span>
    )}
  </Link>
);
JobCell.propTypes = {
  row: PropTypes.object,
};

export const RequirementsCell = ({ row }) => (
  <p
    className={classNames(cn.cell, cn.overflow)}
  >{`${row.cpu} CPU, ${row.memory_gb} GB RAM`}</p>
);
RequirementsCell.propTypes = {
  row: PropTypes.object,
};

export const LocationCell = ({ row }) => (
  <p className={classNames(cn.cell, cn.textCenter, cn.overflow)}>
    {row.location_name}
  </p>
);
LocationCell.propTypes = {
  row: PropTypes.object,
};

export const TimeoutCell = ({ row }) => (
  <p className={classNames(cn.cell, cn.textRight, cn.overflow)}>
    {row.timeout_seconds}
  </p>
);
TimeoutCell.propTypes = {
  row: PropTypes.object,
};

export const ResultMethodCell = ({ row }) => (
  <p className={classNames(cn.cell, cn.overflow)}>{row.result_method_name}</p>
);
ResultMethodCell.propTypes = {
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
    {new Date(row.created_datetime_utc).toLocaleDateString('en-US')}
  </p>
);
CreatedCell.propTypes = {
  row: PropTypes.object,
};

export const RunCell = ({ row, callbacks }) => (
  <div className={cn.runCell} onClick={() => callbacks.openModal(row)}>
    <FontAwesomeIcon title="Unarchive" icon="play" />
  </div>
);
RunCell.propTypes = {
  row: PropTypes.object,
  callbacks: PropTypes.object,
};
