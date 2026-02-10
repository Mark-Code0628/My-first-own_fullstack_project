import {
  createBooking,
  hasOverlappingBooking,
  listBookingsByCalendarId,
} from '../models/Appointment.js';
import { findCalendarBySlug, findCalendarByVendorId } from '../models/BusinessProfile.js';
import { findServiceById } from '../models/Service.js';

function buildError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

export async function listMyBookings(req, res, next) {
  try {
    const calendar = await findCalendarByVendorId(req.user.id);
    if (!calendar) {
      return res.json([]);
    }

    const bookings = await listBookingsByCalendarId(calendar.id);
    res.json(bookings);
  } catch (error) {
    next(error);
  }
}

export async function createBookingForCalendar(req, res, next) {
  try {
    const { slug } = req.params;
    const { serviceId, customerName, customerEmail, startTime } = req.body;

    if (!serviceId || !customerName || !customerEmail || !startTime) {
      throw buildError('Szolgáltatás, név, email és időpont kötelező.', 400);
    }

    const calendar = await findCalendarBySlug(slug);
    if (!calendar) {
      throw buildError('Nincs ilyen naptár.', 404);
    }

    const service = await findServiceById(serviceId);
    if (!service || service.calendarId !== calendar.id) {
      throw buildError('Szolgáltatás nem található.', 404);
    }

    const start = new Date(startTime);
    if (Number.isNaN(start.getTime())) {
      throw buildError('Érvénytelen időpont.', 400);
    }

    const end = new Date(start.getTime() + service.durationMin * 60000);

    const hasOverlap = await hasOverlappingBooking({
      calendarId: calendar.id,
      startTime: start,
      endTime: end,
    });

    if (hasOverlap) {
      throw buildError('Az időpont már foglalt.', 409);
    }

    const booking = await createBooking({
      calendarId: calendar.id,
      serviceId,
      customerName,
      customerEmail,
      startTime: start,
      endTime: end,
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
}
