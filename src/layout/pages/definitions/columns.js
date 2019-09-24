import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from './Definitions.module.scss';

export const configureColumns = (openModal, openDefinition) => [
  {
    name: 'job_definition_name',
    label: 'Job',
    options: {
      filter: true,
      sort: true,
      display: true,
      customBodyRender: (value, tableMeta) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => openDefinition(tableMeta.rowData[7])}
        >
          <span className={cn.mainColumnText}>{value}</span>
        </div>
      ),
    },
  },
  {
    name: 'max_retries',
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
    name: 'location_name',
    label: 'Location',
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
    name: 'timeout_seconds',
    label: 'Timeout',
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
    name: 'result_method_name',
    label: 'Method',
    options: {
      filter: true,
      sort: true,
      display: true,
      customBodyRender: value => (
        <div>
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
    name: 'created_datetime_utc',
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
    name: 'job_definition_id',
    label: ' ',
    options: {
      viewColumns: false,
      customBodyRender: (value, tableMeta) => (
        <div
          style={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => openModal(tableMeta.rowData[0], value)}
        >
          <FontAwesomeIcon icon="play" color="#5db85b" />
        </div>
      ),
    },
  },
];
