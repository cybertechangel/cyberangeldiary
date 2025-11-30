# CyberAngelDiary - Documentation Technique

## Table des Matières

1. [Présentation du Projet](#présentation-du-projet)
2. [Architecture Globale](#architecture-globale)
3. [Stack Technique](#stack-technique)
4. [Structure du Projet](#structure-du-projet)
5. [Backend - API REST](#backend---api-rest)
6. [Frontend - Application React](#frontend---application-react)
7. [Base de Données](#base-de-données)
8. [Sécurité](#sécurité)
9. [Installation et Configuration](#installation-et-configuration)
10. [Déploiement](#déploiement)
11. [API Documentation](#api-documentation)

---

## Présentation du Projet

**CyberAngelDiary** est un blog personnel fullstack aux thématiques "Fashion" et "Beauty", inspiré par l'esthétique Y2K/Tumblr. Le projet implémente une **architecture micro-services moderne** avec déploiement distribué sur Railway (backend + database) et Vercel (frontend).

### Objectifs

- Offrir une interface publique élégante pour la consultation d'articles
- Fournir un système d'administration sécurisé pour la gestion de contenu
- Garantir la scalabilité et la maintenabilité du code
- Implémenter les meilleures pratiques de sécurité web

### Fonctionnalités Principales

#### Interface Publique
- Page d'accueil avec hero section animée
- Filtrage par catégories : Fashion et Beauty
- Pagination des articles (6 articles par page)
- Design responsive adapté à tous les écrans
- Navigation intuitive avec barre de navigation

#### Interface d'Administration
- Authentification sécurisée via JWT
- Dashboard administrateur protégé
- Création et suppression d'articles
- Gestion de session avec déconnexion automatique
- Routes protégées par middleware

---

## Architecture Globale

Le projet suit une architecture **micro-services client-serveur** avec déploiement distribué :

```
┌─────────────────────────────────────────────────────────────┐
│              ARCHITECTURE GLOBALE (DISTRIBUÉE)               │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│   CLIENT (Browser)   │  ← Interface utilisateur
│   React Application  │  ← Déployé sur VERCEL
│   Port: 3000 (dev)   │
└──────────┬───────────┘
           │
           │ HTTPS Requests (REST API)
           │ axios + interceptors
           ▼
┌──────────────────────┐
│   BACKEND SERVER     │  ← Logique métier + API REST
│   Node.js + Express  │  ← Déployé sur RAILWAY
│   Port: 5000         │  ← Middleware JWT + CORS
└──────────┬───────────┘
           │
           │ SQL Queries (mysql2)
           │ Connection Pool SSL
           ▼
┌──────────────────────┐
│   BASE DE DONNÉES    │  ← Stockage des données
│   MySQL 8+           │  ← Hébergé sur RAILWAY
│   Port: 3306         │    (Même projet que Backend)
└──────────────────────┘
```

### Caractéristiques Architecturales

- **Frontend (Vercel)** : Application React déployée sur CDN global avec optimisation automatique
- **Backend (Railway)** : API REST Node.js avec auto-scaling et déploiement continu
- **Base de Données (Railway)** : MySQL 8+ avec connexion SSL et backups automatiques
- **Communication** : API REST avec JWT pour l'authentification
- **État Global** : React Context API pour la gestion de l'authentification

### Flux de Données

#### Consultation d'Articles (Public)
```
User → Frontend → API Request → Backend → MySQL Query → Response → Display
```

#### Création d'Article (Authentifié)
```
Admin → Login → JWT Token → Protected Route → API Request (avec token)
→ Middleware (vérifie JWT) → Controller → Model → MySQL INSERT 
→ Response → Frontend Update
```

---

## Stack Technique

### Backend (Service Web)

| Technologie | Version | Rôle |
|------------|---------|------|
| **Node.js** | ≥16.0.0 | Runtime JavaScript côté serveur |
| **Express.js** | 5.1.0 | Framework web avec support ES Modules |
| **MySQL2** | 3.15.3 | Driver MySQL avec Promises/Pool |
| **jsonwebtoken** | 9.0.2 | Génération et validation JWT |
| **bcryptjs** | 3.0.3 | Hashage sécurisé des mots de passe |
| **dotenv** | 17.2.3 | Variables d'environnement |
| **cors** | 2.8.5 | Cross-Origin Resource Sharing |
| **nodemon** | 3.1.10 | Rechargement automatique (dev) |

### Frontend (Application Client)

| Technologie | Version | Rôle |
|------------|---------|------|
| **React** | 19.2.0 | Bibliothèque UI avec composants |
| **React Router DOM** | 7.9.5 | Routage côté client |
| **Axios** | 1.13.2 | Client HTTP avec interceptors |
| **jwt-decode** | 4.0.0 | Décodage des tokens JWT |
| **React Scripts** | 5.0.1 | Build et développement CRA |

### Base de Données

| Technologie | Type | Utilisation |
|------------|------|-------------|
| **MySQL** | 8+ | Base de données relationnelle |
| **SSL/TLS** | Sécurité | Connexion chiffrée Railway |

### Infrastructure (Hébergement)

| Service | Rôle | Hébergement |
|---------|------|-------------|
| **Vercel** | Frontend (React) | CDN Global + CI/CD |
| **Railway** | Backend (Express) | Auto-scaling + Logs |
| **Railway** | MySQL Database | Backups + SSL |

---

## Structure du Projet

```
cyberangeldiary/
│
├── backend/                          # API REST (Node.js + Express)
│   ├── config/
│   │   └── db.js                     # Pool MySQL avec SSL
│   │
│   ├── controllers/                  # Logique métier (MVC)
│   │   ├── articleController.js      # CRUD articles
│   │   └── authController.js         # Authentification JWT
│   │
│   ├── middleware/
│   │   └── authMiddleware.js         # Vérification JWT
│   │
│   ├── models/                       # Requêtes SQL
│   │   ├── adminModel.js             # Gestion admins
│   │   └── articleModel.js           # Gestion articles
│   │
│   ├── routes/                       # Routes API Express
│   │   ├── articleRoutes.js          # /api/articles
│   │   └── authRoutes.js             # /api/auth
│   │
│   ├── .env                          # Variables d'environnement
│   ├── .gitignore
│   ├── package.json                  # Dépendances backend
│   └── server.js                     # Point d'entrée serveur
│
├── frontend/                         # Application React
│   ├── public/
│   │   ├── img/                      # Images statiques
│   │   │   ├── blog_post1.jpg
│   │   │   ├── blog_post2.jpg
│   │   │   ├── blog_post3.jpg
│   │   │   ├── blog_post4.jpg
│   │   │   ├── blog_post5.jpg
│   │   │   ├── blog_post6.jpg
│   │   │   ├── hero-beautypage.gif
│   │   │   ├── hero-homepage.gif
│   │   │   ├── moodboard_thetennisprincess.png
│   │   │   └── thetennisprincess.png
│   │   └── index.html                # Template HTML
│   │
│   ├── src/
│   │   ├── components/               # Composants réutilisables
│   │   │   ├── ArticleCard.js        # Carte article
│   │   │   ├── CategoryPage.js       # Page catégorie (DRY)
│   │   │   ├── Footer.js             # Pied de page
│   │   │   ├── Navbar.js             # Navigation
│   │   │   ├── Pagination.js         # Composant pagination
│   │   │   └── ProtectedRoute.js     # HOC protection routes
│   │   │
│   │   ├── config/
│   │   │   └── constants.js          # Configuration centralisée
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.js        # Context API (auth globale)
│   │   │
│   │   ├── pages/                    # Pages principales
│   │   │   ├── AdminDashboard.js     # Dashboard CRUD
│   │   │   ├── BeautyPage.js         # Catégorie Beauty
│   │   │   ├── FashionPage.js        # Catégorie Fashion
│   │   │   ├── HomePage.js           # Page d'accueil
│   │   │   ├── LoginPage.js          # Connexion admin
│   │   │   └── NotFoundPage.js       # Page 404
│   │   │
│   │   ├── services/                 # Logique API
│   │   │   ├── api.js                # Instance Axios + interceptors
│   │   │   ├── articleService.js     # Requêtes articles
│   │   │   └── authService.js        # Requêtes auth
│   │   │
│   │   ├── App.css                   # Styles globaux
│   │   ├── App.js                    # Composant racine + Router
│   │   └── index.js                  # Point d'entrée React
│   │
│   ├── .gitignore
│   └── package.json                  # Dépendances frontend
│
├── .gitignore                        # Exclusions Git
└── README.md                         # Documentation (ce fichier)
```

---

## Backend - API REST

### Architecture Backend

Le backend suit le pattern **MVC (Model-View-Controller)** adapté pour une API REST :

```
Request → Routes → Middleware (Auth) → Controller → Model → Database
                                          ↓
Response ← JSON ← Controller ← Query Result ← Database
```

### Composants Détaillés

#### 1. server.js - Point d'Entrée

**Fonctionnalités :**
- Configuration CORS pour accepter les requêtes depuis Vercel
- Parsing JSON des requêtes entrantes
- Test de connexion MySQL au démarrage
- Health check endpoint (`/`)
- Gestion des erreurs 404 et 500
- Logging conditionnel (production vs développement)

**Configuration CORS :**
```javascript
cors({
  origin: process.env.FRONTEND_URL || 'https://cyberangeldiary.vercel.app',
  credentials: true
})
```

#### 2. config/db.js - Connexion Base de Données

**Configuration du Pool MySQL :**
- Pool de connexions avec mysql2/promise
- 10 connexions simultanées maximum
- Connexion SSL sécurisée pour Railway
- Gestion automatique des connexions
- Support des requêtes préparées

#### 3. Routes API

##### articleRoutes.js
```
GET    /api/articles                           → Tous les articles
GET    /api/articles/category/:category        → Articles par catégorie (paginés)
       ?page=1&limit=6
POST   /api/articles                           → Créer un article [PROTÉGÉ]
DELETE /api/articles/:id                       → Supprimer un article [PROTÉGÉ]
```

##### authRoutes.js
```
POST   /api/auth/login                         → Connexion administrateur
```

#### 4. Controllers (Logique Métier)

##### articleController.js
- `getAllArticles()` : Liste tous les articles triés par date décroissante
- `getArticlesByCategory()` : Filtre par catégorie avec pagination (6/page)
- `createArticle()` : Validation et insertion d'un article
- `deleteArticle()` : Suppression sécurisée

##### authController.js
- `login()` : 
  - Vérifie les identifiants
  - Compare le hash bcrypt
  - Génère un token JWT valide 1 heure
  - Retourne le token

#### 5. Models (Couche Données)

##### articleModel.js
```sql
-- Requêtes SQL préparées :
SELECT * FROM articles ORDER BY created_at DESC
SELECT * FROM articles WHERE category = ? ORDER BY created_at DESC LIMIT ? OFFSET ?
INSERT INTO articles (title, content, imageUrl, category) VALUES (?, ?, ?, ?)
DELETE FROM articles WHERE id = ?
SELECT COUNT(*) as total FROM articles WHERE category = ?
```

##### adminModel.js
```sql
SELECT * FROM admins WHERE username = ?
```

#### 6. Middleware

##### authMiddleware.js - Protection des Routes

**Fonctionnement :**
1. Extrait le token du header `Authorization: Bearer <token>`
2. Vérifie la signature JWT avec `JWT_SECRET`
3. Décode le payload et l'attache à `req.admin`
4. Autorise (next) ou rejette (401/403) la requête

**Flux :**
```
Header: "Authorization: Bearer eyJhbGc..."
     ↓
Middleware extrait le token
     ↓
jwt.verify(token, JWT_SECRET)
     ↓
Valid → req.admin = decoded → next()
Invalid → 403 Forbidden
Missing → 401 Unauthorized
```

### Variables d'Environnement (.env)

```bash
# Base de données Railway
DB_HOST=containers-us-west-xxx.railway.app
DB_USER=root
DB_PASSWORD=VotreMotDePasseRailway
DB_NAME=railway
DB_PORT=7543

# Frontend URL (CORS)
FRONTEND_URL=https://cyberangeldiary.vercel.app

# JWT Secret (généré aléatoirement)
JWT_SECRET=votre_secret_jwt_64_caracteres_minimum

# Port serveur
PORT=5000

# Environment
NODE_ENV=production
```

**Note** : Les credentials Railway se trouvent dans **"Connect → Public Network"** de votre service MySQL.

---

## Frontend - Application React

### Architecture Frontend

Architecture **composant-based** avec gestion d'état via Context API et configuration centralisée :

```
App.js (Router + AuthProvider)
    ├── Navbar (navigation globale)
    ├── Main Content (Routes)
    │   ├── HomePage
    │   ├── FashionPage → CategoryPage
    │   ├── BeautyPage → CategoryPage
    │   ├── LoginPage
    │   ├── AdminDashboard (ProtectedRoute)
    │   └── NotFoundPage (404)
    └── Footer
```

### Composants Détaillés

#### 1. App.js - Composant Racine

**Configuration React Router DOM v7 :**
- Routes publiques : `/`, `/fashion`, `/beauty`, `/login`
- Route protégée : `/admin` (via ProtectedRoute HOC)
- Route 404 : `*`
- Structure globale : Navbar + Main + Footer

#### 2. Context API - AuthContext.js

**État Global :**
```javascript
{
  admin: null | { adminId, username },  // Infos admin
  token: null | "JWT_TOKEN",            // Token JWT
  login: (token) => {},                 // Fonction connexion
  logout: () => {}                      // Fonction déconnexion
}
```

**Fonctionnalités :**
- Stockage du token dans `localStorage`
- Décodage automatique avec `jwt-decode`
- Persistance de session (rechargement page)
- Déconnexion automatique si token expiré

#### 3. Configuration Centralisée - constants.js

**Exports :**
```javascript
// API Configuration
API_CONFIG: { BASE_URL, TIMEOUT }

// Pagination
PAGINATION: { ARTICLES_PER_PAGE: 6 }

// Categories
CATEGORIES: { FASHION: 'fashion', BEAUTY: 'beauty' }

// Routes
ROUTES: { HOME, FASHION, BEAUTY, LOGIN, ADMIN }

// Message Types
MESSAGE_TYPES: { SUCCESS, ERROR, INFO }
```

**Avantages :**
- Source unique de vérité (Single Source of Truth)
- Modification centralisée (un changement = tout l'app)
- Évite les hard-coded values
- Facilite la maintenance

#### 4. Pages Principales

##### HomePage.js
- Hero section avec GIF animé
- Message de bienvenue
- Liens vers catégories
- Design responsive

##### FashionPage.js & BeautyPage.js
- Utilisation du composant réutilisable `CategoryPage`
- Simplifiés à 14 lignes chacun (réduction 73%)
- Props : category, heroImage, title

##### LoginPage.js
- Formulaire contrôlé React
- Validation côté client
- États de chargement (bouton désactivé pendant requête)
- Utilisation des constantes `ROUTES`, `MESSAGE_TYPES`
- Redirection vers `/admin` après succès

##### AdminDashboard.js
- Formulaire de création avec gestion d'état unifiée (`formData` object)
- Liste de tous les articles avec suppression
- Utilisation des constantes `CATEGORIES`
- États de chargement pour les opérations async
- Bouton de déconnexion

##### NotFoundPage.js
- Page 404 personnalisée
- Lien de retour à l'accueil

#### 5. Composants Réutilisables

##### CategoryPage.js (Nouveau - DRY)
**Composant générique pour affichage par catégorie :**
- Props : `{ category, heroImage, title }`
- Récupération des articles via API
- Pagination intégrée
- États de chargement et erreurs
- Réutilisé par FashionPage et BeautyPage
- **Impact** : Réduction de 106 lignes de code dupliqué

##### ArticleCard.js
- Affiche : Image, Titre, Contenu (tronqué), Catégorie
- Design card moderne
- Hover effects

##### Pagination.js
- Props : `{ currentPage, totalPages, onPageChange }`
- Boutons Prev/Next
- Numéros de pages
- Désactivation aux extrémités

##### ProtectedRoute.js
- Higher-Order Component (HOC)
- Vérifie présence du token JWT
- Redirige vers `/login` si non authentifié
- Utilise `ROUTES` constants

##### Navbar.js
- Navigation fixe
- Logo/Titre du site
- Liens : Home, Fashion, Beauty
- Utilise `ROUTES` constants
- Responsive (menu burger mobile)

##### Footer.js
- Copyright
- Liens réseaux sociaux
- Design minimaliste

#### 6. Services API

##### api.js - Instance Axios Configurée
```javascript
// Configuration
baseURL: API_CONFIG.BASE_URL
timeout: API_CONFIG.TIMEOUT (10s)

// Request Interceptor
→ Ajoute automatiquement le token JWT depuis localStorage

// Response Interceptor
→ Gestion globale des erreurs (401, 403, timeout)
→ Redirection automatique vers /login si token expiré
```

##### articleService.js
```javascript
getAllArticles()                      // GET /api/articles
getArticlesByCategory(cat, page, limit) // GET /api/articles/category/:cat
createArticle(articleData)            // POST /api/articles
deleteArticle(id)                     // DELETE /api/articles/:id
```

##### authService.js
```javascript
login(username, password)             // POST /api/auth/login
```

---

## Base de Données

### Schéma de la Base de Données

#### Table : admins
```sql
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,      -- Hash bcrypt
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Description :**
- Stocke les administrateurs (un seul dans ce projet)
- Mot de passe hashé avec bcrypt (10 rounds)
- Username unique pour éviter les doublons

#### Table : articles
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

**Description :**
- Stocke tous les articles du blog
- `category` : ENUM pour contrainte de données
- `imageUrl` : URL image hébergée (Imgur, Cloudinary, etc.)
- `created_at` : Timestamp automatique

### Relations

```
admins (1) ─────── (N) articles
   │                    │
   └── Créé par ────────┘
   (Relation implicite, pas de FK)
```

### Requêtes SQL Principales

#### Récupération Articles par Catégorie (avec Pagination)
```sql
-- Articles de la page demandée
SELECT * FROM articles 
WHERE category = ? 
ORDER BY created_at DESC 
LIMIT ? OFFSET ?;

-- Total d'articles (pour pagination)
SELECT COUNT(*) as total 
FROM articles 
WHERE category = ?;
```

#### Création d'un Article
```sql
INSERT INTO articles (title, content, imageUrl, category) 
VALUES (?, ?, ?, ?);
```

#### Suppression d'un Article
```sql
DELETE FROM articles WHERE id = ?;
```

#### Authentification Admin
```sql
SELECT * FROM admins WHERE username = ?;
```

### Configuration de la Connexion

**Type de Pool :** `mysql2/promise` (Promises pour async/await)

**Paramètres :**
- `connectionLimit: 10` → Max 10 connexions simultanées
- `waitForConnections: true` → Attente si connexions occupées
- `queueLimit: 0` → Pas de limite de file d'attente
- `ssl: { rejectUnauthorized: false }` → Connexion SSL Railway

---

## Sécurité

### Mesures Implémentées

#### 1. Authentification JWT (JSON Web Token)

**Flux Sécurisé :**
```
1. Admin entre username/password
2. Backend vérifie hash bcrypt
3. Si OK → génère JWT signé avec JWT_SECRET
4. Token envoyé au client (localStorage)
5. Chaque requête protégée inclut token
6. Middleware vérifie signature JWT
7. Si valide → accès autorisé
8. Token expire après 1 heure
```

**Avantages :**
- Stateless (pas de session serveur)
- Scalable (compatible load balancers)
- Token auto-descriptif (contient adminId, username)

#### 2. Hashage Bcrypt

**Implémentation :**
```javascript
// Création admin (hash)
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(plainPassword, salt);

// Login (vérification)
const isMatch = await bcrypt.compare(inputPassword, storedHash);
```

**Sécurité :**
- Algorithme adaptatif anti-brute-force
- 10 rounds de salting (2^10 = 1024 itérations)
- Hash irréversible

#### 3. CORS (Cross-Origin Resource Sharing)

**Configuration :**
```javascript
cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
})
```

**Protection :**
- Bloque requêtes depuis domaines non autorisés
- Prévient les attaques CSRF

#### 4. Variables d'Environnement

- Secrets (JWT_SECRET, DB_PASSWORD) dans `.env`
- Fichier `.env` exclu de Git via `.gitignore`
- Utilisation de `dotenv` pour chargement sécurisé

#### 5. Validation des Entrées

**Backend :**
```javascript
// Validation champs requis
if (!title || !content || !imageUrl || !category) {
  return res.status(400).json({ message: 'All fields required' });
}

// Validation catégorie
if (!['fashion', 'beauty'].includes(category)) {
  return res.status(400).json({ message: 'Invalid category' });
}
```

#### 6. Protection Injection SQL

**Requêtes Préparées :**
```javascript
const sql = 'SELECT * FROM articles WHERE category = ?';
await db.query(sql, [category]);  // mysql2 échappe automatiquement
```

### Gestion des Erreurs

#### Backend (server.js)
```javascript
// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// 500 Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});
```

#### Frontend (api.js)
```javascript
// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = ROUTES.LOGIN;
    }
    return Promise.reject(error);
  }
);
```

---

## Installation et Configuration

### Prérequis

- **Node.js** : Version 16+ ([nodejs.org](https://nodejs.org/))
- **npm** ou **yarn** : Gestionnaire de paquets
- **Git** : Pour cloner le repository
- **Compte Railway** : Pour base de données MySQL
- **Compte Vercel** : Pour déploiement frontend (optionnel)

### Étape 1 : Cloner le Projet

```bash
git clone https://github.com/cybertechangel/cyberangeldiary.git
cd cyberangeldiary
```

### Étape 2 : Configuration Base de Données Railway

#### 2.1 Créer un Projet Railway

1. Aller sur [Railway.app](https://railway.app)
2. Se connecter avec GitHub
3. Créer un nouveau projet : **"New Project"**

#### 2.2 Déployer MySQL

1. Dans votre projet, cliquer **"+ New"**
2. Sélectionner **"Database → MySQL"**
3. Railway crée la base automatiquement
4. Noter les credentials dans **"Connect → Public Network"** :
   - `MYSQL_HOST` (ex: containers-us-west-xxx.railway.app)
   - `MYSQL_PORT` (ex: 7543)
   - `MYSQL_USER` (ex: root)
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE` (ex: railway)

#### 2.3 Créer les Tables

Via **phpMyAdmin** (déployé sur Railway) ou client SQL (MySQL Workbench, DBeaver) :

```sql
-- Sélectionner la base
USE railway;

-- Table admins
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table articles
CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    imageUrl VARCHAR(500) NOT NULL,
    category ENUM('fashion', 'beauty') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2.4 Créer l'Administrateur

**Générer un hash bcrypt :**
```bash
# Via Node.js
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('VotreMotDePasse', 10).then(hash => console.log(hash));"
```

Ou utiliser [bcrypt-generator.com](https://bcrypt-generator.com/)

**Insérer l'admin :**
```sql
INSERT INTO admins (username, password) 
VALUES ('admin', '$2a$10$VotreHashBcryptGenere');
```

### Étape 3 : Configuration Backend

```bash
cd backend
npm install
```

**Créer le fichier `.env` :**
```bash
# Base de données Railway (Public Network)
DB_HOST=containers-us-west-xxx.railway.app
DB_USER=root
DB_PASSWORD=VotreMotDePasseRailway
DB_NAME=railway
DB_PORT=7543

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:3000

# JWT Secret (généré aléatoirement)
JWT_SECRET=votre_secret_jwt_64_caracteres_minimum

# Port serveur
PORT=5000

# Environment
NODE_ENV=development
```

**Générer un JWT_SECRET sécurisé :**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Étape 4 : Configuration Frontend

```bash
cd ../frontend
npm install
```

**Configuration API :**

Le fichier `src/services/api.js` utilise la constante `API_CONFIG.BASE_URL` de `constants.js`.

Pour le développement local, le frontend utilise `/api` qui sera proxyfié par Create React App.

**Créer un fichier `.env` (optionnel pour override) :**
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

### Étape 5 : Lancement de l'Application

#### Mode Développement

**Terminal 1 (Backend) :**
```bash
cd backend
npm run dev  # Utilise nodemon
```

**Terminal 2 (Frontend) :**
```bash
cd frontend
npm start    # Lance sur http://localhost:3000
```

#### Mode Production

**Backend :**
```bash
cd backend
npm start
```

**Frontend :**
```bash
cd frontend
npm run build    # Crée /build
# Servir avec serveur web ou Vercel
```

### Étape 6 : Vérification

1. **Backend** : `http://localhost:5000` → JSON status
2. **Frontend** : `http://localhost:3000` → Page d'accueil
3. **Database** : Vérifier connexion via logs backend
4. **Admin** : `http://localhost:3000/login` → Se connecter

---

## Déploiement

### Architecture de Déploiement

```
Frontend (Vercel)  →  HTTPS API Calls  →  Backend (Railway)  →  MySQL (Railway)
      CDN                 REST API              Express           Same Project
```

### Backend + Base de Données (Railway)

Railway héberge backend Express ET base de données MySQL dans le **même projet**.

#### Étape 1 : Base de Données MySQL (déjà configurée)

Si vous avez suivi l'installation, votre base MySQL Railway est déjà prête avec les tables et l'admin.

#### Étape 2 : Déployer Backend Express

**Via GitHub (recommandé) :**

1. Push votre code sur GitHub
2. Dans Railway, cliquer **"+ New → GitHub Repo"**
3. Sélectionner `cyberangeldiary`
4. Configurer le service :
   - **Root Directory** : `backend`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`

**Ajouter les Variables d'Environnement :**

Dans les settings du service backend :

```
DB_HOST=containers-us-west-xxx.railway.app
DB_USER=root
DB_PASSWORD=xxx
DB_NAME=railway
DB_PORT=xxxx
FRONTEND_URL=https://cyberangeldiary.vercel.app
JWT_SECRET=votre_secret_jwt
PORT=5000
NODE_ENV=production
```

**Note** : Railway détecte automatiquement Node.js

**URL obtenue** : `https://cyberangeldiary-production.up.railway.app`

### Frontend (Vercel)

#### Déploiement via Dashboard Vercel

1. Aller sur [Vercel.com](https://vercel.com)
2. Cliquer **"Add New → Project"**
3. Importer votre repository GitHub
4. Configurer :
   - **Framework Preset** : Create React App
   - **Root Directory** : `frontend`
   - **Build Command** : `npm run build`
   - **Output Directory** : `build`
5. Ajouter variable d'environnement :
   ```
   REACT_APP_API_URL=https://votre-backend.up.railway.app/api
   ```
6. Déployer

**URL obtenue** : `https://cyberangeldiary.vercel.app`

#### Déploiement via CLI Vercel

```bash
cd frontend

# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Suivre les instructions
# Pour production :
vercel --prod
```

### Configuration Post-Déploiement

#### 1. Mettre à jour CORS Backend

Dans `backend/server.js` (ou via variable d'environnement Railway) :

```javascript
cors({
  origin: process.env.FRONTEND_URL || 'https://cyberangeldiary.vercel.app',
  credentials: true
})
```

Redéployer le backend.

#### 2. Vérifier l'URL API Frontend

Dans `frontend/src/services/api.js`, la baseURL utilise `API_CONFIG.BASE_URL` de `constants.js`.

Assurez-vous que la variable d'environnement `REACT_APP_API_URL` est définie sur Vercel :

```
REACT_APP_API_URL=https://votre-backend.up.railway.app/api
```

Redéployer le frontend.

### Vérification du Déploiement

1. **Frontend** : Ouvrir `https://cyberangeldiary.vercel.app`
2. **Backend** : Ouvrir `https://votre-backend.up.railway.app` → JSON status
3. **Test Complet** : Se connecter `/login` et créer un article

### URLs de Production

```
Frontend:  https://cyberangeldiary.vercel.app
Backend:   https://cyberangeldiary-production.up.railway.app
Database:  containers-us-west-xxx.railway.app:xxxx (privé)
```

### Déploiement Continu (CI/CD)

- **Railway** : Redéploie automatiquement à chaque push sur `main`
- **Vercel** : Redéploie automatiquement à chaque push sur `main`

---

## API Documentation

### Base URL

```
Production: https://cyberangeldiary-production.up.railway.app/api
Local:      http://localhost:5000/api
```

### Endpoints

#### Articles

##### 1. Récupérer tous les articles
```http
GET /articles
```

**Réponse (200 OK) :**
```json
[
  {
    "id": 1,
    "title": "Tendances Fashion 2025",
    "content": "Les tendances mode de cette année...",
    "imageUrl": "https://example.com/image.jpg",
    "category": "fashion",
    "created_at": "2025-11-30T10:00:00.000Z"
  }
]
```

##### 2. Récupérer articles par catégorie (paginés)
```http
GET /articles/category/:category?page=1&limit=6
```

**Paramètres :**
- `category` (path) : `fashion` ou `beauty`
- `page` (query, optionnel) : Numéro de page (default: 1)
- `limit` (query, optionnel) : Articles par page (default: 6)

**Réponse (200 OK) :**
```json
{
  "articles": [
    {
      "id": 1,
      "title": "Article Fashion",
      "content": "Contenu...",
      "imageUrl": "https://...",
      "category": "fashion",
      "created_at": "2025-11-30T10:00:00.000Z"
    }
  ],
  "currentPage": 1,
  "totalPages": 5,
  "totalArticles": 28
}
```

##### 3. Créer un article [PROTÉGÉ]
```http
POST /articles
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Body :**
```json
{
  "title": "Nouveau Article",
  "content": "Contenu de l'article...",
  "imageUrl": "https://example.com/image.jpg",
  "category": "fashion"
}
```

**Réponse (201 Created) :**
```json
{
  "message": "Article created successfully",
  "id": 15
}
```

**Erreurs :**
- `400 Bad Request` : Champs manquants ou catégorie invalide
- `401 Unauthorized` : Token manquant
- `403 Forbidden` : Token invalide

##### 4. Supprimer un article [PROTÉGÉ]
```http
DELETE /articles/:id
Authorization: Bearer <JWT_TOKEN>
```

**Réponse (200 OK) :**
```json
{
  "message": "Article deleted successfully"
}
```

**Erreurs :**
- `401 Unauthorized` : Token manquant
- `403 Forbidden` : Token invalide
- `500 Internal Server Error` : Erreur serveur

#### Authentification

##### 1. Connexion Admin
```http
POST /auth/login
Content-Type: application/json
```

**Body :**
```json
{
  "username": "admin",
  "password": "VotreMotDePasse"
}
```

**Réponse (200 OK) :**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erreurs :**
- `400 Bad Request` : Champs manquants
- `401 Unauthorized` : Identifiants invalides

### Health Check

##### Vérifier le statut de l'API
```http
GET /
```

**Réponse (200 OK) :**
```json
{
  "status": "active",
  "message": "CyberAngelDiary API is running",
  "version": "1.0.0"
}
```

### Codes de Statut HTTP

| Code | Signification |
|------|---------------|
| 200 | OK - Requête réussie |
| 201 | Created - Ressource créée |
| 400 | Bad Request - Données invalides |
| 401 | Unauthorized - Token manquant |
| 403 | Forbidden - Token invalide/expiré |
| 404 | Not Found - Ressource inexistante |
| 500 | Internal Server Error - Erreur serveur |

### Authentification JWT

**Format du Header :**
```
Authorization: Bearer <token>
```

**Structure du Token :**
```javascript
{
  "adminId": 1,
  "username": "admin",
  "iat": 1638360000,    // Issued at
  "exp": 1638363600     // Expiration (1h)
}
```

**Durée de Validité :** 1 heure

### Exemples d'Utilisation

#### JavaScript (Fetch API)
```javascript
// Récupérer des articles
const response = await fetch('https://votre-backend.up.railway.app/api/articles/category/fashion?page=1');
const data = await response.json();
console.log(data.articles);

// Créer un article (authentifié)
const token = localStorage.getItem('token');
const response = await fetch('https://votre-backend.up.railway.app/api/articles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'Mon Article',
    content: 'Contenu...',
    imageUrl: 'https://...',
    category: 'beauty'
  })
});
```

#### Axios (Frontend Service)
```javascript
import articleService from './services/articleService';

// Récupérer articles
const response = await articleService.getArticlesByCategory('fashion', 1);
console.log(response.data.articles);

// Créer article
await articleService.createArticle({
  title: 'Nouveau',
  content: 'Contenu',
  imageUrl: 'https://...',
  category: 'fashion'
});
```

---

## Maintenance et Scripts

### Scripts Backend

```bash
# Lancer le serveur en production
npm start

# Mode développement (nodemon)
npm run dev

# Installer les dépendances
npm install
```

### Scripts Frontend

```bash
# Mode développement (hot reload)
npm start

# Build de production
npm run build

# Lancer les tests
npm test

# Installer les dépendances
npm install
```

### Fichiers à ne PAS Commiter

```
backend/.env
backend/node_modules/
frontend/node_modules/
frontend/build/
.DS_Store
*.log
.env.local
.env.production
```

---

## Outils Recommandés

### Développement

- **[Visual Studio Code](https://code.visualstudio.com/)** - Éditeur de code
- **[Postman](https://www.postman.com/)** - Tester les API REST
- **[MySQL Workbench](https://www.mysql.com/products/workbench/)** - Client MySQL
- **[DBeaver](https://dbeaver.io/)** - Alternative multi-DB

### Déploiement

- **[Railway](https://railway.app)** - Backend + Database
- **[Vercel](https://vercel.com)** - Frontend
- **[GitHub](https://github.com)** - Contrôle de version

### Ressources et Documentation

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT.io](https://jwt.io/) - Décodeur JWT
- [Axios Documentation](https://axios-http.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)

---

## Contributeur

**CyberTechAngel**  
GitHub: [@cybertechangel](https://github.com/cybertechangel)

---

## Licence

Ce projet est à usage personnel et éducatif.

---

**Dernière mise à jour** : Novembre 2025  
**Version** : 1.1.0
