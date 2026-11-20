// Persists the JWT + user in sessionStorage so a page refresh keeps you signed in
const KEY = 'jwt';

const auth = {
  get() {
    try {
      const raw = sessionStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  set(data) {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  },
  clear() {
    sessionStorage.removeItem(KEY);
  },
};

export default auth;
