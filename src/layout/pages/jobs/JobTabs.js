import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Paper, Tabs, Tab } from '@material-ui/core';
import cn from './Jobs.module.scss';

export class JobTabs extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    tab: PropTypes.number,
    handleChangeTab: PropTypes.func,
  };

  tab_style = {
    width: '190px',
    fontSize: 14,
    fontWeight: 400,
    minHeight: 44,
    textTransform: 'capitalize',
    borderBottom: '1px solid transparent',
    borderRight: '1px solid #cfd7e6',
  };

  render() {
    const { children, handleChangeTab, tab } = this.props;
    return (
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
              ...this.tab_style,
              color: tab === 0 ? '#3e96ed' : '#62738d',
            }}
            label="Last 24 Hours"
          />
          <Tab
            style={{
              ...this.tab_style,
              color: tab === 1 ? '#3e96ed' : '#62738d',
            }}
            label="Last 7 Days"
          />
          <Tab
            style={{
              ...this.tab_style,
              color: tab === 2 ? '#3e96ed' : '#62738d',
            }}
            label="Queued"
          />
          <Tab
            style={{
              ...this.tab_style,
              color: tab === 3 ? '#3e96ed' : '#62738d',
            }}
            label="Starting"
          />
          <Tab
            style={{
              ...this.tab_style,
              color: tab === 4 ? '#3e96ed' : '#62738d',
            }}
            label="Running"
          />
          <Tab
            style={{
              ...this.tab_style,
              color: tab === 5 ? '#3e96ed' : '#62738d',
            }}
            label="Complete"
          />
          <Tab
            style={{
              ...this.tab_style,
              color: tab === 6 ? '#3e96ed' : '#62738d',
            }}
            label="Stopped"
          />
          <Tab
            style={{
              ...this.tab_style,
              color: tab === 7 ? '#3e96ed' : '#62738d',
            }}
            label="Failed"
          />
        </Tabs>
        {children}
      </Paper>
    );
  }
}
