import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components/loading/Loading';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Alert } from 'components/Alert';
import { Modals } from 'layout/components/modals/Modals';
import { setMenu as setMenuAction } from 'ducks/actions';
import { getProjects as getProjectsAction } from 'ducks/operators/projects';
import * as Sentry from '@sentry/browser';
import { Menu } from 'components/menu/Menu';
import { Navigation } from 'components/navigation/Navigation';
import cn from './PrivateLayout.module.scss';

export class PrivateLayoutWrapper extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    project: PropTypes.object,
    width: PropTypes.string,
    open: PropTypes.bool,
    children: PropTypes.any,
    setMenu: PropTypes.func,
    getProjects: PropTypes.func,
  };

  componentDidMount() {
    const { getProjects } = this.props;
    try {
      getProjects();
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  handleToggleMenu = () => {
    const { setMenu, open } = this.props;
    if (!open) {
      setMenu({ open: true, width: '185px' });
    } else {
      setMenu({ open: false, width: '75px' });
    }
  };

  render() {
    const { loading, project, width, open, children } = this.props;
    return (
      <div className={cn.privateLayout}>
        <Menu
          project={project}
          width={width}
          open={open}
          handleToggleMenu={this.handleToggleMenu}
        />
        <div className={cn.content} style={{ width: `calc(100% - ${width})` }}>
          <Navigation />
          <Scrollbars
            className={cn.scroll}
            autoHeight
            autoHeightMin="calc(100vh - 47px)"
          >
            <div className={cn.views}> {children}</div>
          </Scrollbars>
        </div>
        <Alert />
        {loading && <Loading variant="dark" />}
        <Modals internal />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.settings.loading,
  project: state.project,
  open: state.settings.open,
  width: state.settings.width,
});

const mapDispatchToProps = {
  getProjects: getProjectsAction,
  setMenu: setMenuAction,
};

const PrivateLayout = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PrivateLayoutWrapper),
);
export default PrivateLayout;
