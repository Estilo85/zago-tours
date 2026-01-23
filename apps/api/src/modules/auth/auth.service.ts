import { generateReferralCode } from 'src/shared/utils/nanoid';
import { BcryptUtil } from '../../shared/utils/password';
import { JwtUtil } from '../../shared/utils/jwt';
import { EmailService } from '../../shared/services/email.service';
import { AuthRepository } from './auth.repository';
import {
  RegisterDto,
  LoginDto,
  UserResponse,
  ResetPasswordDto,
  ROLE_PREFIXES,
  UserProfileResponse,
} from '@zagotours/types';
import { Role } from '@zagotours/database';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  // ============================================
  // REGISTRATION
  // ============================================

  // async register(data: RegisterDto): Promise<UserResponse> {
  //   const existingUser = await this.authRepository.findByEmail(data.email);
  //   if (existingUser) {
  //     throw new Error('User already exists');
  //   }

  //   this.validateRoleSpecificFields(data);

  //   const hashedPassword = await BcryptUtil.hash(data.password);
  //   const referralCode = await this.generateUniqueReferralCode(data.role);

  //   let referredById: string | null = null;

  //   if (data.referralCode) {
  //     const referrer = await this.authRepository.findByReferralCode(
  //       data.referralCode.trim().toUpperCase(),
  //     );

  //     if (referrer) {
  //       referredById = referrer.id;
  //       console.log(`Referral match found! Referrer: ${referrer.name}`);
  //     } else {
  //       console.log('No referrer found for code:', data.referralCode);
  //     }
  //   }

  //   const userData = {
  //     name: data.name,
  //     email: data.email,
  //     password: hashedPassword,
  //     phone: data.phone,
  //     country: data.country,
  //     role: data.role,
  //     referralCode,
  //     referredById,
  //   };

  //   const profileData = this.extractProfileData(data);

  //   const user = await this.authRepository.registerWithProfile(
  //     userData,
  //     data.role,
  //     profileData,
  //   );
  //   //Welcome Email
  //   EmailService.sendWelcomeEmail(user.email, user.name).catch((err) =>
  //     console.error('Email background error:', err),
  //   );

  //   return this.mapUserResponse(user);
  // }

  async register(data: RegisterDto): Promise<UserResponse> {
    console.log('=== REGISTRATION DEBUG ===');
    console.log('1. Incoming data:', JSON.stringify(data, null, 2));

    const existingUser = await this.authRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    this.validateRoleSpecificFields(data);

    const hashedPassword = await BcryptUtil.hash(data.password);
    const referralCode = await this.generateUniqueReferralCode(data.role);

    let referredById: string | null = null;

    if (data.referralCode) {
      const trimmedCode = data.referralCode.trim().toUpperCase();
      console.log('2. Looking for referral code:', trimmedCode);

      const referrer =
        await this.authRepository.findByReferralCode(trimmedCode);

      console.log(
        '3. Referrer found:',
        referrer
          ? {
              id: referrer.id,
              name: referrer.name,
              email: referrer.email,
              referralCode: referrer.referralCode,
            }
          : 'NULL - NO REFERRER FOUND',
      );

      if (referrer) {
        referredById = referrer.id;
        console.log('4. ✅ Setting referredById to:', referredById);
      } else {
        console.log('4. ❌ No referrer found, referredById remains null');
      }
    } else {
      console.log('2. ❌ No referral code provided in request');
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

    console.log('5. Final userData being passed to repository:', {
      ...userData,
      password: '[HIDDEN]',
    });

    const profileData = this.extractProfileData(data);

    const user = await this.authRepository.registerWithProfile(
      userData,
      data.role,
      profileData,
    );

    console.log('6. User created with referredById:', user.referredById);
    console.log('=== END DEBUG ===');

    // Welcome Email
    EmailService.sendWelcomeEmail(user.email, user.name).catch((err) =>
      console.error('Email background error:', err),
    );

    return this.mapUserResponse(user);
  }

  // ============================================
  // LOGIN & AUTH
  // ============================================

  async login(data: LoginDto): Promise<UserResponse> {
    const user = await this.authRepository.findByEmail(data.email);

    if (!user || !(await BcryptUtil.compare(data.password, user.password))) {
      throw new Error('Invalid credentials');
    }

    return this.mapUserResponse(user);
  }

  // ============================================
  // GET CURRENT USER
  // ============================================
  async getCurrentUser(userId: string): Promise<UserResponse> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new Error('User not found');

    return this.mapUserResponse(user);
  }

  // ============================================
  // PASSWORD RECOVERY
  // ============================================

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.authRepository.findByEmail(email);

    if (user) {
      const resetToken = JwtUtil.generateResetToken(user.id);
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour

      await this.authRepository.saveResetToken(user.id, resetToken, expiresAt);
      await EmailService.sendPasswordResetEmail(user.email, resetToken).catch(
        (err) => console.error('Email background error:', err),
      );
    }

    return { message: 'If that email exists, a reset link has been sent' };
  }

  // ============================================
  // RESET PASSWORD
  // ============================================
  async resetPassword(data: ResetPasswordDto): Promise<{ message: string }> {
    const decoded = JwtUtil.verifyResetToken(data.token);
    const user = await this.authRepository.findByResetToken(data.token);

    if (!decoded || !user) {
      throw new Error('Invalid or expired reset token');
    }

    const hashedPassword = await BcryptUtil.hash(data.newPassword);

    await this.authRepository.update(user.id, { password: hashedPassword });
    await this.authRepository.clearResetToken(user.id);

    return { message: 'Password reset successful' };
  }

  // ============================================
  // PRIVATE HELPERS
  // ============================================

  private mapUserResponse(user: any): UserResponse {
    const {
      password,
      resetPasswordToken,
      resetPasswordExpires,
      independentDetails,
      cooperateDetails,
      affiliateDetails,
      ...safeUser
    } = user;

    //ReferralLink
    const referralLink = `${process.env.FRONTEND_URL}/register?ref=${user.referralCode}`;

    let profile: UserProfileResponse = null;

    // Discriminated Union mapping
    if (user.role === Role.INDEPENDENT_AGENT && independentDetails) {
      profile = { ...independentDetails };
    } else if (user.role === Role.COOPERATE_AGENT && cooperateDetails) {
      profile = { ...cooperateDetails };
    } else if (user.role === Role.AFFILIATE && affiliateDetails) {
      profile = { ...affiliateDetails };
    }

    return {
      ...safeUser,
      referralLink,
      profile,
      referralCount: user._count?.referees ?? 0,
    };
  }

  // ============================================
  // VALIDATE SPECIFIC ROLE
  // ============================================
  private validateRoleSpecificFields(data: RegisterDto): void {
    if (data.role === Role.INDEPENDENT_AGENT) {
      if (!data.agentDetails || data.agentDetails.certifications.length === 0) {
        throw new Error('Certifications are required for Independent Agents');
      }
    }

    if (data.role === Role.COOPERATE_AGENT) {
      if (!data.cooperateDetails?.companyName) {
        throw new Error('Company name is required for Corporate Agents');
      }
    }

    if (data.role === Role.AFFILIATE) {
      if (!data.affiliateDetails?.communityBrand) {
        throw new Error('Community brand is required for Affiliates');
      }
    }
  }

  // ============================================
  // EXTRACT PROFILE DATA
  // ============================================
  private extractProfileData(data: RegisterDto): Record<string, any> {
    if (data.role === Role.INDEPENDENT_AGENT && data.agentDetails) {
      return {
        certifications: data.agentDetails.certifications,
        howDidYouHear: data.agentDetails?.howDidYouHear,
      };
    }
    if (data.role === Role.COOPERATE_AGENT && data.cooperateDetails) {
      return {
        companyName: data.cooperateDetails.companyName,
        travelBusinessDescription:
          data.cooperateDetails.travelBusinessDescription,
        howDidYouHear: data.cooperateDetails?.howDidYouHear,
      };
    }
    if (data.role === Role.AFFILIATE && data.affiliateDetails) {
      return {
        communityBrand: data.affiliateDetails.communityBrand,
        socialLinks: data.affiliateDetails.socialLinks,
        howDidYouHear: data.affiliateDetails?.howDidYouHear,
      };
    }
    return {};
  }

  // ============================================
  // GENERATE UNIQUE REFFERAL CODE
  // ============================================
  private async generateUniqueReferralCode(role: Role): Promise<string> {
    const prefix = ROLE_PREFIXES[role] || 'USR';
    let attempts = 0;
    while (attempts < 5) {
      const code = `${prefix}-${generateReferralCode().toUpperCase()}`;
      const existing = await this.authRepository.findByReferralCode(code);
      if (!existing) return code;
      attempts++;
    }
    throw new Error('Failed to generate unique referral code');
  }
}
