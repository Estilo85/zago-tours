import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

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
    .get('/', (req: Request, res: Response) => {
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

    // 404 Handler
    .use((req: Request, res: Response) => {
      res.status(404).json({
        error: 'Route not found',
        path: req.path,
      });
    })

    // Error Handling Middleware
    .use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error('Error:', err.stack);
      res.status(500).json({
        error: 'Something went wrong!',
        message:
          process.env.NODE_ENV === 'development' ? err.message : undefined,
      });
    });

  return app;
};
