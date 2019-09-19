import React from 'react';
import cn from './Job.module.scss';
export const configureHistoryColums = ()=> [
  {
    name: 'state',
    label: 'State',
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => (
        <div style={{ textAlign: 'left'}}>
          <div className={cn.columnMargin}>
            <div className={cn.circleTable} />
            <div>{value}</div>
          </div>
        </div>
      ),
    },
  },
  {
    name: 'timestamp',
    label: 'Timestamp',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'id',
    label: ' ',
    options: {
      display: 'none',
    },
  },
  {
    name: 'type',
    label: ' ',
    options: {
      display: 'none',
    },
  },
];

export const data = [
  {
    state: '344523 Assigned to server',
    timestamp: '8/13/2019 23:03:32',
    id: 1,
    type: 'run',
  },
  {
    state: '344523 Assigned to server',
    timestamp: '8/13/2019 23:03:32',
    type: 'run',

    id: 1,
  },  {
    state: '344523 Assigned to server',
    timestamp: '8/13/2019 23:03:32',
    type: 'run',

    id: 1,

  },  {
    state: '344523 Assigned to server',
    timestamp: '8/13/2019 23:03:32',
    type: 'run',

    id: 1,
  },  {
    state: '344523 Assigned to server',
    timestamp: '8/13/2019 23:03:32',
    type: 'run',

    id: 1,
  },  {
    state: '344523 Assigned to server',
    timestamp: '8/13/2019 23:03:32',
    type: 'run',

    id: 1,
  },  {
    state: '344523 Assigned to server',
    timestamp: '8/13/2019 23:03:32',
    type: 'run',

    id: 1,
  },
];
