import {
  AdventureStatus,
  AdventureLevel,
  AccessType,
  MediaType,
} from '../enums';

export interface Adventure {
  id: string;
  title: string;
  isVerified: boolean;
  price: number;
  location: string;
  level: AdventureLevel;
  tripType: string;
  safetyScore: number;
  rating: number;
  certification?: string;
  gear?: string;
  status: AdventureStatus;
  mediaUrl?: string;
  date: Date;
  description: string;
  days: number;
  access: AccessType;
  lastSafetyCertDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface Itinerary {
  id: string;
  adventureId: string;
  dayNumber: number;
  title: string;
  activityDetails: string;
  imageUrl?: string;
}

export interface AdventureWithDetails extends Adventure {
  itineraries: Itinerary[];
  gallery: Gallery[];
}

export interface Gallery {
  id: string;
  mediaUrl: string;
  mediaType: MediaType;
  altText?: string;
  uploadedBy: string;
  adventureId?: string;
  createdAt: Date;
  deletedAt?: Date;
}
