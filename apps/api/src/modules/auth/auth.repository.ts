import { prisma } from '@zagotours/database';

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findByReferralCode(code: string) {
    return prisma.user.findUnique({ where: { referralCode: code } });
  }

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  //Register Base on Profile
  async registerUserWithProfile(
    userData: any,
    profileType: string,
    profileData: any
  ) {
    return prisma.$transaction(async (tx) => {
      const user = await tx.user.create({ data: userData });

      //  Create the Role-Specific Profile
      if (profileType === 'INDEPENDENT_AGENT') {
        await tx.independentAgent.create({
          data: { ...profileData, userId: user.id },
        });
      } else if (profileType === 'COOPERATE_AGENT') {
        await tx.cooperateAgent.create({
          data: { ...profileData, userId: user.id },
        });
      } else if (profileType === 'AFFILIATE') {
        await tx.affiliate.create({
          data: { ...profileData, userId: user.id },
        });
      }

      return user;
    });
  }

  async getReferralStats(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        referralCode: true,
        _count: {
          select: { referees: true },
        },
        referees: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }
}
