/* eslint-disable no-undef */
import express from 'express';
import dotenv from 'dotenv';
// eslint-disable-next-line no-unused-vars
import { db } from './db.js';

import userRoutes from './routes/users.js';
import clubRoutes from './routes/clubs.js';
import eventRoutes from './routes/events.js';
import ideaRoutes from './routes/ideas.js';

dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/ideas', ideaRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
