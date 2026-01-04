import { Role, User, UserStatus } from '@zagotours/database';
import { BaseRepository } from '../../common/repository/base.repository';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('user');
  }

  // ==================== CUSTOM QUERIES ====================

  async findByEmail(email: string) {
    return this.model.findUnique({
      where: { email },
      include: {
        independentDetails: true,
        cooperateDetails: true,
        affiliateDetails: true,
      },
    });
  }

  async findByReferralCode(referralCode: string) {
    return this.model.findUnique({
      where: { referralCode },
    });
  }

  async findByRole(role: Role) {
    return this.model.findMany({
      where: { role, deletedAt: null },
    });
  }

  async updateStatus(id: string, status: UserStatus) {
    return this.model.update({
      where: { id },
      data: { status },
    });
  }

  async getUserWithReferrals(id: string) {
    return this.model.findUnique({
      where: { id },
      include: {
        referrer: true,
        referees: true,
      },
    });
  }

  async getSafetyAmbassadors() {
    return this.model.findMany({
      where: {
        safetyAmbassador: true,
        deletedAt: null,
      },
    });
  }

  async getUserProfile(id: string) {
    return this.model.findUnique({
      where: { id },
      include: {
        independentDetails: true,
        cooperateDetails: true,
        affiliateDetails: true,
        reviews: {
          where: { isFeatured: true },
          take: 5,
        },
      },
    });
  }

  async updatePassword(id: string, hashedPassword: string) {
    return this.model.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }
}

export const userRepository = new UserRepository();
