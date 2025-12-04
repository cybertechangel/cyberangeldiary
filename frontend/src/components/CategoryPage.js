import React, { useState, useEffect } from 'react';
import articleService from '../services/articleService';
import ArticleCard from './ArticleCard';
import Pagination from './Pagination';
import { CATEGORIES } from '../config/constants';

const CategoryPage = ({ category, heroImage, title }) => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadArticles();
    }, [currentPage, category]);

    const loadArticles = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await articleService.getArticlesByCategory(category, currentPage);
            setArticles(response.data.articles);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError(`Failed to load ${category} articles. Please try again later.`);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) {
        return (
            <div className="page-container background-grid">
                <section className="hero-section" style={{ backgroundImage: `url('${heroImage}')` }}>
                    <h2>{title}</h2>
                </section>
                <p style={{ textAlign: 'center', padding: '40px' }}>Loading articles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container background-grid">
                <section className="hero-section" style={{ backgroundImage: `url('${heroImage}')` }}>
                    <h2>{title}</h2>
                </section>
                <p style={{ textAlign: 'center', color: '#ff4444', padding: '40px' }}>{error}</p>
            </div>
        );
    }

    return (
        <div className="page-container background-grid">
            <section className="hero-section" style={{ backgroundImage: `url('${heroImage}')` }}>
                <h2>{title}</h2>
            </section>
            
            {articles.length > 0 ? (
                <>
                    <div>
                        {articles.map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={handlePageChange} 
                        />
                    )}
                </>
            ) : (
                <p style={{ textAlign: 'center', padding: '40px' }}>
                    No {category} articles available at the moment.
                </p>
            )}
        </div>
    );
};

export default CategoryPage;
