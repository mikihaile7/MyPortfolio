// src/pages/Education.jsx - qualifications loaded from MongoDB via /api/qualifications
import AdminCollection from '../components/AdminCollection.jsx';
import useCollection from '../hooks/useCollection.js';
import { qualificationsApi } from '../api/api.js';

const year = (d) => (d ? new Date(d).getFullYear() : '');

export default function Education() {
  const collection = useCollection(qualificationsApi);

  return (
    <AdminCollection
      title="Education & Qualifications"
      titleLabel="Qualification / Program"
      emptyText="No qualifications yet."
      collection={collection}
      renderItem={(items, actions) => (
        <div className="timeline">
          {items.map((q) => (
            <div key={q._id} className="timeline-item">
              <h3>{q.title}</h3>
              <h4><span className="dates">Completion: {year(q.completion)}</span></h4>
              <p>{q.description}</p>
              {actions(q)}
            </div>
          ))}
        </div>
      )}
    />
  );
}
