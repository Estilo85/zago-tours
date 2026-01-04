import { BaseService } from '../../common/service/base.service';
import { userRepository } from './users.repository';
import { User, Role, UserStatus } from '@zagotours/database';

class UserService extends BaseService<User> {
  constructor() {
    super(userRepository);
  }

  async updateStatus(userId: string, status: UserStatus) {
    return userRepository.updateStatus(userId, status);
  }

  async getUserProfile(userId: string) {
    return userRepository.getUserProfile(userId);
  }

  async getReferrals(userId: string) {
    return userRepository.getUserWithReferrals(userId);
  }

  async getUsersByRole(role: Role) {
    return userRepository.findByRole(role);
  }

  private async generateReferralCode(): Promise<string> {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    const exists = await userRepository.findByReferralCode(code);
    if (exists) {
      return this.generateReferralCode();
    }
    return code;
  }
}

export const userService = new UserService();
