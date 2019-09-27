import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from './Jobs.module.scss';

const getClassForState = state => {
  if (state === 'failed') {
    return cn.stateRed;
  }
  if (state === 'queued') {
    return cn.stateGrey;
  }

  return cn.stateGreen;
};

export const configureColumns = (openDetailPage, openBatch) => [
  {
    name: 'job_definition_name',
    label: 'Job',
    options: {
      filter: true,
      sort: true,
      display: true,
      customBodyRender: (value, tableMeta) => (
        <div style={{ cursor: 'pointer' }} onClick={() => openDetailPage(tableMeta.rowData[6])}>
          <span className={cn.mainColumnText}>{value}</span>
        </div>
      ),
    },
  },
  {
    name: 'job_state_name',
    label: 'State',
    options: {
      filter: true,
      sort: true,
      display: true,
      customBodyRender: value => (
        <div style={{ textAlign: 'center' }}>
          <div className={getClassForState(value)}>
            {value.charAt(0).toUpperCase() + value.slice(1).toUpperCase()}
          </div>
        </div>
      ),
    },
  },
  {
    name: 'duration_seconds',
    label: 'Duration',
    options: {
      filter: true,
      sort: true,
      display: true,
      customBodyRender: value => (
        <div style={{ textAlign: 'right' }}>
          <span className={cn.textColor}>{value}</span>
        </div>
      ),
    },
  },
  {
    name: 'required_gpu',
    label: 'Requirements',
    options: {
      filter: true,
      sort: true,
      display: true,
      customBodyRender: value => (
        <div style={{ textAlign: 'center' }}>
          <span className={cn.textColor}>{value}</span>
        </div>
      ),
    },
  },
  {
    name: 'created_by',
    label: 'Created By',
    options: {
      filter: true,
      sort: true,
      display: true,
      customBodyRender: value => (
        <div style={{ textAlign: 'center' }}>
          <span className={cn.textColor}>{value}</span>
        </div>
      ),
    },
  },
  {
    name: 'start_datetime_utc',
    label: 'Created',
    options: {
      filter: true,
      sort: true,
      display: true,
      customBodyRender: value => (
        <div style={{ textAlign: 'center' }}>
          <span className={cn.textColor}>{new Date(value).toLocaleDateString("en-US")}</span>
        </div>
      ),
    },
  },
  {
    name: 'job_id',
    label: ' ',
    options: {
      viewColumns: false,
      customBodyRender: value => (
        <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => openBatch(value)}>
          <FontAwesomeIcon icon="edit" color="#818fa3" />
        </div>
      ),
    },
  },
  {
    name: 'job_id',
    label: ' ',
    options: {
      viewColumns: false,
      customBodyRender: (value, tableMeta) => (
        <div style={{ textAlign: 'center', cursor: 'pointer' }}>
          {tableMeta.rowData[1] === 'running' ||
          tableMeta.rowData[1] === 'queued' ? (
            <FontAwesomeIcon icon="stop" color="#d9534f" />
          ) : (
            <FontAwesomeIcon icon="sync" color="#818fa3" />
          )}
        </div>
      ),
    },
  },
];
