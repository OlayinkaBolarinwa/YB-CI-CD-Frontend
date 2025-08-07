// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

import CicdDashboard from "./CicdDashboard.jsx";
import LoginPage from "./LoginPage.jsx";
import SignUpPage from "./SignUpPage.jsx";
import EnvironmentsPage from "./EnvironmentsPage.jsx";
import SettingsPage from "./SettingsPage.jsx"; 
import PipelinesPage from "./PipelinesPage.jsx"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out: " + error.message);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>
        Loading authentication...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUpPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <CicdDashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/environments"
          element={isAuthenticated ? <EnvironmentsPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/settings"
          element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/pipelines"
          element={isAuthenticated ? <PipelinesPage /> : <Navigate to="/login" replace />}
        />

        {/* Default route */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />

        {/* Catch-all route for unknown paths */}
        <Route path="*" element={<h1 style={{textAlign: 'center', marginTop: '50px'}}>404 - Page Not Found</h1>} />
      </Routes>

      {isAuthenticated && (
          <button
              onClick={handleLogout}
              style={{
                  position: 'fixed',
                  top: '20px',
                  right: '20px',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  zIndex: 1000,
              }}
          >
              Logout
          </button>
      )}
    </Router>
  );
}

export default App;
