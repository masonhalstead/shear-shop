import { Loading } from 'components/loading/Loading';
import React from 'react';

export const loadingColumn = [
  {
    name: '',
    disable: true,
    options: {
      customBodyRender: () => <Loading margin="normal-margin" />,
    },
  },
];
