import db from '../config/db.js';

const adminModel = {
    findByUsername: async (username) => {
        const sql = 'SELECT * FROM admins WHERE username = ?';
        const [rows] = await db.query(sql, [username]);
        return rows[0];
    }
};

export default adminModel;
