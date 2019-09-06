import { lazy } from 'react';

export const LoginPage = lazy(() => import('./pages/login/LoginPage'));
export const ProjectsPage = lazy(() => import('./pages/projects/ProjectsPage'));
export const JobsPage = lazy(() => import('./pages/jobs/JobsPage'));
export const DefinitionPage = lazy(() => import('./pages/jobDefinition/Definition/Definition'));
export const JobDefinitionPage = lazy(() =>
  import('./pages/jobDefinition/JobDefinitionPage'),
);
