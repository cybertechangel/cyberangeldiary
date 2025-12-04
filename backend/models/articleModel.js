import db from '../config/db.js';

const articleModel = {
    getAll: async () => {
        const sql = 'SELECT * FROM articles ORDER BY created_at DESC';
        const [rows] = await db.query(sql);
        return rows;
    },

    getByCategory: async (category, page, limit) => {
        const offset = (page - 1) * limit;

        const sql = 'SELECT * FROM articles WHERE category = ? ORDER BY created_at DESC LIMIT ? OFFSET ?';
        const [articles] = await db.query(sql, [category, limit, offset]);

        const countSql = 'SELECT COUNT(*) as total FROM articles WHERE category = ?';
        const [countRows] = await db.query(countSql, [category]);
        const totalArticles = countRows[0].total;

        return { articles, totalArticles };
    },

    create: async ({ title, content, imageUrl, category }) => {
        const sql = 'INSERT INTO articles (title, content, imageUrl, category) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(sql, [title, content, imageUrl, category]);
        return result.insertId;
    },

    delete: async (id) => {
        const sql = 'DELETE FROM articles WHERE id = ?';
        const [result] = await db.query(sql, [id]);
        return result.affectedRows;
    }
};

export default articleModel;