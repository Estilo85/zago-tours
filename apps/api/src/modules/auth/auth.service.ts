import { generateReferralCode } from 'src/shared/utils/nanoid';
import { BcryptUtil } from '../../shared/utils/password';
import { JwtUtil } from '../../shared/utils/jwt';
import { EmailService } from '../../shared/services/email.service';
import { AuthRepository } from './auth.repository';
import {
  RegisterDTO,
  LoginDTO,
  UserResponse,
  ResetPasswordDTO,
  ROLE_PREFIXES,
} from '@zagotours/types';

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  // ===== REGISTER ======
  async register(data: RegisterDTO): Promise<UserResponse> {
    const existingUser = await this.authRepository.findByEmail(data.email);
    if (existingUser) throw new Error('User already exists');

    const randomPart = generateReferralCode().toUpperCase();
    let prefix = ROLE_PREFIXES[data.role];
    const referralCode = `${prefix}-${randomPart}`;

    let referredById: string | undefined;
    if (data.referralCode) {
      const normalizedInput = data.referralCode.trim().toUpperCase();
      const referrer =
        await this.authRepository.findByReferralCode(normalizedInput);
      referredById = referrer?.id;
    }

    const hashedPassword = await BcryptUtil.hash(data.password);

    const userData = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      country: data.country,
      role: data.role,
      referralCode,
      referredById,
    };

    const profileData: any = {
      howDidYouHear: data.howDidYouHear,
    };

    if (data.role === 'INDEPENDENT_AGENT') {
      profileData.certifications = data.certifications;
    } else if (data.role === 'COOPERATE_AGENT') {
      profileData.companyName = data.companyName;
      profileData.travelBusinessDescription = data.travelBusinessDescription;
    } else if (data.role === 'AFFILIATE') {
      profileData.communityBrand = data.communityBrand;
      profileData.socialLinks = data.socialLinks || [];
    }

    const user = await this.authRepository.registerUserWithProfile(
      userData,
      data.role,
      profileData
    );

    return this.mapUserResponse(user);
  }

  // ===== LOGIN ======
  async login(data: LoginDTO): Promise<UserResponse> {
    const user = await this.authRepository.findByEmail(data.email);

    if (!user) throw new Error('Invalid credentials');

    const isValid = await BcryptUtil.compare(data.password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    return this.mapUserResponse(user);
  }

  // ===== CURRENT USER ======
  async getCurrentUser(userId: string): Promise<UserResponse> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new Error('User not found');
    return this.mapUserResponse(user);
  }

  // ===== FORGOT PASSWORD ======
  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      return {
        message: 'If that email exists, a reset link has been sent',
      };
    }

    // Generate reset token (JWT)
    const resetToken = JwtUtil.generateResetToken(user.id);

    // Calculate expiry
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Save token to database
    await this.authRepository.saveResetToken(user.id, resetToken, expiresAt);

    // Send reset email
    await EmailService.sendPasswordResetEmail(user.email, resetToken);

    return {
      message: 'If that email exists, a reset link has been sent',
    };
  }

  // ===== RESET PASSWORD ======
  async resetPassword(data: ResetPasswordDTO): Promise<{ message: string }> {
    // Verify JWT token
    const decoded = JwtUtil.verifyResetToken(data.token);
    if (!decoded) {
      throw new Error('Invalid or expired reset token');
    }

    // Find user by token (double check in database)
    const user = await this.authRepository.findByResetToken(data.token);
    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    // Hash new password
    const hashedPassword = await BcryptUtil.hash(data.newPassword);

    // Update password
    await this.authRepository.update(user.id, {
      password: hashedPassword,
    });

    // Clear reset token
    await this.authRepository.clearResetToken(user.id);

    return { message: 'Password reset successful' };
  }

  // ===== HELPER ======
  private mapUserResponse(user: any): UserResponse {
    const { password, resetPasswordToken, resetPasswordExpires, ...safeUser } =
      user;
    return safeUser;
  }
}
