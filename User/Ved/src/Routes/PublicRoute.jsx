
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem('token'); // Check if user is logged in

  return isAuthenticated ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;
