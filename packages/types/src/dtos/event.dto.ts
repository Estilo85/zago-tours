// ==================== EVENT DTOs ====================

import { EventStatus } from '../enums';

export interface CreateEventDto {
  title: string;
  date: Date | string;
  description: string;
  location: string;
  spotLeft: number;
  joinTill: Date | string;
  cancellationTerms: string;
  // Cloudinary media
  mediaUrl?: string;
  publicId?: string;
}

export interface UpdateEventDto {
  title?: string;
  date?: Date | string;
  description?: string;
  location?: string;
  spotLeft?: number;
  joinTill?: Date | string;
  cancellationTerms?: string;
  // Cloudinary media update
  mediaUrl?: string;
  publicId?: string;
}

export interface EventResponseDto {
  id: string;
  title: string;
  date: Date;
  description: string;
  location: string;
  createdBy: string;
  spotLeft: number;
  joinTill: Date;
  cancellationTerms: string;
  mediaUrl: string | null;
  publicId: string | null;
  createdAt: Date;

  isExpired?: boolean;
  isFull?: boolean;
  hasJoined?: boolean;
}
export interface EventListQueryDto {
  page?: number;
  limit?: number;
  location?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  hasSpots?: boolean;
  sortBy?: 'date' | 'createdAt' | 'spotLeft';
  sortOrder?: 'asc' | 'desc';
}

export interface JoinEventDto {
  notes?: string;
}

export interface EventRegistrationResponseDto {
  id: string;
  eventId: string;
  userId: string;
  status: EventStatus;
  createdAt: Date;
  event?: {
    title: string;
    date: Date;
    location: string;
    mediaUrl: string | null;
  };
}

export interface MyBookingsQueryDto {
  status?: EventStatus;
  upcomingOnly?: boolean;
}

export interface EventStatsDto {
  totalEvents: number;
  upcomingEvents: number;
  pastEvents: number;
  totalSpotsAvailable: number;
  popularLocations: {
    location: string;
    count: number;
  }[];
}
