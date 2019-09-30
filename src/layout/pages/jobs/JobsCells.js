import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import cn from './Jobs.module.scss';

export const JobCell = ({ row }) => (
  <Link
    className={classNames(cn.jobCell, cn.overflow)}
    to={`/projects/${row.project_id}/jobs/${row.job_id}/job`}
  >
    {row.job_id} {row.batch_descriptor && <span>: {row.batch_descriptor}</span>}
  </Link>
);
JobCell.propTypes = {
  row: PropTypes.object,
};

export const StateCell = ({ row }) => (
  <p
    className={classNames(cn.cell, cn.textCenter, {
      [cn.stateRed]: [1].includes(row.job_state_id),
      [cn.stateGreen]: [2, 7, 8].includes(row.job_state_id),
      [cn.stateGrey]: [3].includes(row.job_state_id),
    })}
  >
    {row.job_state_name}
  </p>
);
StateCell.propTypes = {
  row: PropTypes.object,
};

export const DurationCell = ({ row }) => (
  <p className={classNames(cn.cell, cn.textRight)}>{row.duration_seconds}</p>
);
DurationCell.propTypes = {
  row: PropTypes.object,
};

export const RequirementsCell = ({ row }) => (
  <p
    className={classNames(cn.cell, cn.textCenter, cn.overflow)}
  >{`${row.required_cpu} CPU, ${row.required_memory_gb} GB RAM`}</p>
);
RequirementsCell.propTypes = {
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
    {new Date(row.start_datetime_utc).toLocaleDateString('en-US')}
  </p>
);
CreatedCell.propTypes = {
  row: PropTypes.object,
};

export const EditBatchCell = ({ row, callbacks }) => (
  <div className={cn.actionCell} onClick={() => callbacks.openModal(row)}>
    <FontAwesomeIcon title="Edit Batch Descriptor" icon="edit" />
  </div>
);
EditBatchCell.propTypes = {
  row: PropTypes.object,
  callbacks: PropTypes.object,
};

export const RunJobCell = ({ row, callbacks }) => (
  <div className={cn.actionCell} onClick={() => callbacks.openModal(row)}>
    <FontAwesomeIcon title="Restart Job" icon="sync-alt" />
  </div>
);
RunJobCell.propTypes = {
  row: PropTypes.object,
  callbacks: PropTypes.object,
};