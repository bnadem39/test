# 📡 API REST - Suggestions et Utilisateurs

API REST complète pour la gestion des suggestions et utilisateurs, développée avec Node.js, Express.js et MySQL.

## 🛠️ Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL2** - Driver MySQL avec support des promesses
- **CORS** - Middleware pour gérer les requêtes cross-origin
- **dotenv** - Gestion des variables d'environnement

## 📋 Prérequis

- Node.js (v16 ou supérieur)
- MySQL (v5.7 ou supérieur)
- npm ou yarn

## 🚀 Installation

### 1. Installer les dépendances

```bash
cd backend
npm install
```

### 2. Configurer la base de données

1. Démarrez MySQL sur votre machine
2. Créez la base de données et les tables en exécutant le script SQL:

```bash
mysql -u root -p < database.sql
```

Ou connectez-vous à MySQL et exécutez:

```sql
source /chemin/vers/backend/database.sql
```

### 3. Configurer les variables d'environnement

Modifiez le fichier `.env` avec vos informations de connexion MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=suggestions_db
DB_PORT=3306
PORT=3000
```

### 4. Démarrer le serveur

**Mode développement** (avec rechargement automatique):
```bash
npm run dev
```

**Mode production**:
```bash
npm start
```

Le serveur démarrera sur `http://localhost:3000`

## 📡 Endpoints API

### Suggestions

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/suggestions` | Récupère toutes les suggestions |
| GET | `/suggestions/:id` | Récupère une suggestion par ID |
| POST | `/suggestions` | Crée une nouvelle suggestion |
| PUT | `/suggestions/:id` | Met à jour une suggestion |
| DELETE | `/suggestions/:id` | Supprime une suggestion |
| POST | `/suggestions/:id/like` | Ajoute un like |
| GET | `/suggestions/category/:category` | Filtre par catégorie |
| GET | `/suggestions/status/:status` | Filtre par statut |

### Utilisateurs

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/users` | Récupère tous les utilisateurs |
| GET | `/users/:id` | Récupère un utilisateur par ID |
| POST | `/users` | Crée un nouvel utilisateur |
| PUT | `/users/:id` | Met à jour un utilisateur |
| DELETE | `/users/:id` | Supprime un utilisateur |
| GET | `/users/role/:role` | Filtre par rôle |
| GET | `/users/status/:status` | Filtre par statut |

## 💡 Exemples de requêtes

### Avec cURL

**Créer une suggestion:**
```bash
curl -X POST http://localhost:3000/suggestions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nouvelle fonctionnalité",
    "description": "Description de la suggestion",
    "category": "feature"
  }'
```

**Récupérer toutes les suggestions:**
```bash
curl http://localhost:3000/suggestions
```

**Créer un utilisateur:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }'
```

**Mettre à jour un utilisateur:**
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "admin",
    "status": "active"
  }'
```

### Avec JavaScript (Fetch API)

```javascript
// Créer une suggestion
const response = await fetch('http://localhost:3000/suggestions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Nouvelle fonctionnalité',
    description: 'Description de la suggestion',
    category: 'feature'
  })
});

const data = await response.json();
console.log(data);
```

## ⚠️ Gestion des erreurs

### Codes d'erreur

| Code | Description | Exemple |
|------|-------------|---------|
| 400 | Bad Request | `{"success": false, "error": "Le titre est requis"}` |
| 404 | Not Found | `{"success": false, "error": "Suggestion non trouvée"}` |
| 500 | Internal Server Error | `{"success": false, "error": "Erreur serveur interne"}` |

## 📁 Structure du projet

```
backend/
├── config/
│   └── database.js      # Configuration MySQL
├── routes/
│   ├── suggestions.js   # Routes suggestions
│   └── users.js         # Routes utilisateurs
├── .env                 # Variables d'environnement
├── .env.example         # Exemple de configuration
├── database.sql         # Script SQL de création
├── package.json         # Dépendances
├── server.js            # Point d'entrée
└── README.md            # Documentation
```

## 📝 Notes importantes

- Toutes les dates sont retournées au format ISO 8601
- Les emails doivent être uniques dans la table `users`
- Le champ `title` est requis pour les suggestions
- Les champs `name` et `email` sont requis pour les utilisateurs
- Les routes sont sensibles à la casse
