import React, { useState, useEffect } from 'react';
import articleService from '../services/articleService';
import ArticleCard from '../components/ArticleCard';

const FashionPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        articleService.getArticlesByCategory('fashion')
        .then(response => {
            setArticles(response.data);
        })
        .catch(error => {
            console.error("Error fetching fashion articles:", error);
        });
    }, []);

    return (
        <div className="page-container background-grid">
            <section className="hero-section" style={{ backgroundImage: `url('/img/hero-homepage.gif')` }}>
                <h2>Fashion Articles</h2>
            </section>
            {articles.length > 0 ? (
                <div>
                    {articles.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            ) : (
                <p>No fashion articles to display at the moment.</p>
            )}
        </div>
    );
};


export default FashionPage;