import { Role, UserStatus } from '../enums';

export type PublicRole = Exclude<Role, Role.SUPER_ADMIN>;

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
  country?: string;
  role: PublicRole;
  referralCode?: string;
  // Role specific fields
  certifications?: string[];
  companyName?: string;
  travelBusinessDescription?: string;
  communityBrand?: string;
  socialLinks?: string[];
  howDidYouHear?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserResponse;
  token: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  role: Role;
  status: UserStatus;
  safetyAmbassador: boolean;
  referralCode: string;
  createdAt: Date;
}

export interface ResetPasswordDTO {
  email: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}
