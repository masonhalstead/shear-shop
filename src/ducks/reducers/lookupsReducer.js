import { SET_LOOKUPS, CLEAR_LOOKUPS } from 'ducks/types';
import uuid from 'uuid';

const initial_state = {
  filter_definitions: [
    {
      name: 'unarchived',
      verbose_name: 'Unarchived',
      id: 1,
      uuid: 1,
    },
    {
      name: 'archived',
      verbose_name: 'Archived',
      id: 2,
      uuid: 2,
    },
  ],
  filter_jobs: [
    {
      name: '24',
      verbose_name: 'Last 24 Hours',
      id: 1,
      uuid: 1,
    },
    {
      name: '7',
      verbose_name: 'Last 7 Days',
      id: 2,
      uuid: 2,
    },
    {
      name: 'queued',
      verbose_name: 'Queued',
      id: 3,
      uuid: 3,
    },
    {
      name: 'starting',
      verbose_name: 'Starting',
      id: 4,
      uuid: 4,
    },
    {
      name: 'running',
      verbose_name: 'Running',
      id: 5,
      uuid: 5,
    },
    {
      name: 'complete',
      verbose_name: 'Complete',
      id: 6,
      uuid: 6,
    },
    {
      name: 'stopped',
      verbose_name: 'Stopped',
      id: 7,
      uuid: 7,
    },
    {
      name: 'failed',
      verbose_name: 'Failed',
      id: 8,
      uuid: 8,
    },
  ],
  file_states: [
    {
      file_state_name: 'Uploading',
      file_state_id: 1,
      uuid: uuid.v1(),
    },
    {
      file_state_name: 'Active',
      file_state_id: 2,
      uuid: uuid.v1(),
    },
    {
      file_state_name: 'Deleted',
      file_state_id: 3,
      uuid: uuid.v1(),
    },
  ],
  job_states: [
    {
      job_state_name: 'Failed',
      job_state_id: 99,
      uuid: uuid.v1(),
    },
    {
      job_state_name: 'Stopped',
      job_state_id: 98,
      uuid: uuid.v1(),
    },
    {
      job_state_name: 'Queued',
      job_state_id: 1,
      uuid: uuid.v1(),
    },
    {
      job_state_name: 'Starting',
      job_state_id: 2,
      uuid: uuid.v1(),
    },
    {
      job_state_name: 'Running',
      job_state_id: 7,
      uuid: uuid.v1(),
    },
    {
      job_state_name: 'Complete',
      job_state_id: 8,
      uuid: uuid.v1(),
    },
    {
      job_state_name: 'Stopping',
      job_state_id: 95,
      uuid: uuid.v1(),
    },
    {
      job_state_name: 'Restarting',
      job_state_id: 90,
      uuid: uuid.v1(),
    },
  ],
  parameter_directions: [
    {
      parameter_direction_name: 'Input',
      parameter_direction_id: 1,
      uuid: uuid.v1(),
    },
    {
      parameter_direction_name: 'Output',
      parameter_direction_id: 2,
      uuid: uuid.v1(),
    },
  ],
  parameter_methods: [
    {
      parameter_method_name: 'Command Line',
      parameter_method_id: 1,
      uuid: uuid.v1(),
    },
    {
      parameter_method_name: 'Environment Variable',
      parameter_method_id: 2,
      uuid: uuid.v1(),
    },
  ],
  reference_types: [
    {
      reference_type_name: 'Job',
      reference_type_id: 1,
      uuid: uuid.v1(),
    },
    {
      reference_type_name: 'Batch',
      reference_type_id: 2,
      uuid: uuid.v1(),
    },
    {
      reference_type_name: 'Project',
      reference_type_id: 3,
      uuid: uuid.v1(),
    },
    {
      reference_type_name: 'Batch Definition',
      reference_type_id: 4,
      uuid: uuid.v1(),
    },
    {
      reference_type_name: 'Batch Definition Item',
      reference_type_id: 5,
      uuid: uuid.v1(),
    },
    {
      reference_type_name: 'System',
      reference_type_id: 6,
      uuid: uuid.v1(),
    },
  ],
  result_methods: [
    {
      result_method_name: 'Auto',
      result_method_id: 1,
      uuid: uuid.v1(),
    },
    {
      result_method_name: 'STDOUT',
      result_method_id: 2,
      uuid: uuid.v1(),
    },
    {
      result_method_name: 'STDOUT JSON',
      result_method_id: 3,
      uuid: uuid.v1(),
    },
  ],
  aws_spot_request_states: [
    {
      aws_spot_request_state_name: 'Open',
      aws_spot_request_state_id: 1,
      uuid: uuid.v1(),
    },
    {
      aws_spot_request_state_name: 'Filled',
      aws_spot_request_state_id: 2,
      uuid: uuid.v1(),
    },
    {
      aws_spot_request_state_name: 'Not Filled',
      aws_spot_request_state_id: 3,
      uuid: uuid.v1(),
    },
    {
      aws_spot_request_state_name: 'Failed',
      aws_spot_request_state_id: 99,
      uuid: uuid.v1(),
    },
  ],
  container_states: [
    {
      container_state_name: 'Transmitting Stop',
      container_state_id: 96,
      uuid: uuid.v1(),
    },
    {
      container_state_name: 'Stopping',
      container_state_id: 97,
      uuid: uuid.v1(),
    },
    {
      container_state_name: 'Stopped',
      container_state_id: 98,
      uuid: uuid.v1(),
    },
    {
      container_state_name: 'Failed',
      container_state_id: 99,
      uuid: uuid.v1(),
    },
    {
      container_state_name: 'Assigning to Server',
      container_state_id: 1,
      uuid: uuid.v1(),
    },
    {
      container_state_name: 'Waiting for Server Online',
      container_state_id: 2,
      uuid: uuid.v1(),
    },
    {
      container_state_name: 'Transmitting Start',
      container_state_id: 3,
      uuid: uuid.v1(),
    },
    {
      container_state_name: 'Preparing Environment',
      container_state_id: 4,
      uuid: uuid.v1(),
    },
    {
      container_state_name: 'Creating',
      container_state_id: 5,
      uuid: uuid.v1(),
    },
    {
      container_state_name: 'Running',
      container_state_id: 6,
      uuid: uuid.v1(),
    },
    {
      container_state_name: 'Complete',
      container_state_id: 7,
      uuid: uuid.v1(),
    },
  ],
  locations: [
    {
      location_name: 'us-east-1b',
      location_id: 2,
      uuid: uuid.v1(),
    },
    {
      location_name: 'us-east-1c',
      location_id: 3,
      uuid: uuid.v1(),
    },
    {
      location_name: 'us-east-1e',
      location_id: 4,
      uuid: uuid.v1(),
    },
    {
      location_name: 'Pegasus (Prod) VPC',
      location_id: 13,
      uuid: uuid.v1(),
    },
    {
      location_name: 'us-west-2a',
      location_id: 8,
      uuid: uuid.v1(),
    },
    {
      location_name: 'us-west-2b',
      location_id: 9,
      uuid: uuid.v1(),
    },
    {
      location_name: 'us-west-2c',
      location_id: 10,
      uuid: uuid.v1(),
    },
    {
      location_name: 'us-east-1a',
      location_id: 1,
      uuid: uuid.v1(),
    },
    {
      location_name: 'us-east-2a',
      location_id: 5,
      uuid: uuid.v1(),
    },
    {
      location_name: 'us-east-2b',
      location_id: 6,
      uuid: uuid.v1(),
    },
    {
      location_name: 'us-east-2c',
      location_id: 7,
      uuid: uuid.v1(),
    },
    {
      location_name: 'us-east-1d',
      location_id: 14,
      uuid: uuid.v1(),
    },
    {
      location_name: 'us-east-1f',
      location_id: 15,
      uuid: uuid.v1(),
    },
    {
      location_name: 'ca-central-1a',
      location_id: 16,
      uuid: uuid.v1(),
    },
    {
      location_name: 'Umbra (Prod) VPC - 1a',
      location_id: 18,
      uuid: uuid.v1(),
    },
    {
      location_name: 'Lynx (Prod) VPC',
      location_id: 12,
      uuid: uuid.v1(),
    },
    {
      location_name: 'Umbra (Prod) VPC - 1b',
      location_id: 19,
      uuid: uuid.v1(),
    },
    {
      location_name: 'Umbra (Prod) VPC - 1d',
      location_id: 20,
      uuid: uuid.v1(),
    },
    {
      location_name: 'Umbra (Prod) VPC - 1e',
      location_id: 21,
      uuid: uuid.v1(),
    },
    {
      location_name: 'Umbra (Prod) VPC - 1f',
      location_id: 22,
      uuid: uuid.v1(),
    },
    {
      location_name: 'Umbra (Prod) VPC - 1c',
      location_id: 22,
      uuid: uuid.v1(),
    },
  ],
};

export const lookupsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SET_LOOKUPS:
      return action.payload;
    case CLEAR_LOOKUPS:
      return {};
    default:
      return state;
  }
};
