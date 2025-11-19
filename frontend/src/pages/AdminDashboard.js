import React, { useState, useEffect } from 'react';
import articleService from '../services/articleService';
import ArticleCard from '../components/ArticleCard';

const AdminDashboard = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('fashion');
    const [message, setMessage] = useState('');
    const [articles, setArticles] = useState([]);

    const loadArticles = () => {
        articleService.getAllArticles()
        .then(response => {
            setArticles(response.data);
        })
        .catch(error => console.error(error));
    };

    useEffect(() => {
        loadArticles();
    }, []);

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
        await articleService.createArticle({ title, content, imageUrl, category });
        setMessage('Article created successfully!');
        setTitle('');
        setContent('');
        setImageUrl('');
        loadArticles();
        } catch (error) {
        setMessage('Error creating article.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
        try {
            await articleService.deleteArticle(id);
            setMessage('Article deleted successfully!');
            loadArticles();
        } catch (error) {
            setMessage('Error deleting article.');
        }
        }
    };

    return (
        <div className= "page-container background-grid">

        {message && <p style={{ fontWeight: 'bold', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}

    
            <form onSubmit={handleCreateSubmit}>
            <h2>Create New Article</h2>
            <div className="form-group">
                <label className="form-label">Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="form-input-full" />
            </div>
            <div className="form-group">
                <label className="form-label">Image URL:</label>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="form-input-full" />
            </div>
            <div className="form-group">
                <label className="form-label">Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required className="form-input-full" style={{ height: '100px' }} />
            </div>
            <div className="form-group">
                <label className="form-label">Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="fashion">Fashion</option>
                <option value="beauty">Beauty</option>
                </select>
            </div>
            <button type="submit">Publish Article</button>
            </form>


            <h2 className="section-title" style={{ marginBottom: '20px' }}>Manage Articles (Delete)</h2>

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
            <p>No articles to manage.</p>
            )}
        </section>
        </div>
    );
};

export default AdminDashboard;