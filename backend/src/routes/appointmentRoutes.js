import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import {
  createBookingForCalendar,
  listMyBookings,
} from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'appointment routes ok' });
});

// Public booking endpoint
router.post('/:slug', createBookingForCalendar);

// Vendor bookings
router.get('/', requireAuth, listMyBookings);

export default router;
