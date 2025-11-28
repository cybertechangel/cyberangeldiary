import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate('/');
    };

    return (
        <div>
            <h1 className="logo-header">CyberAngelDiary</h1>
            <nav>
                <ul className="navbar-list">
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/fashion">FASHION</Link></li>
                    <li><Link to="/beauty">BEAUTY</Link></li>
                </ul>

                <ul className="navbar-list-admin">
                    {isAuthenticated && (
                        <>
                            <li><Link to="/admin"><b>ADMIN DASHBOARD</b></Link></li>
                            <li><button onClick={handleLogout}>LOGOUT</button></li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
