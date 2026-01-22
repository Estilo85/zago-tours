import {
  AdventureLevel,
  AdventureStatus,
  CallStatus,
  ContractStatus,
  Role,
  TripType,
  UserStatus,
} from '@prisma/client';

export const TripTypeLabels: Record<TripType, string> = {
  HIKING: 'Hiking',
  TREKKING: 'Trekking',
  SAFARI: 'Safari',
  WATER_SPORTS: 'Water Sports',
  WINTER_SPORTS: 'Winter Sports',
  CULTURAL: 'Cultural & History',
  WELLNESS: 'Wellness & Yoga',
  PHOTOGRAPHY: 'Photography',
  VOLUNTEERING: 'Volunteering',
  EXPEDITION: 'Expedition',
  ROAD_TRIP: 'Road Trip',
  BACKPACKING: 'Backpacking',
  EXTREME_SPORTS: 'Extreme Sports',
  WILDLIFE: 'Wildlife & Nature',
  URBAN_EXPLORATION: 'Urban Exploration',
  CYCLING: 'Cycling',
  CLIMBING: 'Mountain Climbing',
  DIVING: 'Scuba Diving',
  SURFING: 'Surfing',
  KAYAKING: 'Kayaking',
  OTHER: 'Other',
};

export const RoleLabels: Record<Role, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Administrator',
  AFFILIATE: 'Affiliate Partner',
  ADVENTURER: 'Adventurer',
  INDEPENDENT_AGENT: 'Independent Agent',
  COOPERATE_AGENT: 'Corporate Agent',
};

export const AdventureLevelLabels: Record<AdventureLevel, string> = {
  MEDIUM: 'Intermediate',
  CHALLENGING: 'Challenging',
  HARD: 'Expert / Hard',
};

export const AdventureStatusLabels: Record<AdventureStatus, string> = {
  DRAFT: 'Draft',
  ACTIVE: 'Live / Active',
  COMPLETED: 'Completed',
};

export const CallStatusLabels: Record<CallStatus, string> = {
  SCHEDULED: 'Scheduled',
  EXPIRED: 'Expired',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const UserStatusLabels: Record<UserStatus, string> = {
  ACTIVE: 'Active',
  SUSPENDED: 'Suspended',
};

export const ContractStatusLabels: Record<ContractStatus, string> = {
  SIGNED: 'Signed & Verified',
  NOT_SIGNED: 'Pending Signature',
};
