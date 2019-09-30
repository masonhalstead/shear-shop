import uuid from 'uuid';

export function normalizeWithUUID(array) {
  return array.map(arr => ({
    ...arr,
    uuid: uuid.v1(),
  }));
}
export function normalizeDefinition(data) {
  return {
    ...data,
    timeout: new Date(data.timeout_seconds * 1000)
      .toUTCString()
      .match(/(\d\d:\d\d)/)[0],
    region_endpoint_hint:
      data.region_endpoint_hint === 'empty' ? null : data.region_endpoint_hint,
    uuid: uuid.v1(),
  };
}

export function normalizeParameters(parameters) {
  return parameters.map(parameter => ({
    parameter_method_id: 1,
    modified: true,
    saved: true,
    uuid: uuid.v1(),
    ...parameter,
  }));
}
