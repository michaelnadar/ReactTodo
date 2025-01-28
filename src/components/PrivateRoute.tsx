import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Helper function to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('dns'); // Example token check
};

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  return isAuthenticated() ? (
    <>{element}</> // Render the protected element if authenticated
  ) : (
    <Navigate to="/login" replace /> // Redirect to login if not authenticated
  );
};

export default PrivateRoute;
