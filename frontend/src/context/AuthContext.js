import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = authService.getCurrentUserToken();
        if (token) {
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 > Date.now()) {
            setIsAuthenticated(true);
            } else {
            authService.logout();
            setIsAuthenticated(false);
            }
        } catch (error) {
            authService.logout();
            setIsAuthenticated(false);
        }
        }
    }, []);

    const login = async (username, password) => {
        try {
        await authService.login(username, password);
        setIsAuthenticated(true);
        } catch (error) {
        setIsAuthenticated(false);
        throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
