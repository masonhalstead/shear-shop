import { lazy } from 'react';

export const LoginPage = lazy(() => import('./pages/login/LoginPage'));
export const SandboxPage = lazy(() => import('./pages/sandbox/SandboxPage'));
export const ProjectsPage = lazy(() => import('./pages/projects/ProjectsPage'));
export const JobsPage = lazy(() => import('./pages/jobs/JobsPage'));
export const JobPage = lazy(() => import('./pages/job/JobPage'));

export const DefinitionPage = lazy(() =>
  import('./pages/definition/DefinitionPage'),
);
export const DefinitionsPage = lazy(() =>
  import('./pages/definitions/DefinitionsPage'),
);
