import { AdventureLevel, AdventureStatus, AccessType } from '../enums';

export interface CreateAdventureDTO {
  title: string;
  price: number;
  location: string;
  level: AdventureLevel;
  tripType: string;
  certification?: string;
  gear?: string;
  mediaUrl?: string;
  date: Date;
  description: string;
  days: number;
  access?: AccessType;
}

export interface UpdateAdventureDTO {
  title?: string;
  price?: number;
  location?: string;
  level?: AdventureLevel;
  tripType?: string;
  safetyScore?: number;
  rating?: number;
  certification?: string;
  gear?: string;
  status?: AdventureStatus;
  mediaUrl?: string;
  date?: Date;
  description?: string;
  days?: number;
  access?: AccessType;
}

export interface CreateItineraryDTO {
  adventureId: string;
  dayNumber: number;
  title: string;
  activityDetails: string;
  imageUrl?: string;
}

export interface AdventureFilterDTO {
  location?: string;
  level?: AdventureLevel;
  tripType?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: AdventureStatus;
  access?: AccessType;
  startDate?: Date;
  endDate?: Date;
}
