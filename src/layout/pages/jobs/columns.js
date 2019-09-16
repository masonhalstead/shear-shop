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

export const configureColumns = (openModal, openDefinition) => [
  {
    name: 'jobname',
    label: 'Job',
    options: {
      filter: true,
      sort: true,
      display: true,
      customBodyRender: value => (
        <div style={{ cursor: 'pointer' }}>
          <span className={cn.mainColumnText}>{value}</span>
        </div>
      ),
    },
  },
  {
    name: 'state',
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
    name: 'duration',
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
    name: 'requirements',
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
    name: 'createdBy',
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
    name: 'created',
    label: 'Created',
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
    name: 'id',
    label: ' ',
    options: {
      viewColumns: false,
      customBodyRender: value => (
        <div style={{ textAlign: 'center', cursor: 'pointer' }}>
          <FontAwesomeIcon icon="edit" color="#818fa3" />
        </div>
      ),
    },
  },
  {
    name: 'id',
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
