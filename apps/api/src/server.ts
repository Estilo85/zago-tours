import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes';
import { errorHandler } from './shared/middleware/error-handler.middleware';

export const createServer = (): Express => {
  const app = express();

  // Middleware Configuration
  app
    .disable('x-powered-by')
    .use(helmet())
    .use(
      cors({
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        credentials: true,
      })
    )
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(morgan('dev'))

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
    // .use(maintenanceMiddleware)
    .use(router)

    // Error Handler
    .use(errorHandler);

  return app;
};
