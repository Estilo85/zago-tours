import { Router } from 'express';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Role } from '@zagotours/database';
import { authenticate } from 'src/shared/middleware/authentication.middleware';

const router: Router = Router();

// Initialize dependencies
const reviewRepository = new ReviewRepository();
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

// Public routes
router.get('/', reviewController.getAll);
router.get('/featured', reviewController.getFeatured);
router.get('/average-rating', reviewController.getAverageRating);
router.get('/:id', reviewController.getById);

// Authenticated routes
router.post('/', authenticate, reviewController.create);
router.get('/my/reviews', authenticate, reviewController.getMyReviews);
router.put('/:id', authenticate, reviewController.update);
router.delete('/:id', authenticate, reviewController.delete);

// Admin routes
router.patch('/:id/toggle-featured', reviewController.toggleFeatured);

export { router as reviewRoutes };
