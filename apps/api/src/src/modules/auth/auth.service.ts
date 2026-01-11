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
import { Role } from '@zagotours/database';

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  // validation method
  private validateRoleSpecificFields(data: RegisterDTO): void {
    if (data.role === Role.INDEPENDENT_AGENT) {
      if (!data.certifications || data.certifications.length === 0) {
        throw new Error('Certifications are required for Independent Agents');
      }
    }

    if (data.role === Role.COOPERATE_AGENT) {
      if (!data.companyName) {
        throw new Error('Company name is required for Corporate Agents');
      }
      if (!data.travelBusinessDescription) {
        throw new Error(
          'Travel business description is required for Corporate Agents'
        );
      }
    }

    if (data.role === Role.AFFILIATE) {
      if (!data.communityBrand) {
        throw new Error('Community brand is required for Affiliates');
      }
    }
  }

  private extractProfileData(data: RegisterDTO) {
    if (data.role === Role.INDEPENDENT_AGENT) {
      return {
        certifications: data.certifications || [],
      };
    }

    if (data.role === Role.COOPERATE_AGENT) {
      return {
        companyName: data.companyName!,
        travelBusinessDescription: data.travelBusinessDescription!,
      };
    }

    if (data.role === Role.AFFILIATE) {
      return {
        communityBrand: data.communityBrand!,
        socialLinks: data.socialLinks || [],
      };
    }

    return {};
  }

  async register(data: RegisterDTO): Promise<UserResponse> {
    const existingUser = await this.authRepository.findByEmail(data.email);
    if (existingUser) throw new Error('User already exists');

    this.validateRoleSpecificFields(data);
    const hashedPassword = await BcryptUtil.hash(data.password);

    const prefix = ROLE_PREFIXES[data.role] || 'USR';
    const referralCode = `${prefix}-${generateReferralCode().toUpperCase()}`;

    let referredById: string | undefined;
    if (data.referralCode) {
      const referrer = await this.authRepository.findByReferralCode(
        data.referralCode.trim().toUpperCase()
      );
      referredById = referrer?.id;
    }

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

    const profileData = {
      ...this.extractProfileData(data),
      howDidYouHear: data.howDidYouHear,
    };

    const user = await this.authRepository.registerWithProfile(
      userData,
      data.role,
      profileData
    );

    return this.mapUserResponse(user);
  }

  async login(data: LoginDTO): Promise<UserResponse> {
    const user = await this.authRepository.findByEmail(data.email);
    if (!user || !(await BcryptUtil.compare(data.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return this.mapUserResponse(user);
  }

  async forgotPassword(email: string) {
    const user = await this.authRepository.findByEmail(email);
    if (user) {
      const resetToken = JwtUtil.generateResetToken(user.id);
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour
      await this.authRepository.saveResetToken(user.id, resetToken, expiresAt);
      await EmailService.sendPasswordResetEmail(user.email, resetToken);
    }
    return { message: 'If that email exists, a reset link has been sent' };
  }

  async resetPassword(data: ResetPasswordDTO) {
    const decoded = JwtUtil.verifyResetToken(data.token);
    const user = await this.authRepository.findByResetToken(data.token);

    if (!decoded || !user) throw new Error('Invalid or expired reset token');

    const hashedPassword = await BcryptUtil.hash(data.newPassword);
    await this.authRepository.update(user.id, { password: hashedPassword });
    await this.authRepository.clearResetToken(user.id);

    return { message: 'Password reset successful' };
  }

  async getCurrentUser(userId: string): Promise<UserResponse> {
    const user = await this.authRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return this.mapUserResponse(user);
  }

  private mapUserResponse(user: any): UserResponse {
    const { password, resetPasswordToken, resetPasswordExpires, ...safeUser } =
      user;
    return safeUser;
  }
}
