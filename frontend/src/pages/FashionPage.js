import React, { useState, useEffect } from 'react';
import articleService from '../services/articleService';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination'; 

const FashionPage = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        articleService.getArticlesByCategory('fashion', currentPage)
        .then(response => {
            setArticles(response.data.articles);
            setTotalPages(response.data.totalPages);
        })
        .catch(error => {
            console.error("Error fetching fashion articles:", error);
        });
    }, [currentPage]); 

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo(0, 0); 
    };

    return (
        <div className="page-container background-grid">
            <section className="hero-section" style={{ backgroundImage: `url('/img/hero-homepage.gif')` }}>
                <h2>Fashion Articles</h2>
            </section>
            
            {articles.length > 0 ? (
                <>
                    <div>
                        {articles.map(article => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                    <Pagination 
                        currentPage={currentPage} 
                        totalPages={totalPages} 
                        onPageChange={handlePageChange} 
                    />
                </>
            ) : (
                <p>No fashion articles to display at the moment.</p>
            )}
        </div>
    );
};

export default FashionPage;