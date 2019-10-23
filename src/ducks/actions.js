import * as constants from 'ducks/types';

// ------ USER ACTIONS ------ //
export const loginUser = user => ({
  type: constants.LOGIN_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: constants.LOGOUT_USER,
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
export const setMenu = ({ width, open }) => ({
  type: constants.SET_MENU,
  width,
  open,
});

// ------ JOB ACTIONS ------ //
export const setJob = job => ({
  type: constants.SET_JOB,
  payload: job,
});

// ------ JOB ACTIONS ------ //
export const setJobLogs = logs => ({
  type: constants.SET_JOB_LOGS,
  payload: logs,
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
export const clearDefinition = () => ({
  type: constants.CLEAR_JOB_DEFINITION,
});

// ------ BATCH ACTIONS ------ //
export const setBatch = batch => ({
  type: constants.SET_BATCH,
  payload: batch,
});

export const setBatchRow = batch => ({
  type: constants.EDIT_BATCH_ROW,
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
// ------ BATCHES ACTIONS ------ //
export const setBatchDefinitions = batches => ({
  type: constants.SET_BATCH_DEFINITIONS,
  payload: batches,
});

export const setScheduleBatches = batches => ({
  type: constants.SET_SCHEDULE_BATCHES,
  payload: batches,
});
export const clearBatchDefinitions = () => ({
  type: constants.CLEAR_BATCH_DEFINITIONS,
});

// ------ CONTAINER ACTIONS ------ //
export const setContainer = container => ({
  type: constants.SET_CONTAINER,
  payload: container,
});
export const setContainers = containers => ({
  type: constants.SET_CONTAINERS,
  payload: containers,
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

export const setProjects = projects => ({
  type: constants.SET_PROJECTS,
  payload: projects,
});

export const setProject = project => ({
  type: constants.SET_PROJECT,
  payload: project,
});

export const clearProject = project => ({
  type: constants.CLEAR_PROJECT,
  payload: project,
});

export const toggleAlertAction = open => ({
  type: constants.SHOW_ALERT,
  payload: open,
});

export const toggleModal = modal => ({
  type: constants.TOGGLE_MODAL,
  payload: modal,
});

export const setCurrentJobs = jobs => ({
  type: constants.SET_CURRENT_JOBS,
  payload: jobs,
});

export const setCurrentDefinitions = definitions => ({
  type: constants.SET_CURRENT_DEFINITIONS,
  payload: definitions,
});

export const triggerSaveDefiniton = definition => ({
  type: constants.SAVE_DEFINITION,
  payload: definition,
});

export const definitionChanged = definition => ({
  type: constants.DEFINITION_CHANGED,
  payload: definition,
});
