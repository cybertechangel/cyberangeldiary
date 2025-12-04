import React from 'react';
import { useAuth } from '../context/AuthContext';

const ArticleCard = ({ article, onDelete }) => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="article-card">
        <h2>{article.title}</h2>
        <img src={article.imageUrl} alt={article.title} className="article-image" />
        <p>{article.content}</p>
        <small>Category: {article.category}</small>

        {isAuthenticated && onDelete && (
            <button 
            onClick={() => onDelete(article.id)} 
            className="delete-button"
            >
            Delete Article
            </button>
        )}
        </div>
  );
};

export default ArticleCard;
