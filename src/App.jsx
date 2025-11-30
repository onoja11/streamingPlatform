import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import Upload from './pages/Upload';
import './App.css';
import Auth from './pages/auth/Auth';
import Library from './pages/Library';
import AlbumDetails from './components/AlbumDetails';
import AdminRoute from './components/AdminRoute';
import ManageContent from './pages/ManageContent';

const App = () => {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect root to home */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />

          {/* Protected App Routes */}
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/upload" element={<AdminRoute><Upload /></AdminRoute>} />
            {/* <Route path="/search" element={<div className="p-10 text-white">Search Page</div>} /> */}
            <Route path="/library" element={<Library />} />
            <Route path="/album/:id" element={<AlbumDetails />} />
            <Route
              path="/manage"
              element={
                <AdminRoute>
                  <ManageContent />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
};

export default App;