import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/api.js';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (values.password.length < 6) return setError('Password must be at least 6 characters.');
    if (values.password !== values.confirm) return setError('Passwords do not match.');

    setLoading(true);
    try {
      await signup({ name: values.name, email: values.email, password: values.password });
      // Sign the new user straight in
      await login({ email: values.email, password: values.password });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-container auth-page">
      <form className="auth-card contact-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>
        {error && <p className="form-error">{error}</p>}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" required value={values.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required value={values.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required value={values.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="confirm">Confirm Password</label>
          <input id="confirm" name="confirm" type="password" required value={values.confirm} onChange={handleChange} />
        </div>
        <button className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
        <p className="auth-switch">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </form>
    </section>
  );
}
