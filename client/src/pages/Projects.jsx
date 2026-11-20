// src/pages/Projects.jsx - projects loaded from MongoDB via /api/projects
import AdminCollection from '../components/AdminCollection.jsx';
import useCollection from '../hooks/useCollection.js';
import { projectsApi } from '../api/api.js';
import webappImg from '../assets/webapp.jpg';
import dataImg from '../assets/data.jpg';
import sqlImg from '../assets/sql.jpg';

const images = [webappImg, dataImg, sqlImg];

export default function Projects() {
  const collection = useCollection(projectsApi);

  return (
    <AdminCollection
      title="Featured Projects"
      titleLabel="Project Title"
      emptyText="No projects yet."
      collection={collection}
      renderItem={(items, actions) => (
        <div className="projects-grid">
          {items.map((p, i) => (
            <div key={p._id} className="project-card">
              <img src={images[i % images.length]} alt={p.title} className="project-img" />
              <h3>{p.title}</h3>
              {p.completion && (
                <p className="project-date">Completed {new Date(p.completion).toLocaleDateString()}</p>
              )}
              <p className="project-desc">{p.description}</p>
              {actions(p)}
            </div>
          ))}
        </div>
      )}
    />
  );
}
