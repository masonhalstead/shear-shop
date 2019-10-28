import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Tabs, Tab } from '@material-ui/core';
import cn from './Definitions.module.scss';

const tab_style = {
  width: '300px',
  fontSize: 14,
  fontWeight: 400,
  minHeight: 44,
  textTransform: 'capitalize',
  borderBottom: '1px solid transparent',
  borderRight: '1px solid #cfd7e6',
};

export const DefinitionsTabs = React.memo(
  ({ children, handleChangeTab, tab }) => (
    <Paper className={cn.contentAlignSecond}>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        classes={{ root: cn.tabsWrapper }}
        onChange={handleChangeTab}
        TabIndicatorProps={{
          style: {
            backgroundColor: '#3e96ed',
          },
        }}
      >
        <Tab
          style={{
            ...tab_style,
            color: tab === 0 ? '#3e96ed' : '#62738d',
          }}
          label="Unarchived"
        />
        <Tab
          style={{
            ...tab_style,
            color: tab === 1 ? '#3e96ed' : '#62738d',
          }}
          label="Archived"
        />
      </Tabs>
      {children}
    </Paper>
  ),
);

DefinitionsTabs.propTypes = {
  children: PropTypes.any,
  tab: PropTypes.number,
  handleChangeTab: PropTypes.func,
};
