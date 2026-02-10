import express from 'express';
import { login, me, register } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'auth routes ok' });
});

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, me);

export default router;
