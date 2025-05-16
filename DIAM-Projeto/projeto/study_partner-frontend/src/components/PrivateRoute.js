import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return auth.isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
