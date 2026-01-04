import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { ResponseUtil } from '../../shared/utils/response';
import { RegisterDTO, LoginDTO } from '@zagotours/types';

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: RegisterDTO = req.body;
      const result = await this.authService.register(data);
      return ResponseUtil.success(res, result, 'Registration successful', 201);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: LoginDTO = req.body;
      const result = await this.authService.login(data);
      return ResponseUtil.success(res, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  };

  getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId!;
      const user = await this.authService.getCurrentUser(userId);
      return ResponseUtil.success(res, user);
    } catch (error) {
      next(error);
    }
  };

  // ===== FORGOT PASSWORD =====
  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const result = await this.authService.forgotPassword(email);
      return ResponseUtil.success(res, null, result.message);
    } catch (error) {
      next(error);
    }
  };

  // ===== RESET PASSWORD =====
  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, newPassword } = req.body;
      const result = await this.authService.resetPassword({
        token,
        newPassword,
      });
      return ResponseUtil.success(res, null, result.message);
    } catch (error) {
      next(error);
    }
  };
}
