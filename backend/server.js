import express from 'express';
import dotenv from 'dotenv'; 
import cors from 'cors';
import db from './config/db.js';

import articleRoutes from './routes/articleRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Configuration
dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Test de la connexion DB
db.getConnection()
    .then(connection => {
        console.log('Connecté à la base de données MySQL !');
        connection.release(); 
    })
    .catch(err => {
        console.error('Erreur de connexion à la DB:', err.message);
        process.exit(1); 
    });

// Routes de l'API
app.get('/', (req, res) => {
    res.send('API Blog Fullstack en marche...');
});

app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});