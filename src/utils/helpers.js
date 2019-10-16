export function isObject(obj) {
  const type = typeof obj;
  return type === 'function' || (type === 'object' && !!obj);
}

export function formatNull(value, append = '') {
  if (value === null || value === undefined) {
    return append;
  }
  return value;
}

export function containsStrings(string1 = '', string2 = '') {
  return string1
    .toString()
    .toLowerCase()
    .includes(string2.toString().toLowerCase());
}

export function compareJSON(array1 = [], array2 = []) {
  return JSON.stringify(array1) === JSON.stringify(array2);
}

export function toTime(seconds) {
  const date = new Date(null);
  date.setSeconds(seconds); // specify value for SECONDS here

  return date.toISOString().substr(11, 8);
}

export function handleTimoutConversion(input) {
  let timeout = 0;
  if (input === 0 || input) {
    const [hours, hour, minutes, minute] = input.split('');
    timeout += (hours || 0) * 36000;
    timeout += (hour || 0) * 3600;
    timeout += (minutes || 0) * 600;
    timeout += (minute || 0) * 60;
  }
  return timeout;
}