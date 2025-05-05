    import express from 'express';
    import { db } from '../db.js';
    const router = express.Router();

    // Get all ideas
    router.get('/', (req, res) => {
    db.query('SELECT * FROM ideas', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
    });

    // Create an idea
    router.post('/create', (req, res) => {
    const { title, description, user_id, club_id } = req.body;
    db.query('INSERT INTO ideas (title, description, user_id, club_id) VALUES (?, ?, ?, ?)',
        [title, description, user_id, club_id],
        (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Idea submitted', id: result.insertId });
        });
    });

    // Get an idea by ID
    router.get('/:id', (req, res) => {
    db.query('SELECT * FROM ideas WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
    });

    export default router;
