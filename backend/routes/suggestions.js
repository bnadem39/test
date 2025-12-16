/**
 * Routes API pour la gestion des suggestions
 * 
 * Endpoints disponibles:
 * - GET /suggestions - Récupère toutes les suggestions
 * - GET /suggestions/:id - Récupère une suggestion par ID
 * - POST /suggestions - Crée une nouvelle suggestion
 * - PUT /suggestions/:id - Met à jour une suggestion
 * - DELETE /suggestions/:id - Supprime une suggestion
 * - POST /suggestions/:id/like - Incrémente le nombre de likes
 * - GET /suggestions/category/:category - Récupère par catégorie
 * - GET /suggestions/status/:status - Récupère par statut
 */

const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// =========================================================
// GET /suggestions
// Récupère toutes les suggestions
// =========================================================
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM suggestions ORDER BY date DESC');
        res.json(rows);
    } catch (error) {
        console.error('Erreur GET /suggestions:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

// =========================================================
// GET /suggestions/category/:category
// Récupère les suggestions par catégorie
// (Doit être défini AVANT /:id pour éviter les conflits)
// =========================================================
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const [rows] = await pool.query(
            'SELECT * FROM suggestions WHERE category = ? ORDER BY date DESC',
            [category]
        );
        res.json({
            success: true,
            count: rows.length,
            suggestions: rows
        });
    } catch (error) {
        console.error('Erreur GET /suggestions/category:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

// =========================================================
// GET /suggestions/status/:status
// Récupère les suggestions par statut
// (Doit être défini AVANT /:id pour éviter les conflits)
// =========================================================
router.get('/status/:status', async (req, res) => {
    try {
        const { status } = req.params;
        const [rows] = await pool.query(
            'SELECT * FROM suggestions WHERE status = ? ORDER BY date DESC',
            [status]
        );
        res.json({
            success: true,
            count: rows.length,
            suggestions: rows
        });
    } catch (error) {
        console.error('Erreur GET /suggestions/status:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

// =========================================================
// GET /suggestions/:id
// Récupère une suggestion par son ID
// =========================================================
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM suggestions WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Suggestion non trouvée'
            });
        }

        res.json({
            success: true,
            suggestion: rows[0]
        });
    } catch (error) {
        console.error('Erreur GET /suggestions/:id:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

// =========================================================
// POST /suggestions
// Crée une nouvelle suggestion
// =========================================================
router.post('/', async (req, res) => {
    try {
        const { title, description, category, status } = req.body;

        // Validation: le titre est requis
        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Le titre est requis'
            });
        }

        const [result] = await pool.query(
            `INSERT INTO suggestions (title, description, category, status, date, nbLikes) 
             VALUES (?, ?, ?, ?, NOW(), 0)`,
            [
                title.trim(),
                description || null,
                category || 'autre',
                status || 'en attente'
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Suggestion créée avec succès',
            id: result.insertId
        });
    } catch (error) {
        console.error('Erreur POST /suggestions:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

// =========================================================
// PUT /suggestions/:id
// Met à jour une suggestion existante
// =========================================================
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, status, nbLikes } = req.body;

        // Validation: le titre est requis
        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Le titre est requis'
            });
        }

        // Vérifier si la suggestion existe
        const [existing] = await pool.query('SELECT * FROM suggestions WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Suggestion non trouvée'
            });
        }

        await pool.query(
            `UPDATE suggestions 
             SET title = ?, description = ?, category = ?, status = ?, nbLikes = ?
             WHERE id = ?`,
            [
                title.trim(),
                description !== undefined ? description : existing[0].description,
                category !== undefined ? category : existing[0].category,
                status !== undefined ? status : existing[0].status,
                nbLikes !== undefined ? nbLikes : existing[0].nbLikes,
                id
            ]
        );

        res.json({
            success: true,
            message: 'Suggestion mise à jour avec succès'
        });
    } catch (error) {
        console.error('Erreur PUT /suggestions/:id:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

// =========================================================
// DELETE /suggestions/:id
// Supprime une suggestion
// =========================================================
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifier si la suggestion existe
        const [existing] = await pool.query('SELECT * FROM suggestions WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Suggestion non trouvée'
            });
        }

        await pool.query('DELETE FROM suggestions WHERE id = ?', [id]);

        res.json({
            success: true,
            message: 'Suggestion supprimée avec succès'
        });
    } catch (error) {
        console.error('Erreur DELETE /suggestions/:id:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

// =========================================================
// POST /suggestions/:id/like
// Incrémente le nombre de likes d'une suggestion
// =========================================================
router.post('/:id/like', async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifier si la suggestion existe
        const [existing] = await pool.query('SELECT * FROM suggestions WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Suggestion non trouvée'
            });
        }

        await pool.query(
            'UPDATE suggestions SET nbLikes = nbLikes + 1 WHERE id = ?',
            [id]
        );

        res.json({
            success: true,
            message: 'Like ajouté avec succès'
        });
    } catch (error) {
        console.error('Erreur POST /suggestions/:id/like:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur serveur interne'
        });
    }
});

module.exports = router;
