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
import { containerReducer } from './containerReducer';
import { hamburgerReducer } from './hamburgerReducer';
import { projectsReducer } from './projectsReducer';

const rootReducer = combineReducers({
  batch: batchReducer,
  batches: batchesReducer,
  job: jobReducer,
  jobs: jobsReducer,
  definition: definitionReducer,
  job_definition: definitionReducer,
  definitions: definitionsReducer,
  parameters: parametersReducer,
  container: containerReducer,
  lookups: lookupsReducer,
  user: userReducer,
  settings: settingsReducer,
  hamburger: hamburgerReducer,
  projects: projectsReducer,
});

export default rootReducer;
