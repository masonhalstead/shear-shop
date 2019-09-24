import uuid from 'uuid';

export function normalizeWithUUID(array) {
  return array.map(arr => ({
    ...arr,
    uuid: uuid.v1(),
  }));
}
export function normalizeDefinition(data, locations = []) {
  return {
    ...data,
    timeout: new Date(data.timeout_seconds * 1000)
      .toUTCString()
      .match(/(\d\d:\d\d)/)[0],
    region: locations.filter(
      location => location.location_name === data.region_endpoint_hint,
    )[0].location_id,
    uuid: uuid.v1(),
  };
}
