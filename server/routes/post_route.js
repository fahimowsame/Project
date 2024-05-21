import express from 'express';
import { getPost, getPosts, getPostsByCountry, insertFloodData } from '../controllers/post_controller.js';

const router = express.Router();

router.get("/allpost", getPosts);    
router.post("/createpost", insertFloodData);
router.get("/:id", getPost); // This route should come before the route for country
router.get("/country/:country", getPostsByCountry); // Use a fixed segment like "/country" to avoid conflict

export default router;
