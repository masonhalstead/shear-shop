import { combineReducers } from 'redux';
import { batchReducer } from './batchReducer';
import { batchesReducer } from './batchesReducer';
import { jobReducer } from './jobReducer';
import { jobsReducer } from './jobsReducer';
import { jobDefinitionReducer } from './jobDefinitionReducer';
import { jobDefinitionsReducer } from './jobDefinitionsReducer';
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
  job_definition: jobDefinitionReducer,
  jobDefinitions: jobDefinitionsReducer,
  parameters: parametersReducer,
  container: containerReducer,
  lookups: lookupsReducer,
  user: userReducer,
  settings: settingsReducer,
  hamburger: hamburgerReducer,
  projects: projectsReducer,
});

export default rootReducer;
