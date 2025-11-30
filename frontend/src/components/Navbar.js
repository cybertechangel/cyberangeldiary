import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../config/constants';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(ROUTES.HOME);
    };

    return (
        <div>
            <h1 className="logo-header">CyberAngelDiary</h1>
            <nav>
                <ul className="navbar-list">
                    <li><Link to={ROUTES.HOME}>HOME</Link></li>
                    <li><Link to={ROUTES.FASHION}>FASHION</Link></li>
                    <li><Link to={ROUTES.BEAUTY}>BEAUTY</Link></li>
                </ul>

                <ul className="navbar-list-admin">
                    {isAuthenticated && (
                        <>
                            <li><Link to={ROUTES.ADMIN}><b>ADMIN DASHBOARD</b></Link></li>
                            <li><button onClick={handleLogout}>LOGOUT</button></li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
