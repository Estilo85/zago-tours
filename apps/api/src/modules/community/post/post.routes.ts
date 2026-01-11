import { Router } from 'express';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { PostController } from './post.controller';

const router: Router = Router();

// Initialize dependencies
const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

// Public routes
router.get('/', postController.getAll);
router.get('/:id', postController.getById);
router.get('/:id/comments', postController.getComments);

// Authenticated routes
router.post('/', postController.create);
router.get('/feed/my-feed', postController.getFeed);
router.get('/my/posts', postController.getMyPosts);
router.put('/:id', postController.update);
router.delete('/:id', postController.delete);

// Social interactions
router.post('/:id/like', postController.toggleLike);
router.post('/:id/share', postController.sharePost);
router.post('/:id/comments', postController.addComment);
router.delete(
  '/:id/comments/:commentId',

  postController.deleteComment
);

export { router as postRoutes };
