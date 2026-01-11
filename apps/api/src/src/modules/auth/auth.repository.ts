import { prisma, Prisma, Role, User } from '@zagotours/database';
import { CustomerRole } from '@zagotours/types';
import { BaseRepository } from 'src/common/repository/base.repository';

export class AuthRepository extends BaseRepository<
  User,
  Prisma.UserWhereInput,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput,
  Prisma.UserInclude
> {
  protected readonly modelDelegate = prisma.user;

  async findByEmail(email: string) {
    return this.modelDelegate.findUnique({ where: { email } });
  }

  async findByReferralCode(code: string) {
    return this.modelDelegate.findUnique({ where: { referralCode: code } });
  }

  async findByResetToken(token: string) {
    return this.modelDelegate.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { gte: new Date() },
      },
    });
  }

  async saveResetToken(userId: string, token: string, expiresAt: Date) {
    return this.update(userId, {
      resetPasswordToken: token,
      resetPasswordExpires: expiresAt,
    });
  }

  async clearResetToken(userId: string) {
    return this.update(userId, {
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });
  }

  async registerWithProfile(
    userData: any,
    profileType: CustomerRole,
    profileData: any
  ) {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({ data: userData });

      const profileModels: Record<CustomerRole, any> = {
        [Role.INDEPENDENT_AGENT]: tx.independentAgent,
        [Role.COOPERATE_AGENT]: tx.cooperateAgent,
        [Role.AFFILIATE]: tx.affiliate,
        [Role.ADVENTURER]: null,
      };

      const targetModel = profileModels[profileType];

      if (targetModel) {
        await targetModel.create({
          data: { ...profileData, userId: user.id },
        });
      }

      return user;
    });
  }
}
