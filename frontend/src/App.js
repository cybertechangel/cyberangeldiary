import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import FashionPage from './pages/FashionPage';
import BeautyPage from './pages/BeautyPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';

import './App.css';

function App() {
    return (
        <div className="App">
        <Navbar />
        <main>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fashion" element={<FashionPage />} />
            <Route path="/beauty" element={<BeautyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
                path="/admin" 
                element={
                <ProtectedRoute>
                    <AdminDashboard />
                </ProtectedRoute>
                } 
            />
            <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </main>
        <Footer />
        </div>
    );
}

export default App;
