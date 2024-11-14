import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config(); // load env vars

import connectDB from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import { rootDirectory } from './src/config/constants.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(rootDirectory, 'uploads')));

// Routes
app.use('/api/users', userRoutes);

// Connect to DB
connectDB().then(() => {
    // Start server
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server started on port ${process.env.PORT || 5000}`);
    });
});