import { createContext, useContext, useState } from 'react';
import auth from './auth-helper.js';
import * as api from '../api/api.js';

// Global auth state shared by every component (who is signed in + their role)
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => auth.get());

  const login = async (credentials) => {
    const data = await api.signin(credentials);
    auth.set(data);
    setSession(data);
    return data.user;
  };

  const logout = async () => {
    try {
      await api.signout();
    } finally {
      auth.clear();
      setSession(null);
    }
  };

  const value = {
    user: session?.user || null,
    isAuthenticated: !!session?.token,
    isAdmin: session?.user?.role === 'admin',
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
