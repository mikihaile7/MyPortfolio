import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

// Redirects to /signin when not signed in; optionally requires the admin role
export default function PrivateRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/signin" replace state={{ from: location }} />;
  if (adminOnly && !isAdmin) {
    return (
      <section className="page-container">
        <h2>Access denied</h2>
        <p>This page is only available to the site administrator.</p>
      </section>
    );
  }
  return children;
}
