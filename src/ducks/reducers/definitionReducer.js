import { SET_JOB_DEFINITION, CLEAR_JOB_DEFINITION } from 'ducks/types';

const initial_state = {
  job_definition_id: null,
  job_definition_name: null,
  project_id: null,
  project_name: null,
  organization_id: null,
  organization_name: null,
  docker_image: null,
  startup_command: null,
  cpu: null,
  gpu: null,
  memory_gb: null,
  storage_gb: null,
  timeout_seconds: null,
  region_endpoint_hint: null,
  description: null,
  created_by: null,
  created_datetime_utc: null,
  result_method_id: null,
  result_method_name: null,
  stdout_success_text: null,
  max_retries: null,
  location_id: null,
  location_name: null,
  is_archived: null,
};
export const definitionReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SET_JOB_DEFINITION:
      return action.payload;
    case CLEAR_JOB_DEFINITION:
      return { ...initial_state };
    default:
      return state;
  }
};
