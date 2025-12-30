import { generateReferralCode } from 'src/shared/utils/nanoid';
import { BcryptUtil } from '../../shared/utils/password';
import { AuthRepository } from './auth.repository';
import { RegisterDTO, LoginDTO, UserResponse } from '@zagotours/types';

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  // =====REGISTER======

  async register(data: RegisterDTO): Promise<UserResponse> {
    // 1. Basic validation
    const existingUser = await this.authRepository.findByEmail(data.email);
    if (existingUser) throw new Error('User already exists');

    // 2. Generate the NEW referral code for this user
    const randomPart = generateReferralCode().toUpperCase();
    let prefix = 'ADV';
    if (data.role === 'AFFILIATE') prefix = 'AFF';
    if (data.role === 'INDEPENDENT_AGENT') prefix = 'IND';
    if (data.role === 'COOPERATE_AGENT') prefix = 'COR';
    if (data.role === 'SUPER_ADMIN') prefix = 'SUP';

    const referralCode = `${prefix}-${randomPart}`;

    // 3. Handle the incoming referral code (if someone invited them)
    let referredById: string | undefined;
    if (data.referralCode) {
      const normalizedInput = data.referralCode.trim().toUpperCase();
      const referrer =
        await this.authRepository.findByReferralCode(normalizedInput);
      referredById = referrer?.id;
    }

    // 4. Hash the password
    const hashedPassword = await BcryptUtil.hash(data.password);

    // 5. Prepare User Data
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

    // 6. Prepare Profile Data
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

    // 7. Save everything in one transaction
    const user = await this.authRepository.registerUserWithProfile(
      userData,
      data.role,
      profileData
    );

    return this.mapUserResponse(user);
  }

  // =====LOGIN======

  async login(data: LoginDTO): Promise<UserResponse> {
    const user = await this.authRepository.findByEmail(data.email);

    if (!user) throw new Error('Invalid credentials');

    const isValid = await BcryptUtil.compare(data.password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    return this.mapUserResponse(user);
  }

  // =====CURRENT-USER======

  async getCurrentUser(userId: string): Promise<UserResponse> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new Error('User not found');
    return this.mapUserResponse(user);
  }

  private mapUserResponse(user: any): UserResponse {
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
