import { Role, UserStatus } from '../enums';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  password: string;
  role: Role;
  status: UserStatus;
  safetyAmbassador: boolean;
  referralCode: string;
  referredById?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IndependentAgent {
  id: string;
  userId: string;
  certifications: string[];
  howDidYouHear?: string;
}

export interface CooperateAgent {
  id: string;
  userId: string;
  companyName: string;
  travelBusinessDescription: string;
  howDidYouHear?: string;
}

export interface Affiliate {
  id: string;
  userId: string;
  communityBrand: string;
  socialLinks: string[];
  howDidYouHear?: string;
}

export interface UserProfile extends User {
  independentDetails?: IndependentAgent;
  cooperateDetails?: CooperateAgent;
  affiliateDetails?: Affiliate;
}
