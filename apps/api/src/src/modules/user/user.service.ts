import { User, Prisma } from '@zagotours/database';
import {
  BaseService,
  NotFoundException,
} from 'src/common/service/base.service';
import { UserRepository } from './user.repository';
import { BcryptUtil } from 'src/shared/utils/password';
import { UpdateUserRequest } from '@zagotours/types';
import { prisma } from '@zagotours/database';

export class UserService extends BaseService<
  User,
  Prisma.UserWhereInput,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput,
  Prisma.UserInclude
> {
  protected readonly resourceName = 'User';

  constructor(private readonly userRepo: UserRepository) {
    super(userRepo);
  }

  // Get user profile with all details
  async getProfile(id: string) {
    const user = await this.userRepo.findWithProfile(id);

    if (!user) {
      throw new NotFoundException(this.resourceName, id);
    }

    // Exclude sensitive fields
    const { password, resetPasswordToken, resetPasswordExpires, ...profile } =
      user;
    return profile;
  }

  async updateProfile(id: string, data: UpdateUserRequest) {
    const {
      independentDetails,
      cooperateDetails,
      affiliateDetails,
      ...userData
    } = data;

    // Verify user exists
    await this.getById(id);

    return prisma.$transaction(async (tx) => {
      // Update user data
      const updatedUser = await tx.user.update({
        where: { id: id },
        data: userData,
      });

      // Update independent agent details if provided
      if (independentDetails) {
        const existingIndependent = await tx.independentAgent.findUnique({
          where: { id },
        });

        if (existingIndependent) {
          await tx.independentAgent.update({
            where: { id },
            data: independentDetails,
          });
        } else {
          await tx.independentAgent.create({
            data: {
              id,
              ...independentDetails,
            },
          });
        }
      }

      // Update cooperate agent details if provided
      if (cooperateDetails) {
        const existingCooperate = await tx.cooperateAgent.findUnique({
          where: { id },
        });

        if (existingCooperate) {
          await tx.cooperateAgent.update({
            where: { id },
            data: cooperateDetails,
          });
        } else {
          await tx.cooperateAgent.create({
            data: {
              id,
              ...cooperateDetails,
            },
          });
        }
      }

      // Update affiliate details if provided
      if (affiliateDetails) {
        const existingAffiliate = await tx.affiliate.findUnique({
          where: { id },
        });

        if (existingAffiliate) {
          await tx.affiliate.update({
            where: { id },
            data: affiliateDetails,
          });
        } else {
          await tx.affiliate.create({
            data: {
              id,
              ...affiliateDetails,
            },
          });
        }
      }

      return updatedUser;
    });
  }

  // Change password with validation
  async changePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await this.getById(id);

    // Verify old password
    const isValid = await BcryptUtil.compare(oldPassword, user.password);
    if (!isValid) {
      throw new Error('Current password is incorrect');
    }

    // Validate new password strength
    if (newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters long');
    }

    // Hash and update
    const hashedPassword = await BcryptUtil.hash(newPassword);
    return this.update(id, { password: hashedPassword });
  }

  // Get user's referrals
  async getReferrals(id: string) {
    await this.getById(id);
    return this.userRepo.findReferrals(id);
  }
}
