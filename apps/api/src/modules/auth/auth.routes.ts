import { Router } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { validateRequest } from '../../shared/middleware/validation.middleware';
import { authenticate } from '../../shared/middleware/authentication.middleware';
import { registerSchema, loginSchema } from './auth.validation';

const router: Router = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post(
  '/register',
  validateRequest({ body: registerSchema }),
  authController.register
);
router.post(
  '/login',
  validateRequest({ body: loginSchema }),
  authController.login
);
router.get('/me', authenticate, authController.getCurrentUser);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

export { router as authRoutes };
