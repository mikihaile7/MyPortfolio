import auth from '../auth/auth-helper.js';

// Small fetch wrapper: adds JSON headers + the Bearer token, and throws on API errors
async function request(path, { method = 'GET', body } = {}) {
  const session = auth.get();
  const headers = { Accept: 'application/json' };
  if (body) headers['Content-Type'] = 'application/json';
  if (session?.token) headers.Authorization = `Bearer ${session.token}`;

  const res = await fetch(path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

// Auth
export const signin = (credentials) => request('/auth/signin', { method: 'POST', body: credentials });
export const signout = () => request('/auth/signout');
export const signup = (user) => request('/api/users', { method: 'POST', body: user });

// Generic CRUD for /api/<resource>
export const crud = (resource) => ({
  list: () => request(`/api/${resource}`),
  read: (id) => request(`/api/${resource}/${id}`),
  create: (item) => request(`/api/${resource}`, { method: 'POST', body: item }),
  update: (id, item) => request(`/api/${resource}/${id}`, { method: 'PUT', body: item }),
  remove: (id) => request(`/api/${resource}/${id}`, { method: 'DELETE' }),
});

export const contactsApi = crud('contacts');
export const projectsApi = crud('projects');
export const qualificationsApi = crud('qualifications');
