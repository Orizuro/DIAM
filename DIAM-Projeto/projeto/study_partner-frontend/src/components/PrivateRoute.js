import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      console.log("Não tem acesso")
      alert("Faça o login para aceder a essa página");
    }
  }, [auth.isAuthenticated]);

  return auth.isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
