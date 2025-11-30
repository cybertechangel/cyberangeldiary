import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
        <h3>FOLLOW US</h3>
        <div className="footer-social-links">
            <a href="https://www.pinterest.com/cyberangeldiary/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-pinterest-p fa-beat"></i>
            </a>
            <a href="https://www.instagram.com/cyberangeldiary/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-beat"></i>
            </a>
            <a href="https://www.tumblr.com/cyberangeldiary/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tumblr fa-beat"></i>
            </a>
        </div>
        <p>&copy; 2025 CyberAngelDiary. All rights reserved.</p>
        </footer>
    );
};

export default Footer;