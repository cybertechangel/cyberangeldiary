import React, { useState, useEffect } from 'react';
import articleService from '../services/articleService';
import ArticleCard from '../components/ArticleCard';

const BeautyPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        articleService.getArticlesByCategory('beauty')
        .then(response => {
            setArticles(response.data);
        })
        .catch(error => {
            console.error("Error fetching beauty articles:", error);
        });
    }, []);

    return (
        <div className="page-container background-grid">
            <section className="hero-section" style={{ backgroundImage: `url('/img/hero-beautypage.gif')` }}>
                <h2>Beauty Articles</h2>
            </section>
            
            {articles.length > 0 ? (
                <div>
                    {articles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: 'center' }}>No beauty articles to display at the moment.</p>
            )}
        </div>
    );
};


export default BeautyPage;