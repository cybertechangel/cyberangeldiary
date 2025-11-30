import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ROUTES } from '../config/constants';

const checkAuth = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return false; 
    }

    try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
            return true; 
        } else {
            localStorage.removeItem('token'); 
            return false;
        }
    } catch (error) {
        localStorage.removeItem('token'); 
        return false;
    }
};

const ProtectedRoute = ({ children }) => {
    const isAuth = checkAuth();

    if (!isAuth) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return children;
};

export default ProtectedRoute;