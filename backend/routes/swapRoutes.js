import express from 'express';
import multer from 'multer';
import {
  createSwap,
  getMySwaps,
  updateSwapStatus,
  deleteSwap
} from '../controllers/swapController.js';
import protect from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';

const router = express.Router();
const upload = multer(); // no storage needed for no files

// 👇 Add .none() to parse form-data fields
router.post('/', protect, upload.none(), createSwap);
router.get('/', protect, getMySwaps);
router.put('/:id', protect, isAdmin, updateSwapStatus);
router.delete('/:id', protect, isAdmin, deleteSwap);

export default router;
