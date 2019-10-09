import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components/loading/Loading';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Alert } from 'components/Alert';
import { getProjects as getProjectsAction } from 'ducks/operators/projects';
import * as Sentry from '@sentry/browser';
import { Menu } from 'components/menu/Menu';
import  Navigation from 'components/navigation/Navigation';
import cn from './PrivateLayout.module.scss';

export class PrivateLayoutWrapper extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    history: PropTypes.object,
    children: PropTypes.any,
    setHamburger: PropTypes.func,
  };

  componentDidMount() {
    const { getProjects } = this.props;
    try {
      getProjects();
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  render() {
    const { loading, project } = this.props;
    return (
      <div className={cn.privateLayout}>
        <Menu project={project}/>
        <div className={cn.content}>
          <Navigation />
          <div className={cn.views}>{this.props.children}</div>
        </div>
        <Alert />
        {loading && <Loading variant="dark" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.settings.loading,
  project: state.settings.project,
});

const mapDispatchToProps = {
  getProjects: getProjectsAction,
};

const PrivateLayout = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PrivateLayoutWrapper),
);
export default PrivateLayout;
