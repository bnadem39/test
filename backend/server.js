/**
 * Serveur API REST - Suggestions et Utilisateurs
 * 
 * Technologies: Node.js, Express.js, MySQL2, CORS, dotenv
 * Port par défaut: 3000
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/database');
const suggestionsRoutes = require('./routes/suggestions');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// =========================================================
// Middlewares
// =========================================================

// Activer CORS pour permettre les requêtes cross-origin
app.use(cors());

// Parser les requêtes JSON
app.use(express.json());

// Parser les requêtes URL-encoded
app.use(express.urlencoded({ extended: true }));

// Middleware de logging des requêtes
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// =========================================================
// Routes
// =========================================================

// Route de base - Health check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API Suggestions et Utilisateurs',
        version: '1.0.0',
        endpoints: {
            suggestions: '/suggestions',
            users: '/users'
        }
    });
});

// Routes pour les suggestions
app.use('/suggestions', suggestionsRoutes);

// Routes pour les utilisateurs
app.use('/users', usersRoutes);

// =========================================================
// Gestion des erreurs
// =========================================================

// Route 404 - Route non trouvée
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route non trouvée'
    });
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
    console.error('Erreur serveur:', err);
    res.status(500).json({
        success: false,
        error: 'Erreur serveur interne'
    });
});

// =========================================================
// Démarrage du serveur
// =========================================================

async function startServer() {
    // Tester la connexion à la base de données
    const dbConnected = await testConnection();

    if (!dbConnected) {
        console.log('⚠️  Attention: Le serveur démarre sans connexion à la base de données');
        console.log('📋 Assurez-vous que:');
        console.log('   1. MySQL est installé et en cours d\'exécution');
        console.log('   2. La base de données "suggestions_db" existe');
        console.log('   3. Les identifiants dans .env sont corrects');
        console.log('   4. Exécutez le script database.sql pour créer les tables');
    }

    app.listen(PORT, () => {
        console.log('═══════════════════════════════════════════════════');
        console.log(`🚀 Serveur API démarré sur http://localhost:${PORT}`);
        console.log('═══════════════════════════════════════════════════');
        console.log('📋 Endpoints disponibles:');
        console.log(`   GET    http://localhost:${PORT}/`);
        console.log(`   GET    http://localhost:${PORT}/suggestions`);
        console.log(`   GET    http://localhost:${PORT}/suggestions/:id`);
        console.log(`   POST   http://localhost:${PORT}/suggestions`);
        console.log(`   PUT    http://localhost:${PORT}/suggestions/:id`);
        console.log(`   DELETE http://localhost:${PORT}/suggestions/:id`);
        console.log(`   POST   http://localhost:${PORT}/suggestions/:id/like`);
        console.log(`   GET    http://localhost:${PORT}/suggestions/category/:category`);
        console.log(`   GET    http://localhost:${PORT}/suggestions/status/:status`);
        console.log(`   GET    http://localhost:${PORT}/users`);
        console.log(`   GET    http://localhost:${PORT}/users/:id`);
        console.log(`   POST   http://localhost:${PORT}/users`);
        console.log(`   PUT    http://localhost:${PORT}/users/:id`);
        console.log(`   DELETE http://localhost:${PORT}/users/:id`);
        console.log(`   GET    http://localhost:${PORT}/users/role/:role`);
        console.log(`   GET    http://localhost:${PORT}/users/status/:status`);
        console.log('═══════════════════════════════════════════════════');
    });
}

startServer();
