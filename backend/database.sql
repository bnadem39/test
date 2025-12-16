-- =========================================================
-- Script de création de la base de données pour le TP
-- Technologies: MySQL
-- =========================================================

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS suggestions_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE suggestions_db;

-- =========================================================
-- Table: suggestions
-- Description: Stocke les suggestions des utilisateurs
-- =========================================================
CREATE TABLE IF NOT EXISTS suggestions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'autre',
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'en attente',
    nbLikes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- Table: users
-- Description: Stocke les informations des utilisateurs
-- =========================================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) DEFAULT 'user',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- Données de test pour les suggestions
-- =========================================================
INSERT INTO suggestions (title, description, category, status, nbLikes) VALUES
('Amélioration du design', 'Il serait bien d\'améliorer le design de la page d\'accueil', 'design', 'en attente', 5),
('Nouvelle fonctionnalité de recherche', 'Ajouter une barre de recherche avancée avec filtres', 'feature', 'approuvée', 12),
('Correction bug de connexion', 'Le bouton de connexion ne fonctionne pas sur mobile', 'bugfix', 'en cours', 8),
('Mode sombre', 'Implémenter un thème sombre pour l\'application', 'feature', 'en attente', 25),
('Optimisation des performances', 'L\'application est lente sur certaines pages', 'performance', 'rejetée', 3);

-- =========================================================
-- Données de test pour les utilisateurs
-- =========================================================
INSERT INTO users (name, email, role, status) VALUES
('John Doe', 'john@example.com', 'admin', 'active'),
('Jane Smith', 'jane@example.com', 'user', 'active'),
('Bob Wilson', 'bob@example.com', 'moderator', 'active'),
('Alice Brown', 'alice@example.com', 'user', 'inactive'),
('Charlie Davis', 'charlie@example.com', 'user', 'active');

-- =========================================================
-- Index pour améliorer les performances des requêtes
-- =========================================================
CREATE INDEX idx_suggestions_category ON suggestions(category);
CREATE INDEX idx_suggestions_status ON suggestions(status);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_email ON users(email);
