import React from 'react';
import webappImg from '../assets/webapp.jpg';
import dataImg from '../assets/data.jpg';
import sqlImg from '../assets/sql.jpg';

export default function Services() {
  return (
    <section className="page-container services-page">
      <h2>Services Offered</h2>
      
      <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '24px' }}>
        
        {/* Service 1: Web Application Development */}
        <div className="service-card" style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <img 
            src={webappImg} 
            alt="Web Application Development" 
            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
          />
          <h3 style={{ marginTop: 0, color: '#0f172a' }}>Web Application Development</h3>
          <p style={{ color: '#475569', lineHeight: '1.5' }}>
            Building modern, responsive user interfaces with React, JavaScript, HTML5, and CSS3.
          </p>
        </div>

        {/* Service 2: Data Analysis & Optimization */}
        <div className="service-card" style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <img 
            src={dataImg} 
            alt="Data Analysis & Optimization" 
            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
          />
          <h3 style={{ marginTop: 0, color: '#0f172a' }}>Data Analysis & Optimization</h3>
          <p style={{ color: '#475569', lineHeight: '1.5' }}>
            Developing data pipelines, linear optimization models, and interactive dashboard analytics in Python.
          </p>
        </div>

        {/* Service 3: Database Architecture & SQL */}
        <div className="service-card" style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <img 
            src={sqlImg} 
            alt="Database Architecture & SQL" 
            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
          />
          <h3 style={{ marginTop: 0, color: '#0f172a' }}>Database Architecture & SQL</h3>
          <p style={{ color: '#475569', lineHeight: '1.5' }}>
            Designing relational database schemas, multi-table queries, and database normalization solutions.
          </p>
        </div>

      </div>
    </section>
  );
}