import { Loading } from 'components/common/loading/Loading';
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
