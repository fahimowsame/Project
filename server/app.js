import express from 'express';
import getRoute from './routes/post_route.js'
import authRoute from './routes/auth_route.js';
import testRoute from './routes/test_route.js'
import createRoute from './routes/post_route.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cors from 'cors'
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Cookie parser
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:8800', // Replace with your frontend URL
    credentials: true
}));

// Parse incoming requests with JSON payloads
app.use(express.json());

// Define routes
app.use("/api/data", getRoute);
app.use("/api/data", createRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);

// Serving static files from an Express server
app.use(express.static(path.join(__dirname, "/client/dist")));

// Catch-all route to serve index.html for any other route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,  '/client/dist//index.html'));
});

// Start the server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
