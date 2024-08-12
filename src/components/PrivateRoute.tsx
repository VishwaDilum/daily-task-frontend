import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component:any,
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, isAuthenticated }) => {
  return isAuthenticated ? <Component /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
