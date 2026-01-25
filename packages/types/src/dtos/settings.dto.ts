// ==================== PLATFORM SETTINGS DTOs ====================

export interface UpdatePlatformSettingsDto {
  siteName?: string;
  contactEmail?: string;
  maintenance?: boolean;
}

export interface PlatformSettingsResponseDto {
  id: string;
  siteName: string;
  contactEmail: string | null;
  maintenance: boolean;
  updatedAt: Date;
}

// ==================== DESTINATION COUNTRY DTOs ====================

export interface CreateDestinationCountryDto {
  name: string;
  code?: string;
  isActive?: boolean;
}

export interface BulkCreateDestinationCountriesDto {
  countries: CreateDestinationCountryDto[];
}

export interface UpdateDestinationCountryDto {
  name?: string;
  code?: string;
  isActive?: boolean;
}

export interface DestinationCountryResponseDto {
  id: string;
  name: string;
  code: string | null;
  isActive: boolean;
  createdAt: Date;
}

export interface DestinationCountryListQueryDto {
  page?: number;
  limit?: number;
  isActive?: boolean;
  search?: string;
  sortBy?: 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// ==================== ADMIN DASHBOARD DTOs ====================

export interface AdminDashboardStatsDto {
  users: {
    total: number;
    active: number;
    suspended: number;
    byRole: {
      superAdmin: number;
      admin: number;
      affiliate: number;
      adventurer: number;
      independentAgent: number;
      cooperateAgent: number;
    };
  };
  adventures: {
    total: number;
    active: number;
    draft: number;
    completed: number;
    verified: number;
    averageRating: number;
  };
  community: {
    totalPosts: number;
    totalComments: number;
    totalLikes: number;
    totalShares: number;
  };
  services: {
    totalTripRequests: number;
    totalCallbacks: number;
    totalInquiries: number;
    scheduledCalls: number;
    signedContracts: number;
  };
  revenue: {
    totalAdventures: number;
    averageAdventurePrice: number;
  };
}

export interface UserManagementDto {
  userId: string;
  action: 'suspend' | 'activate' | 'delete' | 'promote' | 'demote';
  newRole?: string;
}

export interface BulkUserActionDto {
  userIds: string[];
  action: 'suspend' | 'activate' | 'delete';
}

// ==================== ANALYTICS DTOs ====================

export interface DateRangeQueryDto {
  startDate: Date | string;
  endDate: Date | string;
}

export interface AnalyticsOverviewDto extends DateRangeQueryDto {
  metric?: 'users' | 'adventures' | 'posts' | 'reviews' | 'all';
}

export interface AnalyticsResponseDto {
  period: {
    start: Date;
    end: Date;
  };
  metrics: {
    newUsers: number;
    newAdventures: number;
    newPosts: number;
    newReviews: number;
    totalRevenue: number;
  };
  trends: {
    date: Date;
    users: number;
    adventures: number;
    posts: number;
    revenue: number;
  }[];
}

export interface TopPerformersDto {
  topAdventures: {
    id: string;
    title: string;
    rating: number;
    totalLikes: number;
  }[];
  topUsers: {
    id: string;
    name: string;
    role: string;
    postsCount: number;
    reviewsCount: number;
  }[];
  topLocations: {
    location: string;
    adventuresCount: number;
  }[];
}

// ==================== EXPORT DTOs ====================

export interface ExportDataDto {
  type: 'users' | 'adventures' | 'posts' | 'reviews' | 'all';
  format: 'csv' | 'json' | 'xlsx';
  filters?: {
    startDate?: Date | string;
    endDate?: Date | string;
    status?: string;
    role?: string;
  };
}

export interface ExportResponseDto {
  downloadUrl: string;
  filename: string;
  expiresAt: Date;
}
