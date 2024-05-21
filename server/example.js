import express from 'express';
import postRoute from './routes/post_route.js'; 
import authRoute from './routes/auth_route.js'; 
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Cookie parser
app.use(cookieParser());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Define routes
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

// Serving static files from an Express server
app.use(express.static("public"));

// Catch-all route to serve index.html for any other route
app.use("/*", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
