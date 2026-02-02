import express from 'express';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'auth routes ok' });
});

export default router;