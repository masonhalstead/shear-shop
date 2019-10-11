import { combineReducers } from 'redux';
import { batchReducer } from './batchReducer';
import { batchesReducer } from './batchesReducer';
import { jobReducer } from './jobReducer';
import { jobsReducer } from './jobsReducer';
import { definitionReducer } from './definitionReducer';
import { definitionsReducer } from './definitionsReducer';
import { parametersReducer } from './parametersReducer';
import { userReducer } from './userReducer';
import { lookupsReducer } from './lookupsReducer';
import { settingsReducer } from './settingsReducer';
import { projectsReducer } from './projectsReducer';
import { projectReducer } from './projectReducer';

const rootReducer = combineReducers({
  batch: batchReducer,
  batches: batchesReducer,
  job: jobReducer,
  jobs: jobsReducer,
  definition: definitionReducer,
  job_definition: definitionReducer,
  definitions: definitionsReducer,
  parameters: parametersReducer,
  lookups: lookupsReducer,
  user: userReducer,
  settings: settingsReducer,
  projects: projectsReducer,
  project: projectReducer,
});

export default rootReducer;
