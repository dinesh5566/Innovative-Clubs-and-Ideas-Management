    import express from 'express';
    import { db } from '../db.js';
    const router = express.Router();

    // Get all events
    router.get('/', (req, res) => {
    db.query('SELECT * FROM events', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
    });

    // Create an event
    router.post('/create', (req, res) => {
    const { title, description, date, club_id } = req.body;
    db.query('INSERT INTO events (title, description, date, club_id) VALUES (?, ?, ?, ?)',
        [title, description, date, club_id],
        (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Event created', id: result.insertId });
        });
    });

    // Get an event by ID
    router.get('/:id', (req, res) => {
    db.query('SELECT * FROM events WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
    });

    export default router;
