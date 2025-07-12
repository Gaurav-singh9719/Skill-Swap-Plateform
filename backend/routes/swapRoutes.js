import express from 'express';
import { createSwap, getMySwaps, updateSwapStatus, deleteSwap } from '../controllers/swapController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protect, createSwap);
router.get('/', protect, getMySwaps);
router.put('/:id', protect, updateSwapStatus);
router.delete('/:id', protect, deleteSwap);

export default router;