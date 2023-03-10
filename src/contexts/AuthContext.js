import { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext();

const defaultLoggedIn = localStorage.getItem('loggedIn') || false; 

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(defaultLoggedIn);

  useEffect(() => {
    localStorage.setItem('loggedIn',loggedIn);
  },[loggedIn])

  const login = (data) => {
    setLoggedIn(true);
    setUser(data);
  };
  const register = (data) => {
    setUser(data);
  };
  const values = {
    loggedIn,
    user,
    login,
    register
  };
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };