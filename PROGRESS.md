# 💧 Journal de Bord - Projet E-commerce "Air Up Pods"

## 📍 Statut Actuel
**Date** : Juin 2026
**Étape** : Initialisation du projet terminée. Le serveur Backend (Node.js) est configuré, fonctionnel et connecté à la base de données (MongoDB Atlas). Le Frontend (React) est initialisé avec Tailwind CSS.

---

## 📂 Structure du Projet

Le projet est divisé en deux dossiers principaux à la racine :

### 1. `/backend` (API Node.js & Express)
- `server.js` : Fichier principal qui lance notre API sur le port 5000.
- `package.json` : Contient nos dépendances (`express`, `mongoose`, `cors`, etc.) et le script `"dev": "nodemon server.js"`.
- `/config` : Contient `db.js` pour la connexion à MongoDB.
- `/models` : (Vide pour le moment) Contiendra les schémas de base de données (Produits, Users, etc.).
- `/routes` : (Vide pour le moment) Contiendra les URLs de notre API.
- `/controllers` : (Vide pour le moment) Contiendra la logique métier de nos routes.
- `/middleware` : (Vide pour le moment) Contiendra les sécurités (ex: vérification des tokens).

### 2. `/frontend` (React.js & Vite)
- Projet généré avec Vite (variante JavaScript classique).
- **Tailwind CSS (Version 3)** installé et configuré dans `tailwind.config.js` avec nos couleurs personnalisées (cyan `primary` et orange `secondary`).
- Fichier `src/index.css` nettoyé et configuré avec les directives `@tailwind`.
- Dépendances installées : `react-router-dom` (navigation), `axios` (requêtes), `lucide-react` (icônes).

---

## 🔐 Variables d'Environnement et Secrets

Le fichier **`.env`** se trouve à la racine du dossier `/backend` (⚠️ *Ce fichier ne doit jamais être envoyé sur GitHub*).

Voici sa structure actuelle :
```env
PORT=5000
# Lien MongoDB Atlas. Le mot de passe ne contient pas de caractères spéciaux (ex: pas de #) pour éviter les bugs d'URL.
MONGO_URI=mongodb+srv://<Ton_Pseudo>:<Ton_Mot_De_Passe>@cluster0.xxxxx.mongodb.net/airup?retryWrites=true&w=majority
# Clé secrète pour signer les "tampons" de connexion des utilisateurs (JSON Web Tokens)
JWT_SECRET=MonSuperSecretPourLesMotsDePasse2026