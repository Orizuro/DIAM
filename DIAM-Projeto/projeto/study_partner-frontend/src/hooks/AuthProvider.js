import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as Constants from "../Constants";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const getUserFromLS = () => {
    const loggedUser = localStorage.getItem(Constants.LS_USER_ITEM)
    return loggedUser === null ? null : JSON.parse(loggedUser)
  }

  const [currentUser, setCurrentUser] = useState(getUserFromLS);
  const [isAuthenticated, setIsAuthenticaded] = useState(currentUser !== null);

  useEffect(() => {
    currentUser !== null ? setIsAuthenticaded(true) : setIsAuthenticaded(false);
  }, [currentUser])

  axios.interceptors.request.use(
      (config) => {
        if (currentUser && currentUser.token) {
          config.headers.Authorization = `Token ${currentUser.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
  );

  const login = async (username, password) => {
    try {
      const response = await axios.post(Constants.LOGIN_URL, { username, password }, { withCredentials: true });

      const user = response.data.user;
      setCurrentUser(user);
      localStorage.setItem(Constants.LS_USER_ITEM, JSON.stringify(user));
      return true;

    } catch (err) {
      console.error(err);
      return false;
    }
  };
  const signup = async (username, password) => {
    try {
      const response = await axios.post(Constants.SIGNUP_URL, { username, password }, { withCredentials: true });
      // Assuming response.data.message exists on success
      return { success: true, message: response.data.message };
    } catch (error) {
      // Extract error message from backend if exists
      const errMsg =
          error.response?.data?.error ||
          "Erro ao registrar usuário. Tente novamente.";
      return { success: false, message: errMsg };
    }
  };

  const logout = () => {
    try {
      axios.get(Constants.LOGOUT_URL);
    } catch (e) {
      console.error(e);
    } finally {
      setCurrentUser(null);
      localStorage.setItem(Constants.LS_USER_ITEM, null);
    }
  }


  return (
      <AuthContext.Provider value={{ login, logout, signup, currentUser, isAuthenticated }}>
        {children}
      </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
}
