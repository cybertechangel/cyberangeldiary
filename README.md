# CyberAngelDiary

> Blog lifestyle moderne avec interface d'administration sécurisée

## Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Architecture globale](#architecture-globale)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Backend (API REST)](#backend-api-rest)
- [Frontend (React SPA)](#frontend-react-spa)
- [Base de données](#base-de-données)
- [Installation et configuration](#installation-et-configuration)
- [Déploiement](#déploiement)
- [API Endpoints](#api-endpoints)
- [Sécurité](#sécurité)

---

## Vue d'ensemble

**CyberAngelDiary** est une plateforme de blog moderne dédiée au lifestyle, avec deux catégories principales : **Fashion** et **Beauty**. L'application offre une expérience utilisateur fluide pour la lecture d'articles et dispose d'un tableau de bord administrateur sécurisé pour la gestion du contenu.

### Fonctionnalités principales

- Interface utilisateur moderne et responsive
- Gestion d'articles (création, suppression)
- Deux catégories : Fashion et Beauty
- Pagination des articles (4 par page)
- Authentification sécurisée avec JWT
- Tableau de bord administrateur protégé
- Architecture découplée (Frontend/Backend)

---

## Architecture globale

Le projet suit une architecture **client-serveur découplée** avec trois composants principaux hébergés séparément :

```
┌─────────────────────────────────────────────────────────────┐
│                         UTILISATEUR                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │         FRONTEND (Vercel)            │
        │      React 19 + React Router         │
        │    https://your-app.vercel.app       │
        └────────────────┬─────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │ (API Calls)
                         ▼
        ┌──────────────────────────────────────┐
        │       BACKEND (Railway)              │
        │      Node.js + Express 5             │
        │      API REST (JSON)                 │
        └────────────────┬─────────────────────┘
                         │
                         │ MySQL Protocol
                         ▼
        ┌──────────────────────────────────────┐
        │    BASE DE DONNÉES (Railway)         │
        │           MySQL 8.x                  │
        │    (Même projet Railway)             │
        └──────────────────────────────────────┘
```

### Flux de données

1. **Utilisateur** → accède au frontend hébergé sur **Vercel**
2. **Frontend** → envoie des requêtes HTTP à l'API backend sur **Railway**
3. **Backend** → interroge la base de données MySQL sur **Railway**
4. **Base de données** → retourne les données au backend
5. **Backend** → répond au frontend avec les données formatées
6. **Frontend** → affiche les données à l'utilisateur

---

## Technologies utilisées

### Frontend
- **React** 19.2.0 - Framework UI
- **React Router DOM** 7.9.5 - Routing
- **Axios** 1.13.2 - Client HTTP
- **jwt-decode** 4.0.0 - Décodage des tokens JWT
- **React Scripts** 5.0.1 - Outils de build

### Backend
- **Node.js** ≥16.0.0 - Runtime JavaScript
- **Express** 5.1.0 - Framework web
- **MySQL2** 3.15.3 - Driver MySQL
- **bcryptjs** 3.0.3 - Hashage de mots de passe
- **jsonwebtoken** 9.0.2 - Génération/validation JWT
- **cors** 2.8.5 - Gestion CORS
- **dotenv** 17.2.3 - Variables d'environnement

### Base de données
- **MySQL** 8.x - Système de gestion de base de données
- Charset: **utf8mb4** / Collation: **utf8mb4_unicode_ci**

### Hébergement
- **Vercel** - Frontend (déploiement automatique)
- **Railway** - Backend + Base de données (même projet)

---

## Structure du projet

```
cyberangeldiary/
│
├── backend/                          # API REST Node.js
│   ├── config/
│   │   ├── db.js                     # Configuration pool MySQL
│   │   └── dbschema.sql              # Schéma de base de données
│   │
│   ├── controllers/
│   │   ├── articleController.js      # Logique métier articles
│   │   └── authController.js         # Logique métier authentification
│   │
│   ├── middleware/
│   │   └── authMiddleware.js         # Middleware JWT protection
│   │
│   ├── models/
│   │   ├── articleModel.js           # Modèle données articles
│   │   └── adminModel.js             # Modèle données administrateurs
│   │
│   ├── routes/
│   │   ├── articleRoutes.js          # Routes API articles
│   │   └── authRoutes.js             # Routes API authentification
│   │
│   ├── server.js                     # Point d'entrée serveur
│   ├── package.json                  # Dépendances backend
│   └── .env                          # Variables d'environnement
│
└── frontend/                         # Application React
    ├── public/
    │   ├── index.html                # HTML principal
    │   └── img/                      # Assets images
    │
    ├── src/
    │   ├── components/
    │   │   ├── ArticleCard.js        # Carte d'article
    │   │   ├── CategoryPage.js       # Page catégorie générique
    │   │   ├── Footer.js             # Pied de page
    │   │   ├── Navbar.js             # Barre de navigation
    │   │   ├── Pagination.js         # Composant pagination
    │   │   └── ProtectedRoute.js     # Route protégée HOC
    │   │
    │   ├── config/
    │   │   └── constants.js          # Constantes application
    │   │
    │   ├── context/
    │   │   └── AuthContext.js        # Context React auth
    │   │
    │   ├── pages/
    │   │   ├── AdminDashboard.js     # Dashboard admin
    │   │   ├── BeautyPage.js         # Page catégorie Beauty
    │   │   ├── FashionPage.js        # Page catégorie Fashion
    │   │   ├── HomePage.js           # Page d'accueil
    │   │   ├── LoginPage.js          # Page de connexion
    │   │   └── NotFoundPage.js       # Page 404
    │   │
    │   ├── services/
    │   │   ├── api.js                # Configuration Axios
    │   │   ├── articleService.js     # Service API articles
    │   │   └── authService.js        # Service API auth
    │   │
    │   ├── App.js                    # Composant racine
    │   ├── App.css                   # Styles globaux
    │   └── index.js                  # Point d'entrée React
    │
    ├── package.json                  # Dépendances frontend
    └── .env                          # Variables d'environnement
```

---

## Backend (API REST)

### Architecture

Le backend suit une architecture **MVC (Model-View-Controller)** adaptée pour une API REST :

```
Routes → Middleware → Controllers → Models → Database
```

### Composants principaux

#### 1. **Server.js** - Point d'entrée
- Configuration Express
- Middleware CORS pour autoriser le frontend
- Connexion à la base de données MySQL
- Enregistrement des routes
- Gestion des erreurs globale

#### 2. **Configuration (config/)**

**db.js** - Pool de connexions MySQL
```javascript
// Pool de connexions réutilisables
mysql.createPool({
    host, user, password, database, port,
    connectionLimit: 10 // Max 10 connexions simultanées
})
```

#### 3. **Routes (routes/)**

**articleRoutes.js**
- `GET /api/articles` - Liste tous les articles
- `GET /api/articles/category/:category` - Articles par catégorie (avec pagination)
- `POST /api/articles` - Créer un article (protégé)
- `DELETE /api/articles/:id` - Supprimer un article (protégé)

**authRoutes.js**
- `POST /api/auth/login` - Authentification admin

#### 4. **Controllers (controllers/)**

**articleController.js**
- `getAllArticles()` - Récupère tous les articles
- `getArticlesByCategory()` - Filtre par catégorie + pagination
- `createArticle()` - Validation et création
- `deleteArticle()` - Suppression avec vérification

**authController.js**
- `login()` - Vérification credentials + génération JWT

#### 5. **Models (models/)**

**articleModel.js**
- Requêtes SQL pour les articles
- Gestion de la pagination
- CRUD complet

**adminModel.js**
- Requêtes SQL pour les administrateurs
- Recherche par username

#### 6. **Middleware (middleware/)**

**authMiddleware.js** - `protect()`
- Extraction du token JWT depuis `Authorization: Bearer <token>`
- Vérification de la signature JWT
- Décodage et injection de l'admin dans `req.admin`
- Protection des routes sensibles

### Variables d'environnement Backend

```env
# Serveur
PORT=5000
NODE_ENV=production

# Base de données MySQL (Railway)
DB_HOST=containers-us-west-xxx.railway.app
DB_USER=root
DB_PASSWORD=xxx
DB_NAME=cyberangeldiary
DB_PORT=3306

# JWT
JWT_SECRET=your_super_secret_key_here

# Frontend
FRONTEND_URL=https://your-app.vercel.app
```

---

## Frontend (React SPA)

### Architecture

Application **React SPA (Single Page Application)** avec une architecture basée sur :

```
Components → Services → API Backend
              ↓
           Context (Auth)
```

### Composants principaux

#### 1. **Routing (App.js)**

Routes de l'application :
- `/` - Page d'accueil (HomePage)
- `/fashion` - Catégorie Fashion (FashionPage)
- `/beauty` - Catégorie Beauty (BeautyPage)
- `/login` - Authentification (LoginPage)
- `/admin` - Dashboard admin (AdminDashboard) [protégé]
- `*` - Page 404 (NotFoundPage)

#### 2. **Pages (pages/)**

**HomePage.js**
- Affichage des articles récents de toutes les catégories
- Articles triés par date de création

**FashionPage.js / BeautyPage.js**
- Affichage des articles filtrés par catégorie
- Pagination (4 articles par page)
- Réutilisent le composant `CategoryPage`

**LoginPage.js**
- Formulaire d'authentification
- Validation côté client
- Redirection vers `/admin` après connexion

**AdminDashboard.js**
- Formulaire de création d'articles
- Liste des articles existants
- Boutons de suppression
- Accessible uniquement si authentifié

**NotFoundPage.js**
- Page d'erreur 404 personnalisée

#### 3. **Components (components/)**

**Navbar.js**
- Navigation principale
- Liens vers Fashion, Beauty, Admin
- Bouton de déconnexion (si connecté)

**ArticleCard.js**
- Carte d'article réutilisable
- Affiche : image, titre, extrait, date
- Responsive

**CategoryPage.js**
- Composant générique pour Fashion/Beauty
- Gère la pagination
- Charge les articles via API

**Pagination.js**
- Composant de pagination réutilisable
- Navigation entre les pages
- Affiche le numéro de page actuel

**ProtectedRoute.js**
- HOC (Higher-Order Component)
- Vérifie l'authentification via `AuthContext`
- Redirige vers `/login` si non authentifié

**Footer.js**
- Pied de page avec informations du site

#### 4. **Context (context/)**

**AuthContext.js**
- Gestion globale de l'état d'authentification
- Fonctions `login()` et `logout()`
- Stockage du token JWT dans `localStorage`
- Vérification automatique du token au chargement

#### 5. **Services (services/)**

**api.js**
- Configuration Axios centralisée
- Base URL de l'API
- Intercepteurs pour ajouter le token JWT automatiquement
- Timeout de 10 secondes

**articleService.js**
- `getAllArticles()` - Récupère tous les articles
- `getArticlesByCategory(category, page, limit)` - Articles paginés
- `createArticle(articleData)` - Crée un article
- `deleteArticle(id)` - Supprime un article

**authService.js**
- `login(username, password)` - Authentification
- Retourne le token JWT

#### 6. **Configuration (config/)**

**constants.js**
```javascript
API_CONFIG: {
    BASE_URL: process.env.REACT_APP_API_URL || '/api'
}
PAGINATION: {
    ARTICLES_PER_PAGE: 4
}
CATEGORIES: {
    FASHION: 'fashion',
    BEAUTY: 'beauty'
}
ROUTES: { ... }
```

### Variables d'environnement Frontend

```env
REACT_APP_API_URL=https://your-backend.up.railway.app/api
```

---

## Base de données

### Schéma MySQL

La base de données `cyberangeldiary` contient **2 tables principales** :

#### Table `admins`

Stocke les comptes administrateurs.

```sql
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,        -- Hashé avec bcrypt
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Index :**
- PRIMARY KEY sur `id`
- UNIQUE sur `username`

#### Table `articles`

Stocke les articles du blog.

```sql
CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    imageUrl VARCHAR(500) NOT NULL,
    category ENUM('fashion', 'beauty') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Index :**
- PRIMARY KEY sur `id`
- Index recommandé sur `category` pour les requêtes de filtrage
- Index recommandé sur `created_at` pour le tri

### Relations

Actuellement, il n'y a **pas de relation directe** entre les tables (pas de clé étrangère). Les articles sont créés par les admins, mais cette relation n'est pas stockée en base (simplicité du système).

### Charset et Collation

- **Charset** : `utf8mb4` (support des emojis et caractères spéciaux)
- **Collation** : `utf8mb4_unicode_ci` (insensible à la casse)

### Exemples de requêtes

```sql
-- Récupérer tous les articles de la catégorie Fashion
SELECT * FROM articles 
WHERE category = 'fashion' 
ORDER BY created_at DESC;

-- Récupérer les articles avec pagination
SELECT * FROM articles 
WHERE category = 'beauty' 
ORDER BY created_at DESC 
LIMIT 4 OFFSET 0;

-- Compter le nombre total d'articles par catégorie
SELECT COUNT(*) as total 
FROM articles 
WHERE category = 'fashion';
```

---

## Installation et configuration

### Prérequis

- **Node.js** ≥16.0.0
- **npm** ou **yarn**
- **MySQL** 8.x (local ou Railway)
- **Git**

### 1. Cloner le repository

```bash
git clone https://github.com/cybertechangel/cyberangeldiary.git
cd cyberangeldiary
```

### 2. Installation du Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` :

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=cyberangeldiary
DB_PORT=3306

JWT_SECRET=votre_secret_jwt_unique

FRONTEND_URL=http://localhost:3000
```

Initialiser la base de données :

```bash
# Se connecter à MySQL
mysql -u root -p

# Exécuter le schéma
source config/dbschema.sql
```

Démarrer le serveur :

```bash
npm run dev    # Mode développement avec nodemon
# ou
npm start      # Mode production
```

Le serveur sera disponible sur `http://localhost:5000`

### 3. Installation du Frontend

```bash
cd frontend
npm install
```

Créer un fichier `.env` :

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Démarrer l'application :

```bash
npm start
```

L'application sera disponible sur `http://localhost:3000`

### 4. Compte administrateur par défaut

Après l'initialisation de la base de données, un compte admin est créé :

- **Username** : `admin`
- **Password** : `password`

⚠️ **Important** : Changez ce mot de passe en production !

---

## Déploiement

### Backend sur Railway

1. **Créer un nouveau projet sur Railway**
2. **Ajouter un service MySQL** (dans le même projet)
3. **Déployer le backend** :
   - Connecter votre repository GitHub
   - Sélectionner le dossier `backend`
   - Railway détecte automatiquement Node.js

4. **Variables d'environnement Railway** :
   ```
   PORT=5000
   NODE_ENV=production
   DB_HOST=${MYSQLHOST}        # Variable Railway
   DB_USER=${MYSQLUSER}        # Variable Railway
   DB_PASSWORD=${MYSQLPASSWORD}# Variable Railway
   DB_NAME=${MYSQLDATABASE}    # Variable Railway
   DB_PORT=${MYSQLPORT}        # Variable Railway
   JWT_SECRET=votre_secret_production
   FRONTEND_URL=https://your-app.vercel.app
   ```

5. **Initialiser la base de données** :
   - Utiliser le Railway CLI ou l'interface web
   - Exécuter `dbschema.sql`

6. **URL du backend** : `https://your-backend.up.railway.app`

### Frontend sur Vercel

1. **Connecter votre repository à Vercel**
2. **Configuration du projet** :
   - **Framework Preset** : Create React App
   - **Root Directory** : `frontend`
   - **Build Command** : `npm run build`
   - **Output Directory** : `build`

3. **Variables d'environnement Vercel** :
   ```
   REACT_APP_API_URL=https://your-backend.up.railway.app/api
   ```

4. **Déploiement automatique** :
   - Chaque push sur `main` déclenche un redéploiement
   - Les previews sont générées pour les PRs

5. **URL du frontend** : `https://your-app.vercel.app`

### Configuration CORS

**Important** : Vérifiez que la variable `FRONTEND_URL` dans Railway correspond exactement à l'URL Vercel pour permettre les requêtes cross-origin.

---

## API Endpoints

### Base URL

```
Production: https://your-backend.up.railway.app
Development: http://localhost:5000
```

### Endpoints publics

#### 1. Health Check

```http
GET /
```

**Réponse** :
```json
{
    "status": "active",
    "message": "CyberAngelDiary API is running",
    "version": "1.0.0"
}
```

#### 2. Récupérer tous les articles

```http
GET /api/articles
```

**Réponse** :
```json
[
    {
        "id": 1,
        "title": "Tendances Fashion 2024",
        "content": "Contenu de l'article...",
        "imageUrl": "https://example.com/image.jpg",
        "category": "fashion",
        "created_at": "2024-12-01T10:30:00.000Z"
    }
]
```

#### 3. Récupérer les articles par catégorie (avec pagination)

```http
GET /api/articles/category/:category?page=1&limit=4
```

**Paramètres** :
- `category` (path) : `fashion` ou `beauty`
- `page` (query) : Numéro de page (défaut: 1)
- `limit` (query) : Articles par page (défaut: 4)

**Réponse** :
```json
{
    "articles": [...],
    "currentPage": 1,
    "totalPages": 3,
    "totalArticles": 12
}
```

#### 4. Authentification admin

```http
POST /api/auth/login
Content-Type: application/json

{
    "username": "admin",
    "password": "password"
}
```

**Réponse réussie** (200) :
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
        "id": 1,
        "username": "admin"
    }
}
```

**Réponse échec** (401) :
```json
{
    "message": "Invalid credentials"
}
```

### Endpoints protégés

**Authentification requise** : Header `Authorization: Bearer <token>`

#### 5. Créer un article

```http
POST /api/articles
Authorization: Bearer <token>
Content-Type: application/json

{
    "title": "Nouveau look 2025",
    "content": "Description complète de l'article...",
    "imageUrl": "https://example.com/image.jpg",
    "category": "fashion"
}
```

**Réponse réussie** (201) :
```json
{
    "message": "Article created successfully",
    "id": 42
}
```

#### 6. Supprimer un article

```http
DELETE /api/articles/:id
Authorization: Bearer <token>
```

**Réponse réussie** (200) :
```json
{
    "message": "Article deleted successfully"
}
```

**Réponse échec** (404) :
```json
{
    "message": "Article not found"
}
```

### Codes d'état HTTP

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (pas de token)
- `403` - Forbidden (token invalide)
- `404` - Not Found
- `500` - Internal Server Error

---

## Sécurité

### Mesures de sécurité implémentées

#### 1. **Authentification JWT**

- Les tokens JWT sont générés avec `jsonwebtoken`
- Expiration configurable (recommandé : 24h)
- Secret stocké dans les variables d'environnement
- Tokens stockés dans `localStorage` côté frontend

#### 2. **Hashage des mots de passe**

- Utilisation de **bcryptjs** avec salt rounds (10)
- Mots de passe jamais stockés en clair
- Comparaison sécurisée avec `bcrypt.compare()`

#### 3. **CORS**

- Configuration stricte pour autoriser uniquement le frontend
- En production : uniquement l'URL Vercel
- En développement : `http://localhost:3000`

#### 4. **Validation des données**

- Validation côté backend avant insertion en base
- Vérification des champs requis
- Validation du type de catégorie (enum)

#### 5. **Middleware de protection**

- Routes sensibles protégées par `authMiddleware`
- Vérification automatique du token
- Rejet des requêtes non authentifiées

#### 6. **Variables d'environnement**

- Credentials sensibles dans `.env`
- Jamais versionnés dans Git
- Configuration différente dev/prod

### Recommandations supplémentaires

Pour renforcer la sécurité en production :

1. **HTTPS obligatoire** (déjà géré par Railway/Vercel)
2. **Rate limiting** : Limiter le nombre de requêtes par IP
3. **Helmet.js** : Headers de sécurité HTTP
4. **Validation avancée** : Utiliser `express-validator`
5. **Sanitization** : Nettoyer les entrées utilisateur (XSS)
6. **SQL Injection** : Protégé via `mysql2` prepared statements
7. **Logs** : Implémenter un système de logs sécurisé
8. **Monitoring** : Surveiller les tentatives d'accès suspects
9. **Backup** : Sauvegardes régulières de la base de données
10. **Rotation des secrets** : Changer régulièrement JWT_SECRET

---

## Scripts disponibles

### Backend

```bash
npm start          # Démarre le serveur en mode production
npm run dev        # Démarre avec nodemon (hot reload)
npm test           # Lance les tests (à implémenter)
```

### Frontend

```bash
npm start          # Démarre le serveur de développement (port 3000)
npm run build      # Build pour la production
npm test           # Lance les tests Jest
npm run eject      # Eject de Create React App (irréversible)
```
