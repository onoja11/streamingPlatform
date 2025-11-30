import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';

const AdminRoute = ({ children }) => {
  const { user, isLoading } = usePlayer();

  // 1. Wait for session check to finish
  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  // 2. Security Check: Must be logged in AND 'admin'
  if (!user.isLoggedIn || user.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  // 3. Access Granted
  return children;
};

export default AdminRoute;