import {
  AdventureLevel,
  AdventureStatus,
  AccessType,
  MediaType,
} from '../enums';

// ==================== ADVENTURE DTOs ====================

export interface CreateAdventureDto {
  title: string;
  price: number;
  location: string;
  level: AdventureLevel;
  tripType: string;
  date: Date | string;
  description: string;
  days: number;
  certification?: string;
  gear?: string;
  access?: AccessType;
  safetyScore?: number;
  // Cloudinary media (uploaded separately)
  mediaUrl?: string;
  publicId?: string;
}

export interface UpdateAdventureDto {
  title?: string;
  price?: number;
  location?: string;
  level?: AdventureLevel;
  tripType?: string;
  date?: Date | string;
  description?: string;
  days?: number;
  certification?: string;
  gear?: string;
  access?: AccessType;
  status?: AdventureStatus;
  safetyScore?: number;
  isVerified?: boolean;
  lastSafetyCertDate?: Date | string;
  // Cloudinary media update
  mediaUrl?: string;
  publicId?: string;
}

export interface AdventureResponseDto {
  id: string;
  title: string;
  isVerified: boolean;
  price: number;
  location: string;
  level: AdventureLevel;
  tripType: string;
  safetyScore: number;
  rating: number;
  certification: string | null;
  gear: string | null;
  status: AdventureStatus;
  mediaUrl: string | null;
  publicId: string | null;
  date: Date;
  description: string;
  days: number;
  access: AccessType;
  lastSafetyCertDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  stats?: {
    totalLikes: number;
    totalItineraries: number;
    totalGalleryItems: number;
  };
}

export interface AdventureDetailResponseDto extends AdventureResponseDto {
  itineraries: ItineraryResponseDto[];
  gallery: AdventureGalleryResponseDto[];
  isLikedByUser?: boolean;
}

export interface AdventureListQueryDto {
  page?: number;
  limit?: number;
  location?: string;
  level?: AdventureLevel;
  tripType?: string;
  status?: AdventureStatus;
  minPrice?: number;
  maxPrice?: number;
  isVerified?: boolean;
  access?: AccessType;
  sortBy?: 'price' | 'rating' | 'date' | 'safetyScore' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

// ==================== ITINERARY DTOs ====================

export interface CreateItineraryDto {
  adventureId: string;
  dayNumber: number;
  title: string;
  activityDetails: string;
  // Cloudinary image
  imageUrl?: string;
  publicId?: string;
}

export interface UpdateItineraryDto {
  dayNumber?: number;
  title?: string;
  activityDetails?: string;
  // Cloudinary image update
  imageUrl?: string;
  publicId?: string;
}

export interface ItineraryResponseDto {
  id: string;
  adventureId: string;
  dayNumber: number;
  title: string;
  activityDetails: string;
  imageUrl: string | null;
  publicId: string | null;
}

export interface BulkCreateItinerariesDto {
  adventureId: string;
  itineraries: Omit<CreateItineraryDto, 'adventureId'>[];
}

// ==================== ADVENTURE GALLERY DTOs ====================

export interface CreateAdventureGalleryDto {
  adventureId: string;
  mediaUrl: string; // Cloudinary URL
  publicId: string; // Cloudinary public ID
  mediaType: MediaType;
  altText?: string;
  order?: number;
}

export interface UpdateAdventureGalleryDto {
  altText?: string;
  order?: number;
}

export interface AdventureGalleryResponseDto {
  id: string;
  mediaUrl: string;
  publicId: string | null;
  mediaType: MediaType;
  altText: string | null;
  order: number;
  adventureId: string;
  createdAt: Date;
}

export interface BulkUploadGalleryDto {
  adventureId: string;
  mediaTypes?: MediaType[];
  altTexts?: string[];
  media: {
    mediaUrl: string;
    publicId: string;
    mediaType?: MediaType;
    altText?: string;
  }[];
}

export interface ReorderGalleryDto {
  items: {
    id: string;
    order: number;
  }[];
}

// ==================== ADVENTURE LIKE DTOs ====================

export interface ToggleAdventureLikeDto {
  adventureId: string;
}

export interface AdventureLikeResponseDto {
  id: string;
  userId: string;
  adventureId: string;
  user?: {
    id: string;
    name: string;
  };
}

// ==================== ADVENTURE STATS DTOs ====================

export interface AdventureStatsDto {
  totalAdventures: number;
  activeAdventures: number;
  draftAdventures: number;
  completedAdventures: number;
  verifiedAdventures: number;
  averageRating: number;
  averageSafetyScore: number;
  topLocations: {
    location: string;
    count: number;
  }[];
  topTripTypes: {
    tripType: string;
    count: number;
  }[];
}
