import { User, Prisma } from '@zagotours/database';
import { BaseRepository } from 'src/common/repository/base.repository';
import { prisma } from '@zagotours/database';

export class UserRepository extends BaseRepository<
  User,
  Prisma.UserWhereInput,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput,
  Prisma.UserInclude
> {
  protected readonly modelDelegate = prisma.user;

  private readonly profileInclude: Prisma.UserInclude = {
    independentDetails: true,
    cooperateDetails: true,
    affiliateDetails: true,
  };

  // Domain-specific queries
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ email }, this.profileInclude);
  }

  async findWithProfile(userId: string): Promise<User | null> {
    return this.findById(userId, {
      ...this.profileInclude,
      referrer: { select: { name: true, email: true } },
      referees: { select: { id: true, name: true } },
    });
  }

  async findReferrals(userId: string) {
    return prisma.user.findMany({
      where: {
        referredById: userId,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
