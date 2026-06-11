import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import authRoutes from '../modules/auth/auth.routes';
import { useAuth } from '../context/AuthContext';

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  // If the application is still checking if a cookie exists on boot up, show a loading message
  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading Platform...</div>;
  }

  return (
    <Routes>
      {/* 1. Spread out and load all your modular Auth routes (/login, /register) */}
      {authRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
 
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <div style={{ padding: '20px' }}>
              <h1>Welcome to the PERN Platform Dashboard!</h1>
              <p>Your Auth module works flawlessly. This is a protected dashboard area.</p>
              <button onClick={() => window.location.href = '/login'}>Go to Login/Logout Options</button>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />

      {/* 3. Catch-all route for pages that don't exist */}
      <Route path="*" element={<h1 style={{ padding: '20px' }}>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;