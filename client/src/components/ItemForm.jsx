import { useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

const toDateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '');

// Shared form for Education (qualification) and Project entries - used for both Add and Edit
export default function ItemForm({ initial, onSubmit, onCancel, titleLabel = 'Title' }) {
  const { user } = useAuth();
  const [first, ...rest] = (user?.name || '').split(' ');
  const [values, setValues] = useState({
    title: initial?.title || '',
    firstname: initial?.firstname || first || '',
    lastname: initial?.lastname || rest.join(' ') || '',
    email: initial?.email || user?.email || '',
    completion: toDateInput(initial?.completion),
    description: initial?.description || '',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSubmit({ ...values, completion: values.completion || undefined });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <form className="contact-form item-form" onSubmit={handleSubmit}>
      <h3>{initial ? 'Edit entry' : 'Add new entry'}</h3>
      {error && <p className="form-error">{error}</p>}
      <div className="form-group">
        <label htmlFor="title">{titleLabel}</label>
        <input id="title" name="title" required value={values.title} onChange={handleChange} />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input id="firstname" name="firstname" required value={values.firstname} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input id="lastname" name="lastname" required value={values.lastname} onChange={handleChange} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required value={values.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="completion">Completion Date</label>
          <input id="completion" name="completion" type="date" value={values.completion} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="3" value={values.description} onChange={handleChange} />
      </div>
      <div className="form-actions">
        <button className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
