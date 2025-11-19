# CyberAngelDiary - Blog Fullstack

Bienvenue sur le dépôt de CyberAngelDiary, un blog personnel fullstack aux thématiques "Fashion" et "Beauty", inspiré par l'esthétique Y2K/Tumblr.

Ce projet a été construit avec une architecture moderne séparant le backend (API REST) et le frontend (Application React). Il permet aux visiteurs de consulter des articles et à un administrateur unique de gérer le contenu via un tableau de bord sécurisé.

## Description

Le site se compose de deux parties principales :
1.  **Interface Publique :** Permet aux visiteurs de lire les articles, filtrés par catégorie (Mode ou Beauté).
2.  **Interface d'Administration :** Une section sécurisée (protégée par mot de passe) permettant à l'administrateur de créer et supprimer des articles.

## Fonctionnalités

* **Consultation Publique :**
    * Page d'accueil avec mise en avant visuelle (Hero section).
    * Filtrage des articles par catégories : "Fashion" et "Beauty".
    * Affichage des articles sous forme de cartes (Image, Titre, Contenu).
* **Gestion de Contenu (Admin) :**
    * Système d'authentification sécurisé (JWT).
    * Page de connexion cachée (`/login`).
    * Tableau de bord administrateur (`/admin`).
    * Formulaire de création d'articles (Titre, Image, Contenu, Catégorie).
    * Suppression d'articles existants.
    * Déconnexion sécurisée.

## Stack Technique

### Backend (API)
* **Serveur :** Node.js
* **Framework :** Express.js
* **Base de Données :** MySQL (piloté par `mysql2`)
* **Authentification :** JSON Web Tokens (JWT)
* **Sécurité :** `bcryptjs` (Hashage de mots de passe), `dotenv` (Variables d'environnement), `cors`.

### Frontend (Client)
* **Bibliothèque :** React.js
* **Routage :** `react-router-dom`
* **Client HTTP :** `axios`
* **Gestion d'état :** React Context API (pour l'authentification)
* **Décodage Token :** `jwt-decode`
* **Design :** CSS3 (Flexbox, Grid, Responsive).

## Structure du Projet

cyberangeldiary/
│
├── backend/
│   ├── config/
│   │   └── db.js               # Connexion Base de données
│   ├── controllers/            # Logique métier
│   │   ├── articleController.js
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js   # Protection des routes
│   ├── models/                 # Requêtes SQL
│   │   ├── adminModel.js
│   │   └── articleModel.js
│   ├── node_modules/           # (Dépendances installées - Ignoré par Git)
│   ├── routes/                 # Routes API
│   │   ├── articleRoutes.js
│   │   └── authRoutes.js
│   ├── .env                    # (Variables secrètes - Ignoré par Git)
│   ├── .gitignore
│   ├── hashAdmin.js            # Script utilitaire
│   ├── package.json
│   └── server.js               # Entrée du serveur
│
├── frontend/
│   ├── node_modules/           # (Dépendances installées - Ignoré par Git)
│   ├── public/
│   │   ├── img/                # Images statiques
│   │   └── index.html          # Fichier HTML principal
│   ├── src/
│   │   ├── components/         # Composants UI (Navbar, Footer...)
│   │   ├── context/            # Gestion de l'authentification
│   │   ├── pages/              # Vues principales (Home, Admin, Login...)
│   │   ├── services/           # Appels API (Axios)
│   │   ├── App.css             # Styles globaux
│   │   ├── App.js              # Routeur React
│   │   └── index.js            # Point d'entrée React
│   ├── .gitignore
│   └── package.json
│
├── .gitignore                  # Fichier d'exclusion global
├── package.json                # Fichier racine
└── README.md                   # Documentation du projet