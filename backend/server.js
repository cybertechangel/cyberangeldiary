import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import db from './config/db.js';
import articleRoutes from './routes/articleRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());

db.getConnection()
    .then(connection => {
        if (process.env.NODE_ENV !== 'production') {
            console.log('Connected to MySQL database');
        }
        connection.release();
    })
    .catch(err => {
        console.error('Database connection error:', err.message);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.json({ 
        status: 'active',
        message: 'CyberAngelDiary API is running',
        version: '1.0.0'
    });
});

app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ 
        message: 'Internal server error',
        ...(process.env.NODE_ENV !== 'production' && { error: err.message })
    });
});

app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Server running on port ${PORT}`);
    }
});