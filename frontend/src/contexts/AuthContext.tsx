import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Defines the shape of the User object
interface User {
  email: string;
  role: string;
}

// 2. Defines the shape of the context data and functions
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: string) => Promise<any>;
  signup: (email: string, password: string, role: string) => Promise<any>;
  logout: () => void;
}

// 3. Creates the authentication context with a default value
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// 4. Custom hook to easily access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// 5. The provider component that wraps the application
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Handles the login process
  const login = async (email: string, password: string, role: string) => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await response.json();
      
      // If login is successful, update the user state
      if (response.ok && data.role) {
        setUser({ email, role: data.role });
      }
      return data;
    } catch (error) {
      console.error("Login error:", error);
      return { error: "Failed to connect to the server. Please ensure the backend is running." };
    } finally {
      setLoading(false);
    }
  };

  // Handles the signup process (currently not used as per requirements)
  const signup = async (email: string, password: string, role: string) => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      return await response.json();
    } finally {
      setLoading(false);
    }
  };

  // Clears the user state on logout
  const logout = () => {
    setUser(null);
  };

  // The value provided to the context consumers
  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

