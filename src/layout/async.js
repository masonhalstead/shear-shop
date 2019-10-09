import { lazy } from 'react';

export const LoginPage = lazy(() => import('./pages/login/LoginPage'));
export const SandboxPage = lazy(() => import('./pages/sandbox/SandboxPage'));
export const ProjectsPage = lazy(() => import('./pages/projects/ProjectsPage'));
export const JobsPage = lazy(() => import('./pages/jobs/JobsPage'));
export const JobPage = lazy(() => import('./pages/job/JobPage'));
export const Batches = lazy(() => import('./pages/batches/Batches'));
export const BatchDefinition = lazy(() => import('./pages/batches/batch-definition/BatchDefinition'));
export const ScheduleBatches = lazy(() => import('./pages/batches/schedule-batches/ScheduleBatches'));

export const DefinitionPage = lazy(() =>
  import('./pages/definition/DefinitionPage'),
);
export const DefinitionsPage = lazy(() =>
  import('./pages/definitions/DefinitionsPage'),
);
