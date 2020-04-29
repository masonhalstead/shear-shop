import React, { PureComponent, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NotFound } from 'components/404/NotFound';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { routes } from 'layout/routes';
import { Navigation } from 'components/navigation/Navigation';
import { Loading } from './components/loading/Loading';
import * as pages from './layout/async';
library.add(fab, far, fas);

export class App extends PureComponent {
  render() {
    return (
      <Router basename="/">
        <Navigation />
        <Suspense fallback={<Loading variant="light" />}>
          <Switch>
            <Route exact path={routes.ROOT} component={pages.LandingPage} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
