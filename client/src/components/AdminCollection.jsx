import { useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';
import ItemForm from './ItemForm.jsx';

// Renders a list of items. Everyone can read; admins also get Add / Edit / Delete controls.
export default function AdminCollection({ title, collection, renderItem, titleLabel, emptyText }) {
  const { isAdmin } = useAuth();
  const { items, loading, error, create, update, remove } = collection;
  const [editing, setEditing] = useState(null); // null | 'new' | item

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await remove(item._id);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSubmit = async (values) => {
    if (editing === 'new') await create(values);
    else await update(editing._id, values);
    setEditing(null);
  };

  return (
    <section className="page-container">
      <div className="page-header">
        <h2>{title}</h2>
        {isAdmin && !editing && (
          <button className="btn btn-primary" onClick={() => setEditing('new')}>+ Add</button>
        )}
      </div>

      {isAdmin && editing && (
        <ItemForm
          key={editing === 'new' ? 'new' : editing._id}
          initial={editing === 'new' ? null : editing}
          titleLabel={titleLabel}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />
      )}

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="muted">{emptyText}</p>}

      {renderItem(items, (item) =>
        isAdmin ? (
          <div className="item-actions">
            <button className="btn btn-small" onClick={() => setEditing(item)}>Edit</button>
            <button className="btn btn-small btn-danger" onClick={() => handleDelete(item)}>Delete</button>
          </div>
        ) : null
      )}
    </section>
  );
}
