import { Router } from 'express';
import { ReviewRepository } from './review.repository';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { Role } from '@zagotours/database';

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
router.post('/', reviewController.create);
router.get('/my/reviews', reviewController.getMyReviews);
router.put('/:id', reviewController.update);
router.delete('/:id', reviewController.delete);

// Admin routes
router.patch('/:id/toggle-featured', reviewController.toggleFeatured);

export { router as reviewRoutes };
