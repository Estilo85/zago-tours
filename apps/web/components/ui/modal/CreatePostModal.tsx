'use client';

import { useCreatePost } from '@/hooks';
import { PostFormModal } from './PostFormModal';

export function CreatePostModal({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName: string;
}) {
  const createPost = useCreatePost();

  return (
    <PostFormModal
      mode='create'
      userName={userName}
      onSubmit={(formData) => createPost.mutate(formData)}
      isLoading={createPost.isPending}
    >
      {children}
    </PostFormModal>
  );
}
