import { Router } from 'express';
import { TripRequestRepository } from './trip-request.repository';
import { TripRequestService } from './trip-request.service';
import { TripRequestController } from './trip-request.controller';
import { Role } from '@zagotours/database';
import { authenticate } from 'src/shared/middleware/authentication.middleware';

const router: Router = Router();

// Initialize dependencies
const tripRequestRepository = new TripRequestRepository();
const tripRequestService = new TripRequestService(tripRequestRepository);
const tripRequestController = new TripRequestController(tripRequestService);

// Public/Adventurer endpoints
router.post('/', authenticate, tripRequestController.create);
router.get('/my-requests', authenticate, tripRequestController.getMyRequests);

// Agent endpoints
router.get(
  '/assigned-to-me',
  authenticate,
  tripRequestController.getAssignedToMe,
);

// Admin endpoints
router.get('/', tripRequestController.getAll);
router.get('/recent', tripRequestController.getRecent);
router.get('/:id', tripRequestController.getById);
router.delete('/:id', tripRequestController.delete);

export { router as tripRequestRoutes };
