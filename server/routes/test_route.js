import express from 'express';
import { shouldBeLoggedIn, shouldbeAdmin } from '../controllers/test_controller.js';
import {verifyToken} from '../middleware/verifyToken.js'

const router = express.Router()

router.get("/should_be_logged_in", verifyToken,  shouldBeLoggedIn)
router.get("/should_be_admin", shouldbeAdmin)



export default router