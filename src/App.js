import React, { PureComponent, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { NotFound } from 'components/404/NotFound';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as Sentry from '@sentry/browser';
import { routes } from 'layout/routes';
import { PublicRoute } from 'layout/components/public-route/PublicRoute';
import { PrivateRoute } from 'layout/components/private-route/PrivateRoute';
import { Loading } from './components/loading/Loading';
import * as pages from './layout/async';

library.add(fab, far, fas);
const { REACT_APP_SENTRY_DSN, NODE_ENV, REACT_APP_VERSION } = process.env;

export class App extends PureComponent {
  componentDidMount() {
    if (NODE_ENV === 'production') {
      Sentry.init({
        dsn: REACT_APP_SENTRY_DSN,
        release: `andromeda@${REACT_APP_VERSION}`,
        environment: NODE_ENV,
      });
    }
  }

  componentDidCatch(error, errorInfo) {
    if (NODE_ENV === 'production') {
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        Sentry.captureException(error);
      });
    }
  }

  render() {
    return (
      <Router basename="/">
        <Suspense fallback={<Loading variant="light" />}>
          <Switch>
            <Redirect exact from={routes.ROOT} to={routes.PROJECTS} />
            <PublicRoute
              exact
              path={routes.LOGIN}
              component={pages.LoginPage}
            />
            <PrivateRoute
              exact
              path={routes.SANDBOX}
              component={pages.SandboxPage}
            />
            <PrivateRoute
              exact
              path={routes.PROJECTS}
              component={pages.ProjectsPage}
            />
            <PrivateRoute exact path={routes.JOBS} component={pages.JobsPage} />
            <PrivateRoute
              exact
              path={routes.DEFINITIONS}
              component={pages.DefinitionsPage}
            />
            <PrivateRoute
              exact
              path={routes.DEFINITION}
              component={pages.DefinitionPage}
            />
            <PrivateRoute exact path={routes.JOB} component={pages.JobPage} />
            <PrivateRoute
              exact
              path={routes.BATCHES}
              component={pages.Batches}
            />
            <PrivateRoute
              exact
              path={routes.SCHEDULE_BATCHES}
              component={pages.ScheduleBatches}
            />
            <PrivateRoute
              exact
              path={routes.BATCH_DEFINITIONS}
              component={pages.BatchDefinition}
            />
            <PrivateRoute component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
