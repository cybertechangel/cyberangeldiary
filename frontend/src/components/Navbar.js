import React from 'react';
// 1. Importer 'useNavigate' pour forcer la redirection
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate(); // 2. Initialiser le hook

    // 3. Créer une fonction pour gérer le clic
    const handleLogout = () => {
      logout(); // Efface le token et met à jour le contexte
      navigate('/'); // Redirige immédiatement vers la page d'accueil
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
                
                {/* Liste séparée pour les liens admin */}
                <ul className="navbar-list-admin">
                    {isAuthenticated && (
                        <>
                            <li><Link to="/admin"><b>ADMIN DASHBOARD</b></Link></li>
                            {/* 4. Appeler la nouvelle fonction au clic */}
                            <li><button onClick={handleLogout}>LOGOUT</button></li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;