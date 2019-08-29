export function loadUser() {
  try {
    const serializedUser = localStorage.getItem('user');
    if (serializedUser === null) {
      return undefined;
    }
    return JSON.parse(serializedUser);
  } catch (err) {
    return undefined;
  }
}

export function saveUser(user) {
  try {
    if (user === undefined || user === null) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify(user));
    }
  } catch (e) {
    // ignore saving errors
  }
}
