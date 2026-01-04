const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.zagotours.com/v1';

// Helper function to build URLs
const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: buildUrl('/auth/register'),
    LOGIN: buildUrl('/auth/login'),
    FORGOT_PASSWORD: buildUrl('/auth/forgot-password'),
    RESET_PASSWORD: buildUrl('/auth/reset-password'),
    VERIFY_EMAIL: buildUrl('/auth/verify-email'),
  },

  // Users
  USERS: {
    PROFILE: buildUrl('/users/profile'),
    CHANGE_PASSWORD: buildUrl('/users/change-password'),
    REFERRALS: buildUrl('/users/referrals'),
    AGENT_DETAILS: buildUrl('/users/agent-details'),
    AFFILIATE_DETAILS: buildUrl('/users/affiliate-details'),
  },

  // Adventures (with helper functions for dynamic URLs)
  ADVENTURES: {
    list: buildUrl('/adventures'),
    featured: buildUrl('/adventures/featured'),
    byId: (id: string) => buildUrl(`/adventures/${id}`),
    create: buildUrl('/adventures'),
    update: (id: string) => buildUrl(`/adventures/${id}`),
    delete: (id: string) => buildUrl(`/adventures/${id}`),
    like: (id: string) => buildUrl(`/adventures/${id}/like`),
    unlike: (id: string) => buildUrl(`/adventures/${id}/like`),

    // Nested resources
    itineraries: {
      list: (adventureId: string) =>
        buildUrl(`/adventures/${adventureId}/itineraries`),
      create: (adventureId: string) =>
        buildUrl(`/adventures/${adventureId}/itineraries`),
      update: (adventureId: string, itineraryId: string) =>
        buildUrl(`/adventures/${adventureId}/itineraries/${itineraryId}`),
      delete: (adventureId: string, itineraryId: string) =>
        buildUrl(`/adventures/${adventureId}/itineraries/${itineraryId}`),
    },

    gallery: {
      list: (adventureId: string) =>
        buildUrl(`/adventures/${adventureId}/gallery`),
      create: (adventureId: string) =>
        buildUrl(`/adventures/${adventureId}/gallery`),
      delete: (adventureId: string, galleryId: string) =>
        buildUrl(`/adventures/${adventureId}/gallery/${galleryId}`),
    },
  },

  // Posts
  POSTS: {
    list: buildUrl('/posts'),
    byId: (id: string) => buildUrl(`/posts/${id}`),
    create: buildUrl('/posts'),
    update: (id: string) => buildUrl(`/posts/${id}`),
    delete: (id: string) => buildUrl(`/posts/${id}`),
    like: (postId: string) => buildUrl(`/posts/${postId}/like`),
    share: (postId: string) => buildUrl(`/posts/${postId}/share`),

    comments: {
      list: (postId: string) => buildUrl(`/posts/${postId}/comments`),
      create: (postId: string) => buildUrl(`/posts/${postId}/comments`),
      update: (commentId: string) => buildUrl(`/comments/${commentId}`),
      delete: (commentId: string) => buildUrl(`/comments/${commentId}`),
    },
  },

  // Reviews
  REVIEWS: {
    list: buildUrl('/reviews'),
    featured: buildUrl('/reviews/featured'),
    byId: (id: string) => buildUrl(`/reviews/${id}`),
    create: buildUrl('/reviews'),
    update: (id: string) => buildUrl(`/reviews/${id}`),
    delete: (id: string) => buildUrl(`/reviews/${id}`),
  },

  // Events
  EVENTS: {
    list: buildUrl('/events'),
    byId: (id: string) => buildUrl(`/events/${id}`),
    create: buildUrl('/events'),
    update: (id: string) => buildUrl(`/events/${id}`),
    delete: (id: string) => buildUrl(`/events/${id}`),
  },

  // Services
  SERVICES: {
    tripRequests: buildUrl('/trip-requests'),
    callbackRequests: buildUrl('/callback-requests'),
    inquiries: buildUrl('/inquiries'),

    planningCalls: {
      list: buildUrl('/planning-calls'),
      byId: (id: string) => buildUrl(`/planning-calls/${id}`),
      create: buildUrl('/planning-calls'),
      update: (id: string) => buildUrl(`/planning-calls/${id}`),
      delete: (id: string) => buildUrl(`/planning-calls/${id}`),
    },

    contracts: {
      list: buildUrl('/contracts'),
      byId: (id: string) => buildUrl(`/contracts/${id}`),
      sign: (id: string) => buildUrl(`/contracts/${id}/sign`),
    },
  },

  // Admin
  ADMIN: {
    users: {
      list: buildUrl('/admin/users'),
      byId: (id: string) => buildUrl(`/admin/users/${id}`),
      updateStatus: (id: string) => buildUrl(`/admin/users/${id}/status`),
      updateRole: (id: string) => buildUrl(`/admin/users/${id}/role`),
      delete: (id: string) => buildUrl(`/admin/users/${id}`),
    },

    adventures: {
      list: buildUrl('/admin/adventures'),
      verify: (id: string) => buildUrl(`/admin/adventures/${id}/verify`),
      safetyScore: (id: string) =>
        buildUrl(`/admin/adventures/${id}/safety-score`),
    },

    reviews: {
      list: buildUrl('/admin/reviews'),
      feature: (id: string) => buildUrl(`/admin/reviews/${id}/feature`),
      delete: (id: string) => buildUrl(`/admin/reviews/${id}`),
    },

    moderation: {
      deletePost: (id: string) => buildUrl(`/admin/posts/${id}`),
      deleteComment: (id: string) => buildUrl(`/admin/comments/${id}`),
    },

    settings: {
      get: buildUrl('/admin/settings'),
      update: buildUrl('/admin/settings'),
    },

    countries: {
      list: buildUrl('/admin/countries'),
      byId: (id: string) => buildUrl(`/admin/countries/${id}`),
      create: buildUrl('/admin/countries'),
      update: (id: string) => buildUrl(`/admin/countries/${id}`),
      delete: (id: string) => buildUrl(`/admin/countries/${id}`),
    },

    analytics: {
      dashboard: buildUrl('/admin/analytics/dashboard'),
      users: buildUrl('/admin/analytics/users'),
      adventures: buildUrl('/admin/analytics/adventures'),
    },
  },
} as const;

export { API_BASE_URL };
