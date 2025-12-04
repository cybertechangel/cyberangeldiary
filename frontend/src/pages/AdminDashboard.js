import React, { useState, useEffect } from 'react';
import articleService from '../services/articleService';
import ArticleCard from '../components/ArticleCard';
import { CATEGORIES } from '../config/constants';

const AdminDashboard = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        imageUrl: '',
        category: CATEGORIES.FASHION
    });
    const [message, setMessage] = useState('');
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        try {
            const response = await articleService.getAllArticles();
            setArticles(response.data);
        } catch (error) {
            setMessage('Error loading articles. Please refresh the page.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);

        try {
            await articleService.createArticle(formData);
            setMessage('Article created successfully!');
            setFormData({
                title: '',
                content: '',
                imageUrl: '',
                category: CATEGORIES.FASHION
            });
            await loadArticles();
        } catch (error) {
            setMessage('Error creating article. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this article?')) {
            return;
        }

        setMessage('');
        try {
            await articleService.deleteArticle(id);
            setMessage('Article deleted successfully!');
            await loadArticles();
        } catch (error) {
            setMessage('Error deleting article. Please try again.');
        }
    };

    return (
        <div className="page-container background-grid">
            {message && (
                <p style={{ 
                    fontWeight: 'bold', 
                    color: message.includes('✗') ? '#ff4444' : '#00cc66',
                    textAlign: 'center',
                    padding: '10px',
                    marginBottom: '20px'
                }}>
                    {message}
                </p>
            )}

            <form onSubmit={handleCreateSubmit}>
                <h2>Create New Article</h2>
                
                <div className="form-group">
                    <label className="form-label">Title:</label>
                    <input 
                        type="text" 
                        name="title"
                        value={formData.title} 
                        onChange={handleInputChange} 
                        required 
                        className="form-input-full"
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Image URL:</label>
                    <input 
                        type="url" 
                        name="imageUrl"
                        value={formData.imageUrl} 
                        onChange={handleInputChange} 
                        required 
                        className="form-input-full"
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Content:</label>
                    <textarea 
                        name="content"
                        value={formData.content} 
                        onChange={handleInputChange} 
                        required 
                        className="form-input-full" 
                        style={{ height: '100px' }}
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Category:</label>
                    <select 
                        name="category"
                        value={formData.category} 
                        onChange={handleInputChange}
                        disabled={isLoading}
                    >
                        <option value={CATEGORIES.FASHION}>Fashion</option>
                        <option value={CATEGORIES.BEAUTY}>Beauty</option>
                    </select>
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Publishing...' : 'Publish Article'}
                </button>
            </form>

            <h2 className="section-title" style={{ marginBottom: '20px' }}>
                Manage Articles
            </h2>

            <section>
                {articles.length > 0 ? (
                    articles.map(article => (
                        <ArticleCard 
                            key={article.id} 
                            article={article} 
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <p style={{ textAlign: 'center' }}>No articles to manage.</p>
                )}
            </section>
        </div>
    );
};

export default AdminDashboard;