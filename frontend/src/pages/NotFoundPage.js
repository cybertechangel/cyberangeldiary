import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (

        <div className="page-container background-grid">
            <section className="not-found-card">
                <h2>404</h2>
                <p>Page Not Found</p>
                <p>Sorry, the page you are looking for does not exist or has been moved.</p>
                
                <Link to="/" className="btn-card">
                    Go back to home
                </Link>
            </section>
        </div>
            
    );
};

export default NotFoundPage;