// src/pages/Education.jsx
import React from 'react';

export default function Education() {
  const educationList = [
    {
      id: 1,
      institution: 'Centennial College',
      degree: 'Advanced Diploma in Software Engineering Technology (Co-op)',
      dates: '2025 - Present',
      details: 'Focusing on Web Application Development, Object-Oriented Software Design, Database Systems, and Linux System Administration.'
    },
    {
      id: 2,
      institution: 'Coursera',
      degree: 'Google Data Analytics Professional Certificate',
      dates: '2026',
      details: 'Completed hands-on data modeling, demographic analysis, time-series visualization, and predictive modeling projects.'
    },
    {
      id: 2,
      institution: 'freeCodeCamp',
      degree: 'Data Analysis with Python Certification',
      dates: '2026',
      details: 'Completed hands-on data modeling, demographic analysis, time-series visualization, and predictive modeling projects.'
    }
  ];

  return (
    <section className="page-container education-page">
      <h2>Educational Background</h2>
      <div className="timeline">
        {educationList.map((item) => (
          <div key={item.id} className="timeline-item">
            <h3>{item.degree}</h3>
            <h4>{item.institution} | <span className="dates">{item.dates}</span></h4>
            <p>{item.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}