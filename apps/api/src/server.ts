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

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  });

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
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
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.json({ limit: '1mb' }))
    .use(express.urlencoded({ extended: true, limit: '1mb' }))

    //=======RateLimit=======
    .use('/api', apiLimiter)
    .use('/api/auth', authLimiter)
    .use('/api/newsletter', authLimiter)
    .use('/api/inquiries', authLimiter)
    .use('/api/callback-requests', authLimiter)

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
