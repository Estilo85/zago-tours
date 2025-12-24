import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { prisma } from '@zagotours/db';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to ZagoTour API',
    version: '1.0.0',
    status: 'active',
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

app.listen(port, () => {
  console.log(`⚡️ [server]: API server is running on port ${port}`);
  console.log(
    `🌍 [server]: Environment: ${process.env.NODE_ENV || 'development'}`
  );
});
