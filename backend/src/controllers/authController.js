import bcrypt from 'bcrypt';
import { signToken } from '../config/jwt.js';
import {
  createVendorWithCalendar,
  findVendorByEmail,
  findVendorById,
} from '../models/User.js';
import { findCalendarBySlug } from '../models/BusinessProfile.js';
import { slugify } from '../utils/slugify.js';

const BCRYPT_ROUNDS = 10;

function buildError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function generateUniqueSlug(base) {
  let slug = slugify(base);
  if (!slug) slug = `calendar-${Date.now()}`;

  const existing = await findCalendarBySlug(slug);
  if (!existing) return slug;

  for (let i = 0; i < 5; i += 1) {
    const candidate = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
    // eslint-disable-next-line no-await-in-loop
    const exists = await findCalendarBySlug(candidate);
    if (!exists) return candidate;
  }

  return `${slug}-${Date.now()}`;
}

export async function register(req, res, next) {
  try {
    const { email, password, name, calendarSlug } = req.body;

    if (!email || !password || !name) {
      throw buildError('Email, password és név kötelező.', 400);
    }

    const existing = await findVendorByEmail(email);
    if (existing) {
      throw buildError('Ezzel az email címmel már van fiók.', 409);
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const slugSource = calendarSlug || name;
    const slug = await generateUniqueSlug(slugSource);

    const { vendor, calendar } = await createVendorWithCalendar({
      email,
      passwordHash,
      name,
      slug,
    });

    const token = signToken({ userId: vendor.id, role: 'vendor' });

    res.status(201).json({
      token,
      vendor: {
        id: vendor.id,
        email: vendor.email,
        name: vendor.name,
      },
      calendar,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw buildError('Email és jelszó kötelező.', 400);
    }

    const vendor = await findVendorByEmail(email);
    if (!vendor) {
      throw buildError('Hibás email vagy jelszó.', 401);
    }

    const isMatch = await bcrypt.compare(password, vendor.passwordHash);
    if (!isMatch) {
      throw buildError('Hibás email vagy jelszó.', 401);
    }

    const token = signToken({ userId: vendor.id, role: 'vendor' });

    res.json({
      token,
      vendor: {
        id: vendor.id,
        email: vendor.email,
        name: vendor.name,
      },
      calendar: vendor.calendar,
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res, next) {
  try {
    const vendor = await findVendorById(req.user.id);
    if (!vendor) {
      throw buildError('Felhasználó nem található.', 404);
    }

    res.json({
      id: vendor.id,
      email: vendor.email,
      name: vendor.name,
      calendar: vendor.calendar,
    });
  } catch (error) {
    next(error);
  }
}
