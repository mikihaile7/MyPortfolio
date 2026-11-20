// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

const linkClass = ({ isActive }) => (isActive ? 'active-link' : '');

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar-container">
      <div className="logo-brand">
        <div className="custom-logo">MH</div>
        <span className="brand-title">Mikias Haile</span>
      </div>

      <div className="nav-links">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/about" className={linkClass}>About Me</NavLink>
        <NavLink to="/projects" className={linkClass}>Projects</NavLink>
        <NavLink to="/education" className={linkClass}>Education</NavLink>
        <NavLink to="/services" className={linkClass}>Services</NavLink>
        <NavLink to="/contact" className={linkClass}>Contact Me</NavLink>
        {isAdmin && <NavLink to="/messages" className={linkClass}>Messages</NavLink>}
      </div>

      <div className="nav-auth">
        {isAuthenticated ? (
          <>
            <span className="nav-user">
              {user.name}
              <span className={`role-badge ${isAdmin ? 'admin' : ''}`}>{user.role}</span>
            </span>
            <button className="btn btn-small btn-outline" onClick={handleSignout}>Sign Out</button>
          </>
        ) : (
          <>
            <NavLink to="/signin" className={linkClass}>Sign In</NavLink>
            <NavLink to="/signup" className="btn btn-small btn-primary">Sign Up</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
