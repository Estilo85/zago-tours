import { MediaType } from '../enums';

export interface Post {
  id: string;
  userId: string;
  title: string;
  description: string;
  mediaUrl?: string;
  mediaType: MediaType;
  createdAt: Date;
  deletedAt?: Date;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  deletedAt?: Date;
}

export interface Like {
  id: string;
  postId: string;
  userId: string;
}

export interface Share {
  id: string;
  postId: string;
  userId: string;
}

export interface PostWithDetails extends Post {
  user: {
    id: string;
    name: string;
    email: string;
  };
  comments: Comment[];
  likes: Like[];
  shares: Share[];
  _count?: {
    comments: number;
    likes: number;
    shares: number;
  };
}
