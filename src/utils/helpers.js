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
