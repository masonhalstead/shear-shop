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
import { batchDefinitionReducer } from './batchDefinitionReducer';
import { scheduleBatchesReducer } from './scheduleBatchesReducer';
import { containerReducer } from './containerReducer';
import { containersReducer } from './containersReducer';

const rootReducer = combineReducers({
  batch: batchReducer,
  batches: batchesReducer,
  job: jobReducer,
  jobs: jobsReducer,
  definition: definitionReducer,
  definitions: definitionsReducer,
  parameters: parametersReducer,
  lookups: lookupsReducer,
  user: userReducer,
  settings: settingsReducer,
  projects: projectsReducer,
  project: projectReducer,
  batchDefinitions: batchDefinitionReducer,
  scheduleBatches: scheduleBatchesReducer,
  container: containerReducer,
  containers: containersReducer,
});

export default rootReducer;
