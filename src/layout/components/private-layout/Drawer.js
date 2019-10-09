import cn from './PrivateLayout.module.scss';
import { Divider, List, Drawer, ListItem, ListItemIcon } from '@material-ui/core';
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
      </ListItem>
    </List>
    <Divider
      className={classNames(cn.dividerClosed)}
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
      </ListItem>
    </List>
    <Divider
      className={classNames(cn.dividerClosed)}
    />
    <List classkey={{ root: cn.root }}>
      <ListItem
        button
        key="Batch Definition"
        onClick={() => {
          history.push(`/batch`);
        }}
      >
        <ListItemIcon>
          <FontAwesomeIcon
            icon="cogs"
            color="white"
            className={cn.fontIconAlign}
          />
        </ListItemIcon>
      </ListItem>
    </List>
    <Divider
      className={classNames(cn.dividerClosed)}
    />
    <List classkey={{ root: cn.root }}>
      <ListItem
        button
        key="Definition Filter"
        onClick={() => {
          history.push(`/definition-filter`);
        }}
      >
        <ListItemIcon>
          <FontAwesomeIcon
            icon="filter"
            color="white"
            className={cn.fontIconAlign}
          />
        </ListItemIcon>
      </ListItem>
    </List>
    <Divider
      className={classNames(cn.dividerClosed)}
    />
    <List classkey={{ root: cn.root }}>
      <ListItem
        button
        key="Jobs"
        onClick={() => {
          history.push(`/jobs`);
        }}
      >
        <ListItemIcon>
          <FontAwesomeIcon
            icon="cube"
            color="white"
            className={cn.fontIconAlign}
          />
        </ListItemIcon>
      </ListItem>
    </List>
    <Divider
      className={classNames(cn.dividerClosed)}
    />
    <List classkey={{ root: cn.root }}>
      <ListItem
        button
        key="Batches"
        onClick={() => {
          history.push(`/batches`);
        }}
      >
        <ListItemIcon>
          <FontAwesomeIcon
            icon="cubes"
            color="white"
            className={cn.fontIconAlign}
          />
        </ListItemIcon>
      </ListItem>
    </List>
    <Divider
      className={classNames(cn.dividerClosed)}
    />
    <List classkey={{ root: cn.root }}>
      <ListItem
        button
        key="Schedule Batches"
        onClick={() => {
          history.push(`/schedule-batches`);
        }}
      >
        <ListItemIcon>
          <FontAwesomeIcon
            icon="calendar"
            color="white"
            className={cn.fontIconAlign}
          />
        </ListItemIcon>
      </ListItem>
    </List>
    <Divider className={cn.dividerOpen} />
    <div className={cn.versionSmall}>{REACT_APP_VERSION}</div>
  </Drawer>
);
