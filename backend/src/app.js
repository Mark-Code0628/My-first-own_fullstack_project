import express from 'express';
import cors from 'cors';
import morgan from 'morgan';


import authRoutes from './routes/authRoutes.js';
import businessRoutes from './routes/businessRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

import { errorHandler } from './middleware/errorHandler.js';

const app = express();

 /** 
  * Global middleware-ek
  */ 

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

/**
 * API routes
 */
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/appointments', appointmentRoutes);

/**
 * Global error handler
 */
app.use(errorHandler);

export default app;
