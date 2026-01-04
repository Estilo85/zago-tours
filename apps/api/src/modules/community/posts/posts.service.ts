import { BaseService } from '../../../common/service/base.service';

import { postRepository } from './posts.repository';
import { Post } from '@zagotours/database';

class PostService extends BaseService<Post> {
  constructor() {
    super(postRepository);
  }

  async getPostWithDetails(id: string) {
    const post = await postRepository.findWithDetails(id);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  async getFeed(page: number = 1, limit: number = 20) {
    return postRepository.getFeed({ page, limit });
  }

  async toggleLike(userId: string, postId: string) {
    await this.getById(postId);
    return postRepository.toggleLike(userId, postId);
  }

  async sharePost(userId: string, postId: string) {
    await this.getById(postId);
    return postRepository.sharePost(userId, postId);
  }
}

export const postService = new PostService();
