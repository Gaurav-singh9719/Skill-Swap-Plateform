import express from 'express';
import { giveFeedback, getFeedbackForUser } from '../controllers/feedbackController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protect, giveFeedback);
router.get('/:userId', getFeedbackForUser);

export default router;