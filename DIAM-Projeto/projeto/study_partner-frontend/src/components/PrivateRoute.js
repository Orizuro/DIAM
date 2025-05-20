import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  if (!auth.isAuthenticated)
    alert("Faça o login para aceder a essa página");

  return auth.isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
