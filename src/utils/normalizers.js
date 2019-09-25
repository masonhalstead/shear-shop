import uuid from 'uuid';

export function normalizeWithUUID(array) {
  return array.map(arr => ({
    ...arr,
    uuid: uuid.v1(),
  }));
}
export function normalizeDefinition(data, locations = []) {
  const region = locations.filter(
    filter => filter.location_name === data.region_endpoint_hint,
  );
  return {
    ...data,
    timeout: new Date(data.timeout_seconds * 1000)
      .toUTCString()
      .match(/(\d\d:\d\d)/)[0],
    region: region.length > 0 ? region[0].location_id : 'empty',
    location_id:
      data.location_id === null ? 'empty' : data.location_id,
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
