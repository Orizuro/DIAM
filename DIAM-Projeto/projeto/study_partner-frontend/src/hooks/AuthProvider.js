import axios from "axios";
import { createContext, useContext } from "react";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const login = (username, password) => {
    axios.post('http://localhost:8000/api/login/', { username, password }, { withCredentials: true });
  }

  const logout = () => {
    axios.get('http://localhost:8000/api/logout/');
  }

  return <AuthContext.Provider value={{ login, logout }}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
}
