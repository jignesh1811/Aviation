// src/routes/PrivateRoute.tsx
import React, { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedAccess?: string[];
}

const PrivateRoute = ({ children, allowedAccess }: PrivateRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  if (allowedAccess && !user?.role_specific.can_access.some(role => allowedAccess.includes(role))){
    return <Navigate to="/noaccess" replace />;
  }

  return children;
};

export default PrivateRoute;
