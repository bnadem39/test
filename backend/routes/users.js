/**
 * Routes API pour la gestion des utilisateurs
 * 
 * Endpoints disponibles:
 * - GET /users - Récupère tous les utilisateurs
 * - GET /users/:id - Récupère un utilisateur par ID
 * - POST /users - Crée un nouvel utilisateur
 * - PUT /users/:id - Met à jour un utilisateur
 * - DELETE /users/:id - Supprime un utilisateur
 * - GET /users/role/:role - Récupère par rôle
 * - GET /users/status/:status - Récupère par statut
 */

const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// =========================================================
// GET /users
// Récupère tous les utilisateurs
// =========================================================
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Erreur GET /users:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

// =========================================================
// GET /users/role/:role
// Récupère les utilisateurs par rôle
// (Doit être défini AVANT /:id pour éviter les conflits)
// =========================================================
router.get('/role/:role', async (req, res) => {
    try {
        const { role } = req.params;
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE role = ? ORDER BY created_at DESC',
            [role]
        );
        res.json({
            success: true,
            count: rows.length,
            users: rows
        });
    } catch (error) {
        console.error('Erreur GET /users/role:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

// =========================================================
// GET /users/status/:status
// Récupère les utilisateurs par statut
// (Doit être défini AVANT /:id pour éviter les conflits)
// =========================================================
router.get('/status/:status', async (req, res) => {
    try {
        const { status } = req.params;
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE status = ? ORDER BY created_at DESC',
            [status]
        );
        res.json({
            success: true,
            count: rows.length,
            users: rows
        });
    } catch (error) {
        console.error('Erreur GET /users/status:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

// =========================================================
// GET /users/:id
// Récupère un utilisateur par son ID
// =========================================================
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Utilisateur non trouvé'
            });
        }

        res.json({
            success: true,
            user: rows[0]
        });
    } catch (error) {
        console.error('Erreur GET /users/:id:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

// =========================================================
// POST /users
// Crée un nouvel utilisateur
// =========================================================
router.post('/', async (req, res) => {
    try {
        const { name, email, role, status } = req.body;

        // Validation: le nom est requis
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Le nom est requis'
            });
        }

        // Validation: l'email est requis
        if (!email || email.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'L\'email est requis'
            });
        }

        // Vérifier si l'email est déjà utilisé
        const [existingEmail] = await pool.query('SELECT * FROM users WHERE email = ?', [email.trim()]);
        if (existingEmail.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Cet email est déjà utilisé'
            });
        }

        const [result] = await pool.query(
            `INSERT INTO users (name, email, role, status) 
             VALUES (?, ?, ?, ?)`,
            [
                name.trim(),
                email.trim(),
                role || 'user',
                status || 'active'
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Utilisateur créé avec succès',
            id: result.insertId
        });
    } catch (error) {
        console.error('Erreur POST /users:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

// =========================================================
// PUT /users/:id
// Met à jour un utilisateur existant
// =========================================================
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role, status } = req.body;

        // Validation: le nom est requis
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Le nom est requis'
            });
        }

        // Validation: l'email est requis
        if (!email || email.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'L\'email est requis'
            });
        }

        // Vérifier si l'utilisateur existe
        const [existing] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Utilisateur non trouvé'
            });
        }

        // Vérifier si l'email est déjà utilisé par un autre utilisateur
        const [existingEmail] = await pool.query(
            'SELECT * FROM users WHERE email = ? AND id != ?',
            [email.trim(), id]
        );
        if (existingEmail.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Cet email est déjà utilisé'
            });
        }

        await pool.query(
            `UPDATE users 
             SET name = ?, email = ?, role = ?, status = ?
             WHERE id = ?`,
            [
                name.trim(),
                email.trim(),
                role !== undefined ? role : existing[0].role,
                status !== undefined ? status : existing[0].status,
                id
            ]
        );

        res.json({
            success: true,
            message: 'Utilisateur mis à jour avec succès'
        });
    } catch (error) {
        console.error('Erreur PUT /users/:id:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

// =========================================================
// DELETE /users/:id
// Supprime un utilisateur
// =========================================================
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifier si l'utilisateur existe
        const [existing] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Utilisateur non trouvé'
            });
        }

        await pool.query('DELETE FROM users WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Utilisateur supprimé avec succès'
        });
    } catch (error) {
        console.error('Erreur DELETE /users/:id:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

module.exports = router;
