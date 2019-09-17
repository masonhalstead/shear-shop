import * as constants from 'ducks/types';

// ------ USER ACTIONS ------ //
export const loginUser = user => ({
  type: constants.LOGIN_USER,
  payload: user,
});
export const updateUser = user => ({
  type: constants.UPDATE_USER,
  payload: user,
});
export const logoutUser = () => ({
  type: constants.LOGOUT_USER,
});

// ------ LOOKUPS ACTIONS ------ //
export const setLookups = lookups => ({
  type: constants.SET_LOOKUPS,
  payload: lookups,
});
export const clearLookups = () => ({
  type: constants.CLEAR_LOOKUPS,
});

// ------ SETTINGS ACTIONS ------ //
export const setErrorMessage = message => ({
  type: constants.SET_ERROR_MESSAGE,
  payload: message,
});
export const setLoading = loading => ({
  type: constants.SET_LOADING,
  payload: loading,
});

// ------ JOB ACTIONS ------ //
export const setJob = job => ({
  type: constants.SET_JOB,
  payload: job,
});
export const clearJob = () => ({
  type: constants.CLEAR_JOB,
});

// ------ JOBS ACTIONS ------ //
export const setJobs = jobs => ({
  type: constants.SET_JOBS,
  payload: jobs,
});
export const clearJobs = () => ({
  type: constants.CLEAR_JOBS,
});

// ------ JOB DEFINTIONS ACTIONS ------ //
export const setJobDefinitions = job_defs => ({
  type: constants.SET_JOB_DEFINITIONS,
  payload: job_defs,
});
export const clearJobDefinitions = () => ({
  type: constants.CLEAR_JOB_DEFINITIONS,
});

// ------ JOB DEFINTION ACTIONS ------ //
export const setJobDefinition = job_def => ({
  type: constants.SET_JOB_DEFINITION,
  payload: job_def,
});
export const clearJobDefinition = () => ({
  type: constants.CLEAR_JOB_DEFINITION,
});

// ------ BATCH ACTIONS ------ //
export const setBatch = batch => ({
  type: constants.SET_BATCH,
  payload: batch,
});
export const clearBatch = () => ({
  type: constants.CLEAR_BATCH,
});

// ------ BATCHES ACTIONS ------ //
export const setBatches = batches => ({
  type: constants.SET_BATCHES,
  payload: batches,
});
export const clearBatches = () => ({
  type: constants.CLEAR_BATCHES,
});

// ------ CONTAINER ACTIONS ------ //
export const setContainer = container => ({
  type: constants.SET_CONTAINER,
  payload: container,
});
export const clearContainer = () => ({
  type: constants.CLEAR_CONTAINER,
});

// ------ PARAMETERS ACTIONS ------ //
export const setParameters = parameters => ({
  type: constants.SET_PARAMETERS,
  payload: parameters,
});
export const clearParameters = () => ({
  type: constants.CLEAR_PARAMETERS,
});

export const setHamburger = settings => ({
  type: constants.SET_HAMBURGER,
  payload: settings,
});

export const setProjects = projects => ({
  type: constants.SET_PROJECTS,
  payload: projects,
});

export const setProject = project => ({
  type: constants.SET_PROJECT,
  payload: project,
});
