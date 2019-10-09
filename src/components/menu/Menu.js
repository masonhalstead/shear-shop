import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Tooltip } from 'components/tooltip/Tooltip';
import cn from './Menu.module.scss';
const { PUBLIC_URL } = process.env;
export const Menu = () => {
  return (
    <div className={cn.menuContainer}>
      <div className={cn.logoWrapper}>
        <img
          className={cn.logo}
          src={`${PUBLIC_URL}/brain-light.svg`}
          alt="Andromeda"
        />
      </div>
      <div>
        <Link to="/projects" className={cn.linkWrapper}>
          <FontAwesomeIcon icon="folder-open" />
          <Tooltip title="Projects" />
        </Link>
        <Link to="/projects/1/jobs/24" className={cn.linkWrapper}>
          <FontAwesomeIcon icon={['fas', 'cube']} />
          <Tooltip title="Jobs" />
        </Link>
        <Link to="/projects/1/batches/unarchived" className={cn.linkWrapper}>
          <FontAwesomeIcon icon={['fas', 'cubes']} />
          <Tooltip title="Batches" />
        </Link>
        <Link
          to="/projects/1/definitions/unarchived"
          className={cn.linkWrapper}
        >
          <FontAwesomeIcon icon={['fas', 'cog']} />
          <Tooltip title="Job Definitions" />
        </Link>
        <Link to="/projects/1/batches/unarchived" className={cn.linkWrapper}>
          <FontAwesomeIcon icon={['fas', 'cogs']} />
          <Tooltip title="Batch Definitions" />
        </Link>
        <Link to="/projects/1/schedule/unarchived" className={cn.linkWrapper}>
          <FontAwesomeIcon icon={['fas', 'calendar-week']} />
          <Tooltip title="Schedule Batches" />
        </Link>
      </div>
      <div className={cn.versionWrapper}>v1.1.0</div>
    </div>
  );
};
