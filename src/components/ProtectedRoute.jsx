import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useApp();
  const location = useLocation();

  if (!user) {
    // Redirect to login page and save location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if role is allowed
  const roleAllowed = allowedRoles.includes(user.role);

  if (!roleAllowed) {
    // Redirect user to their own role dashboard
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user.role === 'mentor') return <Navigate to="/mentor/dashboard" replace />;
    return <Navigate to="/intern/dashboard" replace />;
  }

  return <Outlet />;
}
