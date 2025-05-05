import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function (replace with actual API calls in production)
  // eslint-disable-next-line no-unused-vars
  const login = (email, password) => {
    // Mock user data
    const userData = {
      id: '1',
      name: 'Test User',
      email: email,
      role: 'student',
      department: 'Computer Science',
      year: '3rd Year',
      profileImage: '/assets/images/default-profile.png'
    };
    
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return Promise.resolve(userData);
  };

  // Mock register function
  const register = (userData) => {
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      role: 'student',
      profileImage: '/assets/images/default-profile.png'
    };
    
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return Promise.resolve(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};