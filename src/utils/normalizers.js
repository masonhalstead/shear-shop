import uuid from 'uuid';
import moment from 'moment';
import momentDuration from 'moment-duration-format';

momentDuration(moment);

export function normalizeWithUUID(array) {
  return array.map(arr => ({
    ...arr,
    uuid: uuid.v1(),
  }));
}

export function normalizeJobs(data) {
  return data.map(job => normalizeJob(job));
}

export function normalizeJob(data) {
  return {
    ...data,
    duration_masked: moment
      .duration(data.duration_seconds, 'seconds')
      .format('d[d] h[h] m[m] s[s]'),
    created_at: moment(data.created_datetime_utc).format('M/D/YY hh:mm'),
    uuid: uuid.v1(),
  };
}

export function normalizeDefinitions(data, filter) {
  return data
    .filter(definition => definition.is_archived === filter)
    .map(definition => normalizeDefinition(definition));
}

export function normalizeDefinition(data) {
  let location = data.location_name;

  if (!location) {
    location = `~ ${data.region_endpoint_hint}`;
  }
  return {
    ...data,
    location,
    timeout_masked: moment
      .duration(data.timeout_seconds, 'seconds')
      .format('h[hrs] m[mins]'),
    timeout: moment.duration(data.timeout_seconds, 'seconds').format('hh:mm'),
    created_at: moment(data.created_datetime_utc).format('M/D/YY hh:mm'),
    uuid: uuid.v1(),
  };
}

export function normalizeParameters(parameters) {
  return parameters.map(parameter => ({
    ...parameter,
    parameter_name_old: parameter.parameter_name,
    modified: false,
    saved: true,
    uuid: uuid.v1(),
  }));
}
