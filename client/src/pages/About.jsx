// src/pages/About.jsx
import React from 'react';
import profilePic from '../assets/profile.jpg';
import resumePdf from '../assets/resume.pdf';

export default function About() {
  return (
    <section className="page-container about-page">
      <h2>About Me</h2>
      <div className="about-grid">
        <div className="profile-card">
          <img src={profilePic} alt="Mikias Haile" className="profile-img" />
        </div>
        <div className="bio-card">
          <h3>Mikias Haile</h3>
          <p className="bio-text">
            I am a Software Engineering Technology student at Centennial College with a passion for web application 
            development, database design, and intelligent software systems. I specialize in building responsive 
            front-end interfaces in React, scalable back-end components, and data optimization tools.
          </p>
          <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
            View Resume (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}