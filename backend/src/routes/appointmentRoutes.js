import express from 'express';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'appointment routes ok' });
});

export default router;