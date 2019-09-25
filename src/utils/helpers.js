export function isObject(obj) {
  const type = typeof obj;
  return type === 'function' || (type === 'object' && !!obj);
}
export function manageBulkStyles(bulk = false, background = '#fff') {
  if (!bulk) {
    return {
      styles: {},
      scroll_styles: {},
    };
  }
  return {
    styles: {
      background: background === '#fff' ? 'transparent' : background,
      margin: '0px',
      border_radius: '0px',
      border: 'none',
    },
    scroll_styles: {
      width: 'auto',
      left: '-1px',
      right: '-1px',
      borderRadius: '0px',
    },
  };
}