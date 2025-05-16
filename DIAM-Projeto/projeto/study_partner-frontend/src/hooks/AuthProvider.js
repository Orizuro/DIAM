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
      if (isAuthenticated) {
        config.headers.Authorization = `Token ${currentUser.token}`
      }

      return config;
    },

    (error) => {
      return Promise.reject(error);
    }
  );

  const login = async (username, password) => {
    await axios.post(Constants.LOGIN_URL, { username, password }, { withCredentials: true })
      .then(response => {
        const user = {
          username: response.data.username,
          course: response.data.course,
          token: response.data.token
        }
        setCurrentUser(user);
        localStorage.setItem(Constants.LS_USER_ITEM, JSON.stringify(user));
      })
      .catch(err => console.log(err));
  }

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


  return <AuthContext.Provider value={{ login, logout, currentUser, isAuthenticated }}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
}
