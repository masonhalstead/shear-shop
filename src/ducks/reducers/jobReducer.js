import { SET_JOB, CLEAR_JOB } from 'ducks/types';

const initial_state = {
  job_id: null,
  project_id: null,
  project_name: null,
  organization_id: null,
  organization_name: null,
  job_state_id: null,
  job_state_name: null,
  created_by: null,
  start_datetime_utc: null,
  finish_datetime_utc: null,
  duration_seconds: null,
  docker_image: null,
  startup_command: null,
  required_cpu: null,
  required_gpu: null,
  required_memory_gb: null,
  required_storage_gb: null,
  timeout_seconds: null,
  region_endpoint_hint: null,
  description: null,
  result_method_id: null,
  result_method_name: null,
  stdout_success_text: null,
  retries: null,
  max_retries: null,
  job_definition_id: null,
  job_definition_name: null,
  batch_id: null,
  batch_name: null,
  batch_descriptor: null,
  location_id: null,
  location_name: null,
};

export const jobReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SET_JOB:
      return action.payload;
    case CLEAR_JOB:
      return {};
    default:
      return state;
  }
};
