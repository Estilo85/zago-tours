import { MediaType } from '../enums';

export interface CreatePostDTO {
  title: string;
  description: string;
  mediaUrl?: string;
  mediaType?: MediaType;
}

export interface UpdatePostDTO {
  title?: string;
  description?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
}

export interface CreateCommentDTO {
  postId: string;
  content: string;
}

export interface UpdateCommentDTO {
  content: string;
}
