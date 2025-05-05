import express from 'express';
import { db } from '../db.js';
const router = express.Router();

router.get('/', (req, res) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json(results);
    });
});

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'User registered', id: result.insertId });
    });
});

export default router;
