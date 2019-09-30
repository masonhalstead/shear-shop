import cn from './PrivateLayout.module.scss';
import { Divider, List, Drawer, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import clsx from 'clsx';

const { PUBLIC_URL, REACT_APP_VERSION } = process.env;

export const DrawerWrapper = ({open, classes, handleDrawerOpen, history, id}) => (
  <Drawer
    className={clsx(classes.drawer, {
      [classes.drawerOpen]: open,
      [classes.drawerClose]: !open,
    })}
    classes={{
      paper: clsx({
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      }),
    }}
    variant="permanent"
    anchor="left"
    open={open}
  >
    <div className={classes.drawerHeader}>
      <img
        className={open ? cn.imageMdBig : cn.imageMd}
        src={`${PUBLIC_URL}/${
          open ? 'logo-light.svg' : 'brain-light.svg'
          }`}
        alt="Andromeda"
      />
    </div>
    <Divider className={cn.dividerOpen} />
    <List classkey={{ root: cn.root }}>
      <ListItem
        button
        key="Projects"
        onClick={() => {
          history.push(`/projects`);
        }}
      >
        <ListItemIcon>
          <FontAwesomeIcon
            icon="folder-open"
            color="white"
            className={cn.fontIconAlign}
          />
        </ListItemIcon>
        {open && (
          <ListItemText
            primary="Projects"
            classes={{ primary: cn.rootColor, root: cn.textRoot }}
          />
        )}
      </ListItem>
    </List>
    <Divider
      className={classNames(
        { [cn.dividerOpen]: open },
        { [cn.dividerClosed]: !open },
      )}
    />
    <List classkey={{ root: cn.root }}>
      <ListItem
        button
        key="Jobs"
        onClick={() => {
          history.push(`/projects/${id}/jobs/24`);
        }}
      >
        <ListItemIcon>
          <FontAwesomeIcon
            icon="cog"
            color="white"
            className={cn.fontIconAlign}
          />
        </ListItemIcon>
        {open && (
          <ListItemText
            primary="Jobs"
            classes={{ primary: cn.rootColor, root: cn.textRoot }}
          />
        )}
      </ListItem>
      {open && (
        <div className={cn.deepMenuItems}>
          <ListItem
            classes={{ root: cn.rootColor }}
            button
            onClick={() => {
              history.push(`/projects/${id}/jobs/24`);
            }}
          >
            Last 24 Hours
          </ListItem>
          <ListItem
            classes={{ root: cn.rootColor }}
            button
            onClick={() => {
              history.push(`/projects/${id}/jobs/7`);
            }}
          >
            Last 7 Days
          </ListItem>
          <ListItem
            classes={{ root: cn.rootColor }}
            button
            onClick={() => {
              history.push(`/projects/${id}/jobs/queued`);
            }}
          >
            Queued
          </ListItem>
          <ListItem
            classes={{ root: cn.rootColor }}
            button
            onClick={() => {
              history.push(`/projects/${id}/jobs/starting`);
            }}
          >
            Starting
          </ListItem>
          <ListItem
            classes={{ root: cn.rootColor }}
            button
            onClick={() => {
              history.push(`/projects/${id}/jobs/running`);
            }}
          >
            Running
          </ListItem>
          <ListItem
            classes={{ root: cn.rootColor }}
            button
            onClick={() => {
              history.push(`/projects/${id}/jobs/complete`);
            }}
          >
            Complete
          </ListItem>
          <ListItem
            classes={{ root: cn.rootColor }}
            button
            onClick={() => {
              history.push(`/projects/${id}/jobs/stopped`);
            }}
          >
            Stopped
          </ListItem>
          <ListItem
            classes={{ root: cn.rootColor }}
            button
            onClick={() => {
              history.push(`/projects/${id}/jobs/failed`);
            }}
          >
            Failed
          </ListItem>
        </div>
      )}
    </List>
    <Divider
      className={classNames(
        { [cn.dividerOpen]: open },
        { [cn.dividerClosed]: !open },
      )}
    />
    <List classkey={{ root: { height: '34px !important' } }}>
      <ListItem
        button
        key="Job Definitions"
        onClick={() => {
          history.push(`/projects/${id}/definitions/unarchived`);
        }}
      >
        <ListItemIcon>
          <FontAwesomeIcon
            icon="sliders-h"
            color="white"
            className={cn.fontIconAlign}
          />
        </ListItemIcon>
        {open && (
          <ListItemText
            primary="Job Definitions"
            classes={{ primary: cn.rootColor, root: cn.textRoot }}
          />
        )}
      </ListItem>
      {open && (
        <div className={cn.deepMenuItems}>
          <ListItem
            classes={{ root: cn.rootColor }}
            button
            onClick={() => {
              history.push(`/projects/${id}/definitions/unarchived`);
            }}
          >
            Unarchived
          </ListItem>
          <ListItem
            classes={{ root: cn.rootColor }}
            button
            onClick={() => {
              history.push(`/projects/${id}/definitions/archived`);
            }}
          >
            Archived
          </ListItem>
        </div>
      )}
    </List>
    <Divider className={cn.dividerOpen} />
    {!open && (
      <List classkey={{ root: cn.root }}>
        <ListItem button key="Chevron" onClick={handleDrawerOpen}>
          <ListItemIcon>
            <FontAwesomeIcon
              icon="chevron-right"
              color="white"
              className={cn.fontIconAlignChevron}
            />
          </ListItemIcon>
        </ListItem>
      </List>
    )}
    <div className={cn.versionSmall}>{REACT_APP_VERSION}</div>
    {open && (
      <div className={cn.version} onClick={handleDrawerOpen}>
        {REACT_APP_VERSION}
        <div className={cn.closeButton}>
          <FontAwesomeIcon
            icon="times"
            color="white"
            className={cn.fontIconAlignChevron}
          />
        </div>
      </div>
    )}
  </Drawer>
);
