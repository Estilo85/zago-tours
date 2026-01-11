import { Response } from 'express';
import { AuthService } from './auth.service';
import { ResponseUtil } from '../../shared/utils/response';
import {
  RegisterDTO,
  LoginDTO,
  ResetPasswordDTO,
  ForgotPasswordDTO,
} from '@zagotours/types';
import { asyncHandler } from 'src/shared/middleware/async-handler.middleware';
import { ReqBody, TypedRequest } from 'src/shared/types/express.types';

export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Register a new user and their specific profile
   */
  register = asyncHandler(async (req: ReqBody<RegisterDTO>, res: Response) => {
    const result = await this.authService.register(req.body);
    return ResponseUtil.success(res, result, 'Registration successful', 201);
  });

  /**
   * Authenticate user and return user data (safe)
   */
  login = async (req: ReqBody<LoginDTO>, res: Response) => {
    const result = await this.authService.login(req.body);
    return ResponseUtil.success(res, result, 'Login successful');
  };

  /**
   * Fetch current authenticated user profile
   */
  getCurrentUser = asyncHandler(async (req: TypedRequest, res: Response) => {
    const user = await this.authService.getCurrentUser(req.userId!);
    return ResponseUtil.success(res, user);
  });

  /**
   * Initiate password reset flow (sends email)
   */
  forgotPassword = asyncHandler(
    async (req: ReqBody<ForgotPasswordDTO>, res: Response) => {
      const result = await this.authService.forgotPassword(req.body.email);
      return ResponseUtil.success(res, null, result.message);
    }
  );

  /**
   * Reset password using a valid token
   */
  resetPassword = async (req: ReqBody<ResetPasswordDTO>, res: Response) => {
    const result = await this.authService.resetPassword(req.body);
    return ResponseUtil.success(res, null, result.message);
  };
}
