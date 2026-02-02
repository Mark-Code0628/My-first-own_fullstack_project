import express from 'express';
import prisma from '../prismaClient.js';

const router = express.Router();

// GET all services
router.get('/services', async (req, res, next) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (err) {
    next(err);
  }
});

// POST create service (admin)
router.post('/services', async (req, res, next) => {
  try {
    const { name, durationMinutes, price } = req.body;
    const service = await prisma.service.create({
      data: { name, durationMinutes, price },
    });
    res.status(201).json(service);
  } catch (err) {
    next(err);
  }
});

export default router;
