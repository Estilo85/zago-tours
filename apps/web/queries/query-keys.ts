export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    list: () => [...queryKeys.posts.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.posts.all, 'detail', id] as const,
  },
  user: {
    profile: ['user', 'profile'] as const,
    settings: ['user', 'settings'] as const,
  },
};
