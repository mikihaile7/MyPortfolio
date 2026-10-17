// src/pages/Contact.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();

  // State capturing contact form fields aligned with backend schema requirements
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    contactNumber: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send contact data to the backend REST API endpoint
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save contact to the database.');
      }

      alert(`Thank you, ${formData.firstname}! Your message has been successfully saved.\n\nRedirecting to Home Page.`);
      navigate('/');
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit contact form. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-container contact-page">
      <h2>Contact Me</h2>
      <div className="contact-grid">
        {/* Contact Information Panel */}
        <div className="contact-panel">
          <h3>Get In Touch</h3>
          <p><strong>Email:</strong> mhaile2@my.centennialcollege.ca</p>
          <p><strong>Location:</strong> Toronto, ON, Canada</p>
        </div>

        {/* Interactive Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          {error && <p className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input type="text" id="firstname" name="firstname" required value={formData.firstname} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastname" required value={formData.lastname} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input type="tel" id="contactNumber" name="contactNumber" required value={formData.contactNumber} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" required value={formData.message} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}