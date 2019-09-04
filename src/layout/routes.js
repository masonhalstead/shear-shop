export const routes = {
  ROOT: '/',
  LOGIN: '/login',
  PROJECTS: '/projects',
  PROJECT: '/projects/:project_id',
  BATCHES: '/projects/:project_id/batches',
  BATCH: '/projects/:project_id/batches/:batch_id',
  JOBS: '/projects/:project_id/jobs/:filter',
  JOB: '/projects/:project_id/jobs/:job_id',
  JOB_DEFINITIONS: '/projects/:project_id/definitions/:filter',
  JOB_DEFINITION: '/projects/:project_id/definitions/:def_id/definition',
};
