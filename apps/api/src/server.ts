import express, { Express, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes';
import { errorHandler } from './shared/middleware/error-handler.middleware';

export const createServer = (): Express => {
  const app = express();
  app.set('trust proxy', 1);

  const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again in 15 minutes.' },
  });

  const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again in 15 minutes.' },
  });

  const strictLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again in 15 minutes.' },
  });

  // Middleware Configuration
  app
    .disable('x-powered-by')
    .use(helmet())
    .use(
      cors({
        origin: [
          process.env.FRONTEND_URL || 'http://localhost:3000',
          'https://staging.zagotours.com',
          'https://zagotours.com',
        ],
        credentials: true,
        maxAge: 86400,
      }),
    )
    .use(express.json({ limit: '1mb' }))
    .use(express.urlencoded({ extended: true, limit: '1mb' }))

    //=======RateLimit=======
    // Strict routes
    .use('/api/auth', strictLimiter)
    .use('/api/newsletter', strictLimiter)
    .use('/api/inquiries', strictLimiter)
    .use('/api/callback-requests', strictLimiter)

    // General routes
    .use('/api/users', generalLimiter)
    .use('/api/reviews', generalLimiter)
    .use('/api/trip-requests', generalLimiter)
    .use('/api/trip-planning-calls', generalLimiter)
    .use('/api/contracts', generalLimiter)
    .use('/api/platform-settings', generalLimiter)
    .use('/api/destination-countries', generalLimiter)
    .use('/api/dashboard', generalLimiter)

    .use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
    // Routes
    .get('/api', (req: Request, res: Response) => {
      res.json({
        message: 'Welcome to ZagoTour API',
        version: '1.0.0',
        status: 'active',
      });
    })
    .get('/api/health', (req: Request, res: Response) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    })
    .use(router)

    // Error Handler
    .use(errorHandler);

  return app;
};
