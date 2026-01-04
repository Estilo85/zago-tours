import { Role, UserStatus } from '../enums';

export type RegistrableRole = Exclude<Role, Role.SUPER_ADMIN>;

export type CustomerRole = Exclude<Role, Role.SUPER_ADMIN | Role.ADMIN>;

export const STAFF_ROLES: Role[] = [Role.SUPER_ADMIN, Role.ADMIN];

export const PARTNER_ROLES: Role[] = [
  Role.ADVENTURER,
  Role.AFFILIATE,
  Role.INDEPENDENT_AGENT,
  Role.COOPERATE_AGENT,
];

export const PUBLIC_ROLES_LIST: RegistrableRole[] = [
  Role.ADMIN,
  Role.AFFILIATE,
  Role.ADVENTURER,
  Role.INDEPENDENT_AGENT,
  Role.COOPERATE_AGENT,
];

export const ROLE_PREFIXES: Record<Role, string> = {
  [Role.ADVENTURER]: 'ADV',
  [Role.AFFILIATE]: 'AFF',
  [Role.INDEPENDENT_AGENT]: 'IND',
  [Role.COOPERATE_AGENT]: 'COR',
  [Role.ADMIN]: 'ADM',
  [Role.SUPER_ADMIN]: 'SUP',
};

//RegisterDTO
export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
  country?: string;
  role: RegistrableRole;
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
  token: string;
  newPassword: string;
}

export interface ForgotPasswordDTO {
  email: string;
}
