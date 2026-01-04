import { Role, User } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';

export class AuthRepository extends BaseRepository<User> {
  constructor() {
    super('user');
  }

  async findByEmail(email: string) {
    return this.model.findUnique({ where: { email } });
  }

  async findByReferralCode(code: string) {
    return this.model.findUnique({ where: { referralCode: code } });
  }

  //  Find user by reset token
  async findByResetToken(token: string) {
    return this.model.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gte: new Date(), // Token not expired
        },
      },
    });
  }

  //  Save reset token
  async saveResetToken(userId: string, token: string, expiresAt: Date) {
    return this.model.update({
      where: { id: userId },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: expiresAt,
      },
    });
  }

  //  Clear reset token
  async clearResetToken(userId: string) {
    return this.model.update({
      where: { id: userId },
      data: {
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });
  }

  async registerUserWithProfile(
    userData: any,
    profileType: Role,
    profileData: any
  ) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({ data: userData });

      if (profileType === Role.INDEPENDENT_AGENT) {
        await tx.independentAgent.create({
          data: { ...profileData, userId: user.id },
        });
      } else if (profileType === Role.COOPERATE_AGENT) {
        await tx.cooperateAgent.create({
          data: { ...profileData, userId: user.id },
        });
      } else if (profileType === Role.AFFILIATE) {
        await tx.affiliate.create({
          data: { ...profileData, userId: user.id },
        });
      }

      return user;
    });
  }
}
