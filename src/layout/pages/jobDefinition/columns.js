import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from './JobDefinitionPage.module.scss';

export const configureColumns = (openModal, openDefinition) => [
  {
    name: 'jobdefinition',
    label: 'Job',
    options: {
      filter: true,
      sort: true,
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
    name: 'requirements',
    label: 'Requirements',
    options: {
      filter: true,
      sort: true,
      customBodyRender: value => (
        <div style={{ textAlign: 'center' }}>
          <span className={cn.textColor}>{value}</span>
        </div>
      ),
    },
  },
  {
    name: 'location',
    label: 'Location',
    options: {
      filter: true,
      sort: true,
      customBodyRender: value => (
        <div style={{ textAlign: 'center' }}>
          <span className={cn.textColor}>{value}</span>
        </div>
      ),
    },
  },
  {
    name: 'timeout',
    label: 'Timeout',
    options: {
      filter: true,
      sort: true,
      customBodyRender: value => (
        <div style={{ textAlign: 'right' }}>
          <span className={cn.textColor}>{value}</span>
        </div>
      ),
    },
  },
  {
    name: 'method',
    label: 'Method',
    options: {
      filter: true,
      sort: true,
      customBodyRender: value => (
        <div>
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
      customBodyRender: (value, tableMeta) => (
        <div
          style={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => openModal(tableMeta.rowData[0], value)}
        >
          <FontAwesomeIcon icon="play" color="#818fa3" />
        </div>
      ),
    },
  },
];
