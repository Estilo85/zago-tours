import { User, Prisma, Role, UserStatus } from '@zagotours/database';
import { prisma } from '@zagotours/database';
import { UserRepository } from './user.repository';
import {
  UpdateProfileDto,
  UpdateUserStatusDto,
  PromoteToSafetyAmbassadorDto,
  UserProfileResponseDto,
  ReferralStatsDto,
} from '@zagotours/types';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // ============================================
  // USER PROFILE OPERATIONS
  // ============================================

  /**
   * Get user profile with stats
   */
  async getProfile(userId: string): Promise<UserProfileResponseDto> {
    const user = await this.userRepository.findWithProfile(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const stats = await this.userRepository.getUserStats(userId);

    const { password, resetPasswordToken, resetPasswordExpires, ...profile } =
      user;

    return {
      ...profile,
      stats,
    } as unknown as UserProfileResponseDto;
  }

  /**
   * Update user profile (name, phone, country, role-specific details)
   */
  async updateProfile(userId: string, data: UpdateProfileDto): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }
 

    const { agentDetails, cooperateDetails, affiliateDetails, ...userData } =
      data;

    return prisma.$transaction(async (tx) => {
      // Update basic user info
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: userData,
      });

      // Update Independent Agent details
      if (agentDetails && user.role === Role.INDEPENDENT_AGENT) {
        const existing = await tx.independentAgent.findUnique({
          where: { userId },
        });

        if (existing) {
          await tx.independentAgent.update({
            where: { userId },
            data: agentDetails,
          });
        }
      }

      // Update Corporate Agent details
      if (cooperateDetails && user.role === Role.COOPERATE_AGENT) {
        const existing = await tx.cooperateAgent.findUnique({
          where: { userId },
        });

        if (existing) {
          await tx.cooperateAgent.update({
            where: { userId },
            data: cooperateDetails,
          });
        }
      }

      // Update Affiliate details
      if (affiliateDetails && user.role === Role.AFFILIATE) {
        const existing = await tx.affiliate.findUnique({
          where: { userId },
        });

        if (existing) {
          await tx.affiliate.update({
            where: { userId },
            data: affiliateDetails,
          });
        }
      }

      return tx.user.findUniqueOrThrow({
        where: { id: userId },
        include: {
          independentDetails: true,
          cooperateDetails: true,
          affiliateDetails: true,
        },
      });
    });
  }

  /**
   * Get user's referral stats
   */
  async getReferralStats(userId: string): Promise<ReferralStatsDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const [referrals, totalReferrals, activeReferrals] = await Promise.all([
      this.userRepository.findReferrals(userId),
      this.userRepository.countReferrals(userId),
      this.userRepository.countReferrals(userId, true),
    ]);

    const formattedReferrals = referrals.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      status:
        r.status as unknown as ReferralStatsDto['referrals'][number]['status'],
      createdAt: r.createdAt,
    }));

    return {
      totalReferrals,
      activeReferrals,
      referralCode: user.referralCode,
      referrals: formattedReferrals,
    };
  }

  // ============================================
  // ADMIN OPERATIONS
  // ============================================

  /**
   * Get all users with pagination and filters
   */
  async getAllUsers(options: {
    page: number;
    limit: number;
    role?: Role;
    status?: UserStatus;
    search?: string;
  }) {
    const { page, limit, role, status, search } = options;

    const where: Prisma.UserWhereInput = { deletedAt: null };

    if (role) where.role = role;
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.userRepository.paginate({
      page,
      limit,
      where,
      include: {
        independentDetails: true,
        cooperateDetails: true,
        affiliateDetails: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get user by ID (admin)
   */
  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findWithProfile(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  /**
   * Update user status (admin)
   */
  async updateUserStatus(
    userId: string,
    data: UpdateUserStatusDto
  ): Promise<User> {
    return this.userRepository.update(userId, { status: data.status });
  }

  /**
   * Promote to safety ambassador (admin)
   */
  async promoteSafetyAmbassador(
    data: PromoteToSafetyAmbassadorDto
  ): Promise<User> {
    return this.userRepository.update(data.userId, {
      safetyAmbassador: data.safetyAmbassador,
    });
  }

  /**
   * Delete user (soft or hard)
   */
  async deleteUser(userId: string, hard = false): Promise<void> {
    if (hard) {
      await this.userRepository.delete(userId);
    } else {
      await this.userRepository.softDelete(userId);
    }
  }
}
