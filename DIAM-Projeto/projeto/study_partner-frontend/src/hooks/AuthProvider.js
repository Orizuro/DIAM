import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as Constants from '../Constants'


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || "");
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    token === "" ? setLoggedIn(false) : setLoggedIn(true);
    localStorage.setItem('token', token);
  }, [token])

  const login = async (username, password) => {
    await axios.post(Constants.LOGIN_URL, { username, password }, { withCredentials: true })
      .then(response => setToken(response.data.token))
      .catch(err => console.log(err));
  }

  const logout = () => {
    axios.get(Constants.LOGOUT_URL);
    setToken("");
  }

  return <AuthContext.Provider value={{ login, logout, isLoggedIn }}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
}
