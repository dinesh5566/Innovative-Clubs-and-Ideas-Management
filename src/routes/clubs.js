    import express from 'express';
    import { db } from '../db.js';
    const router = express.Router();

    // Get all clubs
    router.get('/', (req, res) => {
    db.query('SELECT * FROM clubs', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
    });

    // Create a club
    router.post('/create', (req, res) => {
    const { name, description } = req.body;
    db.query('INSERT INTO clubs (name, description) VALUES (?, ?)', [name, description], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Club created', id: result.insertId });
    });
    });

    // Get a club by ID
    router.get('/:id', (req, res) => {
    db.query('SELECT * FROM clubs WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
    });

    export default router;
