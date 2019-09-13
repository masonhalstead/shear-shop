import { lazy } from 'react';

export const LoginPage = lazy(() => import('./pages/login/LoginPage'));
export const ProjectsPage = lazy(() => import('./pages/projects/ProjectsPage'));
export const JobsPage = lazy(() => import('./pages/jobs/JobsPage'));

export const DefinitionPage = lazy(() =>
  import('./pages/definition/DefinitionPage'),
);
export const DefinitionsPage = lazy(() =>
  import('./pages/definitions/DefinitionsPage'),
);
