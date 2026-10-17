import React from 'react';
import webappImg from '../assets/webapp.jpg';
import dataImg from '../assets/data.jpg';
import sqlImg from '../assets/sql.jpg';

export default function Projects() {
  const projectsList = [
    {
      id: 1,
      title: "Responsive Restaurant Web Application",
      image: webappImg,
      role: "Lead Front-End Developer",
      outcome: "Built an interactive web platform with dynamic menu routing, OpenWeatherMap API integration, and Leaflet.js mapping.",
    },
    {
      id: 2,
      title: "Fantasy Premier League AI Optimizer",
      image: dataImg,
      role: "Data Analyst & Algorithm Developer",
      outcome: "Designed an expected-points optimization tool using Python, Pandas, and PuLP linear programming, deployed on Streamlit Cloud.",
    },
    {
      id: 3,
      title: "Smart Garage & Parking Management Schema",
      image: sqlImg,
      role: "Database Architect & Systems Designer",
      outcome: "Constructed normalized relational Oracle SQL schemas and UML interaction diagrams for real-time spot tracking and reservations.",
    }
  ];

  return (
    <section className="page-container projects-page">
      <h2>Featured Projects</h2>
      <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '20px' }}>
        {projectsList.map((project) => (
          <div key={project.id} className="project-card" style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} />
            <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>{project.title}</h3>
            <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#0d9488', fontSize: '0.9rem' }}>Role: {project.role}</p>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem', lineHeight: '1.5' }}>{project.outcome}</p>
          </div>
        ))}
      </div>
    </section>
  );
}