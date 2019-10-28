import { Tab, Tabs } from '@material-ui/core';
import cn from './Job.module.scss';
import React from 'react';
import PropTypes from 'prop-types';

export const JobTabs = React.memo(({ tab, handleChangeTab, tabStyle }) => (
  <Tabs
    value={tab}
    indicatorColor="primary"
    textColor="primary"
    classes={{
      root: cn.tabsWrapper,
    }}
    onChange={handleChangeTab}
    TabIndicatorProps={{
      style: {
        backgroundColor: '#3e96ed',
      },
    }}
  >
    <Tab
      style={{
        ...tabStyle,
        color: tab === 0 ? '#3e96ed' : '#62738d',
      }}
      label="STDOUT"
    />
    <Tab
      style={{
        ...tabStyle,
        color: tab === 1 ? '#3e96ed' : '#62738d',
      }}
      label="Inputs"
    />
    <Tab
      style={{
        ...tabStyle,
        color: tab === 2 ? '#3e96ed' : '#62738d',
      }}
      label="Outputs"
    />
    <Tab
      style={{
        ...tabStyle,
        color: tab === 3 ? '#3e96ed' : '#62738d',
      }}
      label="History"
    />
  </Tabs>
));

JobTabs.propTypes = {
  children: PropTypes.any,
  tab: PropTypes.number,
  handleChangeTab: PropTypes.func,
};
