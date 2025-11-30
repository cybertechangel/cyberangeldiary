# ⊹ CyberAngelDiary - Documentation Technique Complète

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)

## ⊹ Table des Matières

1. [Présentation du Projet](#présentation-du-projet)
2. [Architecture Globale](#architecture-globale)
3. [Stack Technique](#stack-technique)
4. [Structure du Projet](#structure-du-projet)
5. [Backend - Service Web](#backend---service-web)
6. [Frontend - Application React](#frontend---application-react)
7. [Base de Données](#base-de-données)
8. [Sécurité](#sécurité)
9. [Installation et Configuration](#installation-et-configuration)
10. [Déploiement](#déploiement)
11. [API Documentation](#api-documentation)

---

## ⊹ Présentation du Projet

**CyberAngelDiary** est un blog personnel fullstack aux thématiques "Fashion" et "Beauty", inspiré par l'esthétique Y2K/Tumblr. Le projet implémente une architecture moderne en trois couches (Frontend, Backend, Base de données) permettant la gestion et la consultation d'articles de blog.

### Objectifs

- Offrir une interface publique élégante pour la consultation d'articles
- Fournir un système d'administration sécurisé pour la gestion de contenu
- Garantir la scalabilité et la maintenabilité du code
- Implémenter les meilleures pratiques de sécurité web

### Fonctionnalités Principales

#### ⊹ Interface Publique
- **Page d'accueil** avec hero section animée
- **Filtrage par catégories** : Fashion et Beauty
- **Pagination** des articles (6 articles par page)
- **Design responsive** adapté à tous les écrans
- **Navigation intuitive** avec barre de navigation fixe

#### ⊹ Interface d'Administration
- **Authentification sécurisée** via JWT
- **Dashboard administrateur** protégé
- **Création d'articles** avec formulaire complet
- **Suppression d'articles** en un clic
- **Gestion de session** avec déconnexion automatique
- **Route cachée** (`/login`) pour éviter les accès non autorisés

---

## ⊹ Architecture Globale

Le projet suit une architecture **client-serveur en trois tiers** séparant clairement les responsabilités :

```
┌─────────────────────────────────────────────────────────────┐
│                      ARCHITECTURE GLOBALE                    │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│   CLIENT (Browser)   │  ← Interface utilisateur
│   React Application  │
│   Port: 3000         │
└──────────┬───────────┘
           │
           │ HTTP/HTTPS Requests
           │ (REST API Calls)
           ▼
┌──────────────────────┐
│   BACKEND SERVER     │  ← Logique métier
│   Node.js + Express  │
│   Port: 5000         │
└──────────┬───────────┘
           │
           │ SQL Queries
           │ (mysql2)
           ▼
┌──────────────────────┐
│   BASE DE DONNÉES    │  ← Stockage des données
│   MySQL              │
│   Port: 3306         │
└──────────────────────┘
```

### Flux de Données

#### Consultation d'Articles (Lecture)
```
User → Frontend (React) → API Request → Backend (Express) 
→ SQL Query → MySQL → Data → Backend → JSON Response → Frontend → UI Display
```

#### Création d'Article (Écriture - Authentifiée)
```
Admin → Login → JWT Token → Protected Route → Create Article Form 
→ API Request (avec token) → Backend Middleware (vérifie JWT) 
→ Controller → Model → MySQL INSERT → Response → Frontend Update
```

---

## ⊹ Stack Technique

### Backend (Service Web)

| Technologie | Version | Rôle |
|------------|---------|------|
| **Node.js** | Latest | Runtime JavaScript côté serveur |
| **Express.js** | 5.1.0 | Framework web minimaliste |
| **MySQL2** | 3.15.3 | Driver MySQL avec support Promises |
| **jsonwebtoken** | 9.0.2 | Génération et validation de tokens JWT |
| **bcryptjs** | 3.0.3 | Hashage sécurisé des mots de passe |
| **dotenv** | 17.2.3 | Gestion des variables d'environnement |
| **cors** | 2.8.5 | Gestion du Cross-Origin Resource Sharing |
| **nodemon** | 3.1.10 | Rechargement automatique en développement |

### Frontend (Application Client)

| Technologie | Version | Rôle |
|------------|---------|------|
| **React** | 19.2.0 | Bibliothèque UI pour composants réactifs |
| **React Router DOM** | 7.9.5 | Gestion du routage côté client |
| **Axios** | 1.13.2 | Client HTTP pour requêtes API |
| **jwt-decode** | 4.0.0 | Décodage des tokens JWT |
| **React Scripts** | 5.0.1 | Outils de build et développement |

### Base de Données

| Technologie | Type | Utilisation |
|------------|------|-------------|
| **MySQL** | SGBDR | Base de données relationnelle |
| **SSL/TLS** | Sécurité | Connexion chiffrée à la BDD |

---

## ⊹ Structure du Projet

```
cyberangeldiary/
│
├── 📂 backend/                     # API REST et logique serveur
│   ├── 📂 config/
│   │   └── db.js                   # Configuration pool MySQL
│   │
│   ├── 📂 controllers/             # Contrôleurs (logique métier)
│   │   ├── articleController.js    # CRUD articles
│   │   └── authController.js       # Authentification admin
│   │
│   ├── 📂 middleware/
│   │   └── authMiddleware.js       # Vérification JWT
│   │
│   ├── 📂 models/                  # Modèles de données (couche BDD)
│   │   ├── adminModel.js           # Requêtes admin
│   │   └── articleModel.js         # Requêtes articles
│   │
│   ├── 📂 routes/                  # Définition des routes API
│   │   ├── articleRoutes.js        # Routes /api/articles
│   │   └── authRoutes.js           # Routes /api/auth
│   │
│   ├── .env                        # Variables d'environnement (secret)
│   ├── .gitignore
│   ├── package.json                # Dépendances backend
│   └── server.js                   # Point d'entrée serveur
│
├── 📂 frontend/                    # Application React
│   ├── 📂 public/
│   │   ├── 📂 img/                 # Images statiques
│   │   │   ├── blog_post1.jpg
│   │   │   ├── hero-homepage.gif
│   │   │   └── ...
│   │   └── index.html              # Template HTML principal
│   │
│   ├── 📂 src/
│   │   ├── 📂 components/          # Composants réutilisables
│   │   │   ├── ArticleCard.js      # Carte article
│   │   │   ├── Footer.js           # Pied de page
│   │   │   ├── Navbar.js           # Barre de navigation
│   │   │   ├── Pagination.js       # Composant pagination
│   │   │   └── ProtectedRoute.js   # HOC protection routes admin
│   │   │
│   │   ├── 📂 context/
│   │   │   └── AuthContext.js      # Context API (état auth global)
│   │   │
│   │   ├── 📂 pages/               # Pages principales
│   │   │   ├── AdminDashboard.js   # Dashboard admin (CRUD)
│   │   │   ├── BeautyPage.js       # Page catégorie Beauty
│   │   │   ├── FashionPage.js      # Page catégorie Fashion
│   │   │   ├── HomePage.js         # Page d'accueil
│   │   │   ├── LoginPage.js        # Page connexion
│   │   │   └── NotFoundPage.js     # Page 404
│   │   │
│   │   ├── 📂 services/            # Logique communication API
│   │   │   ├── api.js              # Instance Axios configurée
│   │   │   ├── articleService.js   # Requêtes articles
│   │   │   └── authService.js      # Requêtes authentification
│   │   │
│   │   ├── App.css                 # Styles globaux
│   │   ├── App.js                  # Composant racine + Router
│   │   └── index.js                # Point d'entrée React
│   │
│   ├── .gitignore
│   └── package.json                # Dépendances frontend
│
├── .gitignore                      # Exclusions Git globales
└── README.md                       # Documentation (ce fichier)
```

---

## ⊹ Backend - Service Web

### Architecture Backend

Le backend suit le pattern **MVC (Model-View-Controller)** adapté pour une API REST :

```
Request → Routes → Middleware (Auth) → Controller → Model → Database
                                          ↓
Response ← JSON ← Controller ← Query Result ← Database
```

### Composants Détaillés

#### 1. **server.js** - Point d'Entrée
```javascript
// Initialisation du serveur Express
// Configuration CORS pour Vercel frontend
// Connexion à MySQL
// Montage des routes API
// Écoute sur le port 5000
```

**Fonctionnalités :**
- Configuration du middleware CORS pour accepter les requêtes depuis `https://cyberangeldiary.vercel.app`
- Parsing JSON des requêtes entrantes
- Test de connexion MySQL au démarrage
- Route racine (`/`) pour vérifier le statut de l'API

#### 2. **config/db.js** - Connexion Base de Données
```javascript
// Pool de connexions MySQL avec mysql2/promise
// Configuration SSL pour connexions sécurisées
// Gestion de 10 connexions simultanées maximum
```

**Configuration du Pool :**
- **host** : Adresse du serveur MySQL
- **user** : Nom d'utilisateur BDD
- **password** : Mot de passe BDD (hashé dans .env)
- **database** : Nom de la base de données
- **connectionLimit** : 10 connexions max
- **ssl** : Connexion chiffrée activée

#### 3. **Routes API**

##### **articleRoutes.js**
```
GET    /api/articles              → Récupérer tous les articles
GET    /api/articles/category/:category?page=1&limit=6 
                                  → Articles par catégorie (paginés)
POST   /api/articles              → Créer un article [PROTÉGÉ]
DELETE /api/articles/:id          → Supprimer un article [PROTÉGÉ]
```

##### **authRoutes.js**
```
POST   /api/auth/login            → Connexion administrateur
```

#### 4. **Controllers (Logique Métier)**

##### **articleController.js**
- `getAllArticles()` : Retourne tous les articles triés par date
- `getArticlesByCategory()` : Filtre par catégorie avec pagination
- `createArticle()` : Validation et insertion d'un nouvel article
- `deleteArticle()` : Suppression sécurisée d'un article

##### **authController.js**
- `login()` : 
  - Vérifie les identifiants
  - Compare le hash bcrypt du mot de passe
  - Génère un token JWT valide 1 heure
  - Retourne le token au client

#### 5. **Models (Couche Données)**

##### **articleModel.js**
```sql
-- Requêtes SQL exécutées :
SELECT * FROM articles ORDER BY created_at DESC
SELECT * FROM articles WHERE category = ? ORDER BY created_at DESC LIMIT ? OFFSET ?
INSERT INTO articles (title, content, imageUrl, category) VALUES (?, ?, ?, ?)
DELETE FROM articles WHERE id = ?
```

##### **adminModel.js**
```sql
SELECT * FROM admins WHERE username = ?
```

#### 6. **Middleware**

##### **authMiddleware.js** - Protection des Routes
```javascript
// Extrait le token du header Authorization: Bearer <token>
// Vérifie la signature JWT avec JWT_SECRET
// Décode le payload et l'attache à req.admin
// Autorise ou rejette la requête
```

**Flux d'Authentification :**
```
Request Header: "Authorization: Bearer eyJhbGc..."
     ↓
Middleware extrait le token
     ↓
jwt.verify(token, JWT_SECRET)
     ↓
Si valide → req.admin = decoded → next()
Si invalide → 403 Forbidden
Si absent → 401 Unauthorized
```

### Variables d'Environnement (.env)

```bash
# Base de données
DB_HOST=your-mysql-host
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=cyberangeldiary
DB_PORT=3306

# JWT Secret (généré aléatoirement)
JWT_SECRET=your-super-secret-key-here

# Port serveur
PORT=5000
```

---

## ⊹ Frontend - Application React

### Architecture Frontend

L'application React suit une architecture **composant-based** avec gestion d'état via Context API :

```
App.js (Router)
    ├── Navbar (toujours visible)
    ├── Main Content (Routes)
    │   ├── HomePage
    │   ├── FashionPage
    │   ├── BeautyPage
    │   ├── LoginPage
    │   ├── AdminDashboard (ProtectedRoute)
    │   └── NotFoundPage
    └── Footer (toujours visible)
```

### Composants Détaillés

#### 1. **App.js** - Composant Racine
```javascript
// Configuration React Router DOM v7
// Définition des routes publiques et protégées
// Structure globale (Navbar + Main + Footer)
```

**Routes Définies :**
- `/` → HomePage (page d'accueil avec hero)
- `/fashion` → FashionPage (articles Fashion)
- `/beauty` → BeautyPage (articles Beauty)
- `/login` → LoginPage (connexion admin)
- `/admin` → AdminDashboard (dashboard protégé)
- `*` → NotFoundPage (404)

#### 2. **Context API - AuthContext.js**

**État Global Géré :**
```javascript
{
  admin: null | { adminId, username },  // Infos admin connecté
  token: null | "JWT_TOKEN",            // Token JWT
  login: (token) => {},                 // Fonction connexion
  logout: () => {}                      // Fonction déconnexion
}
```

**Fonctionnalités :**
- Stockage du token dans `localStorage`
- Décodage automatique du token avec `jwt-decode`
- Persistance de la session (rechargement page)
- Déconnexion automatique si token expiré

#### 3. **Pages Principales**

##### **HomePage.js**
- Hero section animée avec GIF Y2K
- Message de bienvenue
- Liens vers les catégories Fashion/Beauty
- Design responsive avec CSS Grid

##### **FashionPage.js & BeautyPage.js**
- Récupération des articles via API
- Affichage en grille avec `ArticleCard`
- Pagination interactive (6 articles/page)
- Gestion des états de chargement
- Message si aucun article trouvé

##### **LoginPage.js**
- Formulaire contrôlé React (username, password)
- Validation côté client
- Appel API `/api/auth/login`
- Stockage du token JWT
- Redirection vers `/admin` après succès
- Affichage des erreurs d'authentification

##### **AdminDashboard.js**
- **Section Création** : Formulaire avec titre, image URL, contenu, catégorie
- **Section Liste** : Affichage de tous les articles
- **Actions** : Bouton supprimer pour chaque article
- **Déconnexion** : Bouton logout avec effacement du token

##### **NotFoundPage.js**
- Page 404 personnalisée
- Lien de retour à l'accueil

#### 4. **Composants Réutilisables**

##### **Navbar.js**
- Navigation fixe en haut de page
- Logo/Titre du site
- Liens : Home, Fashion, Beauty
- Responsive avec menu burger sur mobile

##### **Footer.js**
- Informations copyright
- Liens réseaux sociaux
- Design minimaliste

##### **ArticleCard.js**
```javascript
// Affiche : Image, Titre, Contenu (tronqué), Catégorie
// Props : { article: { id, title, imageUrl, content, category } }
```

##### **Pagination.js**
```javascript
// Props : { currentPage, totalPages, onPageChange }
// Affiche : Prev | 1 2 3 ... | Next
// Désactive les boutons aux extrémités
```

##### **ProtectedRoute.js**
```javascript
// HOC (Higher-Order Component)
// Vérifie la présence du token JWT
// Si authentifié → affiche le composant enfant
// Sinon → redirige vers /login
```

#### 5. **Services API**

##### **api.js**
```javascript
// Instance Axios configurée
axios.create({
  baseURL: 'http://localhost:5000/api', // ou URL de production
  headers: { 'Content-Type': 'application/json' }
})

// Intercepteur pour ajouter le token JWT automatiquement
interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})
```

##### **articleService.js**
```javascript
getAllArticles()              // GET /api/articles
getArticlesByCategory(cat, page, limit) // GET /api/articles/category/:cat
createArticle(articleData)    // POST /api/articles
deleteArticle(id)             // DELETE /api/articles/:id
```

##### **authService.js**
```javascript
login(username, password)     // POST /api/auth/login
```

### Style CSS (App.css)

**Approche de Design :**
- **Reset CSS** pour cohérence cross-browser
- **Variables CSS** pour couleurs Y2K (rose, violet, bleu)
- **Flexbox et Grid** pour layouts modernes
- **Media Queries** pour responsive design
- **Animations CSS** pour effets hover
- **Typographie** inspirée esthétique Tumblr/Y2K

---

## 🗄️ Base de Données

### Schéma de la Base de Données

#### Table : **admins**
```sql
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Hash bcrypt
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Description :**
- Stocke les administrateurs du blog (un seul admin dans ce projet)
- Le mot de passe est hashé avec bcrypt (10 rounds)
- Utilisation d'un script `hashAdmin.js` pour générer le hash initial

#### Table : **articles**
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
- `category` : Contrainte ENUM pour éviter les valeurs invalides
- `imageUrl` : URL d'une image hébergée (Imgur, Cloudinary, etc.)
- `created_at` : Date de création automatique

### Relations

```
admins (1) ─────── (N) articles
   │                    │
   └── Créé par ────────┘
   (Relation implicite, pas de FK dans ce projet)
```

### Requêtes SQL Principales

#### Récupération Articles par Catégorie (avec Pagination)
```sql
-- Articles de la page demandée
SELECT * FROM articles 
WHERE category = 'fashion' 
ORDER BY created_at DESC 
LIMIT 6 OFFSET 0;

-- Total d'articles pour calculer les pages
SELECT COUNT(*) as total 
FROM articles 
WHERE category = 'fashion';
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

**Type de Pool :** `mysql2/promise` (basé sur Promises pour async/await)

**Paramètres :**
- `connectionLimit: 10` → Max 10 connexions simultanées
- `waitForConnections: true` → Attend si toutes connexions occupées
- `queueLimit: 0` → Pas de limite de file d'attente
- `ssl: { rejectUnauthorized: false }` → Connexion SSL (pour hébergeurs cloud)

---

## ⊹ Sécurité

### Mesures Implémentées

#### 1. **Authentification JWT**
```
┌─────────────────────────────────────────────┐
│ Flux d'Authentification Sécurisé            │
└─────────────────────────────────────────────┘

1. Admin entre username/password
2. Backend vérifie hash bcrypt
3. Si OK → génère JWT signé avec JWT_SECRET
4. Token envoyé au client (stocké en localStorage)
5. Chaque requête protégée inclut le token
6. Middleware vérifie la signature JWT
7. Si valide → accès autorisé
8. Token expire après 1 heure
```

**Avantages :**
- Stateless (pas de session côté serveur)
- Scalable (fonctionne avec load balancers)
- Token contient les infos nécessaires (adminId, username)

#### 2. **Hashage des Mots de Passe (bcrypt)**
```javascript
// Génération du hash (lors de la création admin)
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(plainPassword, salt);

// Vérification (lors du login)
const isMatch = await bcrypt.compare(inputPassword, storedHash);
```

**Sécurité :**
- Algorithme bcrypt adaptatif (résiste aux attaques brute-force)
- 10 rounds de salting (2^10 = 1024 itérations)
- Impossible de retrouver le mot de passe depuis le hash

#### 3. **CORS (Cross-Origin Resource Sharing)**
```javascript
cors({
  origin: 'https://cyberangeldiary.vercel.app',  // Frontend autorisé
  credentials: true                              // Autorise cookies/auth
})
```

**Protection :**
- Empêche les requêtes depuis des domaines non autorisés
- Évite les attaques CSRF (Cross-Site Request Forgery)

#### 4. **Variables d'Environnement**
- Secrets (JWT_SECRET, DB_PASSWORD) stockés dans `.env`
- Fichier `.env` exclu de Git via `.gitignore`
- Utilisation de `dotenv` pour charger les variables

#### 5. **Validation des Entrées**
```javascript
// Backend : Validation des champs requis
if (!title || !content || !imageUrl || !category) {
  return res.status(400).json({ message: 'All fields are required' });
}

// Backend : Validation de la catégorie
if (category !== 'fashion' && category !== 'beauty') {
  return res.status(400).json({ message: 'Invalid category' });
}
```

#### 6. **Protection contre les Injections SQL**
```javascript
// Utilisation de requêtes préparées (parameterized queries)
const sql = 'SELECT * FROM articles WHERE category = ?';
await db.query(sql, [category]);  // mysql2 échappe automatiquement
```

### Failles Potentielles et Améliorations

| Faille | État | Amélioration Possible |
|--------|------|----------------------|
| XSS (Cross-Site Scripting) | ⚠️ Non protégé | Sanitiser le contenu HTML avec DOMPurify |
| CSRF | ✅ Partiellement | Implémenter des tokens CSRF |
| Rate Limiting | ❌ Absent | Ajouter express-rate-limit |
| HTTPS Only | ⚠️ En production | Forcer HTTPS avec Helmet.js |
| SQL Injection | ✅ Protégé | Requêtes préparées OK |
| Password Strength | ⚠️ Non validé | Imposer complexité (8+ caractères, etc.) |

---

## ⊹ Installation et Configuration

### Prérequis

- **Node.js** : Version 16+ ([Download](https://nodejs.org/))
- **MySQL** : Version 8+ ([Download](https://dev.mysql.com/downloads/))
- **npm** ou **yarn** : Gestionnaire de paquets
- **Git** : Pour cloner le repository

### Étape 1 : Cloner le Projet

```bash
git clone https://github.com/cybertechangel/cyberangeldiary.git
cd cyberangeldiary
```

### Étape 2 : Configuration de la Base de Données

#### 2.1 Créer la Base de Données
```sql
CREATE DATABASE cyberangeldiary;
USE cyberangeldiary;
```

#### 2.2 Créer les Tables
```sql
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

#### 2.3 Créer l'Administrateur
```bash
cd backend

# Créer un fichier hashAdmin.js
cat > hashAdmin.js << 'EOF'
import bcrypt from 'bcryptjs';

const password = 'VotreMotDePasseSecurise';
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
console.log('Hashed Password:', hashedPassword);
EOF

# Exécuter le script
node hashAdmin.js
```

Insérer le hash dans la base :
```sql
INSERT INTO admins (username, password) 
VALUES ('admin', 'le_hash_généré_ci-dessus');
```

### Étape 3 : Configuration Backend

```bash
cd backend
npm install

# Créer le fichier .env
cat > .env << 'EOF'
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_mysql
DB_NAME=cyberangeldiary
DB_PORT=3306

JWT_SECRET=votre_clé_secrète_jwt_aléatoire_longue
PORT=5000
EOF
```

**Générer un JWT_SECRET sécurisé :**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Étape 4 : Configuration Frontend

```bash
cd ../frontend
npm install

# Si nécessaire, ajuster l'URL de l'API dans src/services/api.js
# Pour développement local :
# baseURL: 'http://localhost:5000/api'
```

### Étape 5 : Lancement de l'Application

#### Mode Développement

**Terminal 1 (Backend) :**
```bash
cd backend
npm run dev  # Utilise nodemon pour rechargement auto
```

**Terminal 2 (Frontend) :**
```bash
cd frontend
npm start    # Lance React sur http://localhost:3000
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
npm run build    # Crée le build optimisé dans /build
# Servir avec un serveur web (Nginx, Apache) ou Vercel
```

### Étape 6 : Vérification

1. **Backend** : Ouvrir `http://localhost:5000` → Doit afficher "Fullstack Blog API is running..."
2. **Frontend** : Ouvrir `http://localhost:3000` → Page d'accueil du blog
3. **Admin** : Aller sur `http://localhost:3000/login` → Se connecter

---

## ⊹ Déploiement

### Backend (Railway/Render/Heroku)

#### Exemple : Déploiement sur Render

1. Créer un compte sur [Render.com](https://render.com)
2. Créer un nouveau **Web Service**
3. Connecter votre repository GitHub
4. Configurer :
   - **Root Directory** : `backend`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
5. Ajouter les variables d'environnement dans le dashboard
6. Déployer

**URL obtenue :** `https://votre-app.onrender.com`

### Frontend (Vercel/Netlify)

#### Exemple : Déploiement sur Vercel

```bash
cd frontend

# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Suivre les instructions :
# - Set up and deploy? Yes
# - Which scope? Votre compte
# - Link to existing project? No
# - Project name? cyberangeldiary-frontend
# - Directory? ./
# - Override settings? No
```

**Après déploiement :**
1. Noter l'URL frontend : `https://cyberangeldiary.vercel.app`
2. Mettre à jour le CORS dans `backend/server.js` :
```javascript
cors({
  origin: 'https://cyberangeldiary.vercel.app',
  credentials: true
})
```
3. Mettre à jour `baseURL` dans `frontend/src/services/api.js` :
```javascript
baseURL: 'https://votre-backend.onrender.com/api'
```

### Base de Données (PlanetScale/Railway/FreeMySQLHosting)

#### Exemple : PlanetScale (MySQL Cloud)

1. Créer un compte sur [PlanetScale](https://planetscale.com)
2. Créer une nouvelle database
3. Obtenir les credentials de connexion
4. Importer le schéma SQL via l'interface ou CLI
5. Mettre à jour les variables d'environnement backend

---

## ⊹ API Documentation

### Base URL
```
Production: https://votre-backend.onrender.com/api
Local: http://localhost:5000/api
```

### Endpoints

#### **Articles**

##### 1. Récupérer tous les articles
```http
GET /articles
```

**Réponse :**
```json
[
  {
    "id": 1,
    "title": "Tendances Fashion 2025",
    "content": "Les tendances mode de cette année...",
    "imageUrl": "https://placehold.co/400",
    "category": "fashion",
    "created_at": "2025-11-30T10:00:00.000Z"
  }
]
```

##### 2. Récupérer les articles par catégorie (paginés)
```http
GET /articles/category/:category?page=1&limit=6
```

**Paramètres :**
- `category` (path) : `fashion` ou `beauty`
- `page` (query) : Numéro de page (default: 1)
- `limit` (query) : Articles par page (default: 6)

**Réponse :**
```json
{
  "articles": [ /* array d'articles */ ],
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
  "imageUrl": "https://placehold.co/400",
  "category": "fashion"
}
```

**Réponse :**
```json
{
  "message": "Article created successfully",
  "id": 15
}
```

##### 4. Supprimer un article [PROTÉGÉ]
```http
DELETE /articles/:id
Authorization: Bearer <JWT_TOKEN>
```

**Réponse :**
```json
{
  "message": "Article deleted successfully"
}
```

#### **Authentification**

##### 1. Connexion Admin
```http
POST /auth/login
Content-Type: application/json
```

**Body :**
```json
{
  "username": "admin",
  "password": "mot_de_passe"
}
```

**Réponse :**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Codes de Statut HTTP

| Code | Signification |
|------|---------------|
| 200 | OK - Requête réussie |
| 201 | Created - Ressource créée |
| 400 | Bad Request - Données invalides |
| 401 | Unauthorized - Token manquant |
| 403 | Forbidden - Token invalide |
| 404 | Not Found - Ressource inexistante |
| 500 | Internal Server Error - Erreur serveur |

### Exemple d'Utilisation (JavaScript)

```javascript
// Récupérer des articles
const response = await fetch('http://localhost:5000/api/articles/category/fashion?page=1');
const data = await response.json();
console.log(data.articles);

// Créer un article (authentifié)
const token = localStorage.getItem('token');
const response = await fetch('http://localhost:5000/api/articles', {
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

---

## ⊹ Notes Complémentaires

### Scripts Utiles

#### Backend
```bash
npm start       # Lancer le serveur
npm run dev     # Mode développement (nodemon)
```

#### Frontend
```bash
npm start       # Mode développement (hot reload)
npm run build   # Build de production
npm test        # Lancer les tests
```

### Fichiers à ne PAS commiter
```
backend/.env
backend/node_modules/
frontend/node_modules/
frontend/build/
```

### Ressources et Documentation

- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT.io](https://jwt.io/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)

---

## ⊹ Auteur

**CyberTechAngel**  
GitHub: [@cybertechangel](https://github.com/cybertechangel)

---

## ⊹ Licence

Ce projet est à usage personnel et éducatif.

---

**Dernière mise à jour** : Novembre 2025