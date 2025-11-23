import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import db from './config/db.js';
import articleRoutes from './routes/articleRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://cyberangeldiary.vercel.app',
  credentials: true
}));
app.use(express.json());

db.getConnection()
    .then(connection => {
        console.log('Connected to MySQL database!');
        connection.release();
    })
    .catch(err => {
        console.error('Database connection error:', err.message);
       
    });

app.get('/', (req, res) => {
    res.send('Fullstack Blog API is running...');
});

app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});