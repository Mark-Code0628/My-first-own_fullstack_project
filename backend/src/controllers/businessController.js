import {
  findCalendarBySlug,
  findCalendarByVendorId,
  createCalendarForVendor,
} from '../models/BusinessProfile.js';
import { createServiceForCalendar, listServicesByCalendarId } from '../models/Service.js';
import { slugify } from '../utils/slugify.js';

function buildError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function ensureCalendarForVendor(vendorId, slugSource) {
  const existing = await findCalendarByVendorId(vendorId);
  if (existing) return existing;

  let slug = slugify(slugSource || `vendor-${vendorId}`);
  if (!slug) slug = `calendar-${Date.now()}`;

  const slugExists = await findCalendarBySlug(slug);
  if (slugExists) {
    slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
  }

  return createCalendarForVendor({ vendorId, slug });
}

export async function getMyProfile(req, res, next) {
  try {
    const calendar = await findCalendarByVendorId(req.user.id);
    res.json({
      vendorId: req.user.id,
      calendar,
    });
  } catch (error) {
    next(error);
  }
}

export async function getServicesBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const calendar = await findCalendarBySlug(slug);
    if (!calendar) {
      throw buildError('Nincs ilyen naptár.', 404);
    }

    const services = await listServicesByCalendarId(calendar.id);
    res.json({ calendar, services });
  } catch (error) {
    next(error);
  }
}

export async function listMyServices(req, res, next) {
  try {
    const calendar = await findCalendarByVendorId(req.user.id);
    if (!calendar) {
      return res.json([]);
    }

    const services = await listServicesByCalendarId(calendar.id);
    res.json(services);
  } catch (error) {
    next(error);
  }
}

export async function createService(req, res, next) {
  try {
    const { name, durationMin, price } = req.body;

    if (!name || !durationMin) {
      throw buildError('Szolgáltatás név és időtartam kötelező.', 400);
    }

    const duration = Number(durationMin);
    if (Number.isNaN(duration) || duration <= 0) {
      throw buildError('Érvénytelen időtartam.', 400);
    }

    if (price !== undefined && Number.isNaN(Number(price))) {
      throw buildError('Érvénytelen ár.', 400);
    }

    const calendar = await ensureCalendarForVendor(req.user.id, req.user.id);
    const service = await createServiceForCalendar({
      calendarId: calendar.id,
      name,
      durationMin: duration,
      price: price !== undefined ? Number(price) : null,
    });

    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
}

export async function createCalendar(req, res, next) {
  try {
    const { slug } = req.body;
    const calendar = await ensureCalendarForVendor(req.user.id, slug || req.user.id);
    res.status(201).json(calendar);
  } catch (error) {
    next(error);
  }
}
