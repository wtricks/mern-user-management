import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config(); // load env vars

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Connect to DB
connectDB().then(() => {
    // Start server
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server started on port ${process.env.PORT || 5000}`);
    });
});