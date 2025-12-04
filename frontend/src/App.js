import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './config/constants';

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
                    <Route path={ROUTES.HOME} element={<HomePage />} />
                    <Route path={ROUTES.FASHION} element={<FashionPage />} />
                    <Route path={ROUTES.BEAUTY} element={<BeautyPage />} />
                    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                    <Route 
                        path={ROUTES.ADMIN} 
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
