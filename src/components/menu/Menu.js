import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Tooltip } from 'components/tooltip/Tooltip';
import cn from './Menu.module.scss';
const { PUBLIC_URL } = process.env;

export const Menu = React.memo(({ project, open, width, handleToggleMenu }) => (
  <div className={cn.menuContainer} style={{ width }}>
    <div className={cn.logoWrapper}>
      {!open && (
        <img
          className={cn.logo}
          src={`${PUBLIC_URL}/brain-light.svg`}
          alt="Andromeda"
        />
      )}
      {open && (
        <img
          className={cn.logoFull}
          src={`${PUBLIC_URL}/logo-light.svg`}
          alt="Andromeda"
        />
      )}
    </div>
    <div>
      <Link to="/projects" className={cn.linkWrapper}>
        <FontAwesomeIcon icon="folder-open" />
        <MenuOptions title="Projects" open={open} />
      </Link>
      {project.project_id && (
        <>
          <Link
            to={`/projects/${project.project_id}/jobs/24`}
            className={cn.linkWrapper}
          >
            <div className={cn.iconWrapper}>
              <FontAwesomeIcon icon={['fas', 'cube']} />
            </div>
            <MenuOptions title="Jobs" open={open} />
          </Link>
          <Link
            to={`/projects/${project.project_id}/batches/unarchived`}
            className={cn.linkWrapper}
          >
            <div className={cn.iconWrapper}>
              <FontAwesomeIcon icon={['fas', 'cubes']} />
            </div>
            <MenuOptions title="Batches" open={open} />
          </Link>
          <Link
            to={`/projects/${project.project_id}/definitions/unarchived`}
            className={cn.linkWrapper}
          >
            <div className={cn.iconWrapper}>
              <FontAwesomeIcon icon={['fas', 'cog']} />
            </div>
            <MenuOptions title="Job Definitions" open={open} />
          </Link>
          <Link
            to={`/projects/${project.project_id}/batches/definitions/unarchived`}
            className={cn.linkWrapper}
          >
            <div className={cn.iconWrapper}>
              <FontAwesomeIcon icon={['fas', 'cogs']} />
            </div>
            <MenuOptions title="Batch Definitions" open={open} />
          </Link>
          <Link
            to={`/projects/${project.project_id}/schedule/unarchived`}
            className={cn.linkWrapper}
          >
            <div className={cn.iconWrapper}>
              <FontAwesomeIcon icon={['fas', 'calendar-week']} />
            </div>
            <MenuOptions title="Schedule Batches" open={open} />
          </Link>
        </>
      )}
    </div>
    <div className={cn.expandWrapper} onClick={handleToggleMenu}>
      <div className={cn.iconWrapper}>
        <FontAwesomeIcon icon={['fas', 'chevron-right']} />
      </div>
      <MenuOptions title="Toggle Menu" open={open} />
    </div>
    <div className={cn.versionWrapper}>v1.1.0</div>
  </div>
));
Menu.defaultProps = {
  project: {},
  open: false,
  width: '75px',
  handleToggleMenu() {},
};
Menu.propTypes = {
  project: PropTypes.object,
  open: PropTypes.bool,
  width: PropTypes.string,
  handleToggleMenu: PropTypes.func,
};

const MenuOptions = ({ open, title }) => (
  <>
    {open && <p className={cn.menuTitle}>{title}</p>}
    {!open && <Tooltip title={title} />}
  </>
);
MenuOptions.defaultProps = {
  open: false,
  title: '',
};
MenuOptions.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
};
