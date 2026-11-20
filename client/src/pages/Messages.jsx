// src/pages/Messages.jsx - admin-only view of contact form submissions (full CRUD)
import { useState } from 'react';
import useCollection from '../hooks/useCollection.js';
import { contactsApi } from '../api/api.js';

const empty = { firstname: '', lastname: '', contactNumber: '', email: '', message: '' };

function ContactForm({ initial, onSubmit, onCancel }) {
  const [values, setValues] = useState({ ...empty, ...initial });
  const [error, setError] = useState('');
  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(values);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="contact-form item-form" onSubmit={handleSubmit}>
      <h3>{initial?._id ? 'Edit contact' : 'Add contact'}</h3>
      {error && <p className="form-error">{error}</p>}
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
          <label htmlFor="contactNumber">Contact Number</label>
          <input id="contactNumber" name="contactNumber" value={values.contactNumber || ''} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="3" value={values.message || ''} onChange={handleChange} />
      </div>
      <div className="form-actions">
        <button className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default function Messages() {
  const { items, loading, error, create, update, remove } = useCollection(contactsApi);
  const [editing, setEditing] = useState(null);

  const handleSubmit = async (values) => {
    if (editing === 'new') await create(values);
    else await update(editing._id, values);
    setEditing(null);
  };

  const handleDelete = async (c) => {
    if (!window.confirm(`Delete message from ${c.firstname} ${c.lastname}?`)) return;
    try {
      await remove(c._id);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="page-container">
      <div className="page-header">
        <h2>Contact Messages</h2>
        {!editing && <button className="btn btn-primary" onClick={() => setEditing('new')}>+ Add</button>}
      </div>

      {editing && (
        <ContactForm
          key={editing === 'new' ? 'new' : editing._id}
          initial={editing === 'new' ? null : editing}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />
      )}

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">No messages yet.</p>}

      {items.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c._id}>
                  <td>{c.firstname} {c.lastname}</td>
                  <td>{c.email}</td>
                  <td>{c.contactNumber}</td>
                  <td className="msg-cell">{c.message}</td>
                  <td className="item-actions">
                    <button className="btn btn-small" onClick={() => setEditing(c)}>Edit</button>
                    <button className="btn btn-small btn-danger" onClick={() => handleDelete(c)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
