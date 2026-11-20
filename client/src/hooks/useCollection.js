import { useCallback, useEffect, useState } from 'react';

// Loads a collection from the API and keeps local state in sync after create/update/delete
export default function useCollection(api) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setItems(await api.list());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    load();
  }, [load]);

  const create = async (item) => {
    const saved = await api.create(item);
    setItems((prev) => [saved, ...prev]);
  };
  const update = async (id, item) => {
    const saved = await api.update(id, item);
    setItems((prev) => prev.map((i) => (i._id === id ? saved : i)));
  };
  const remove = async (id) => {
    await api.remove(id);
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  return { items, loading, error, create, update, remove, reload: load };
}
