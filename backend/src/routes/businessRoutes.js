import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import {
  createCalendar,
  createService,
  getMyProfile,
  getServicesBySlug,
  listMyServices,
} from '../controllers/businessController.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'business routes ok' });
});

// Public: services by calendar slug
router.get('/calendar/:slug/services', getServicesBySlug);

// Vendor: profile + calendar
router.get('/me', requireAuth, getMyProfile);
router.post('/calendar', requireAuth, createCalendar);

// Vendor: services
router.get('/services', requireAuth, listMyServices);
router.post('/services', requireAuth, createService);

export default router;
