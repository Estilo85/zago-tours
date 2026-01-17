import { Router } from 'express';
import { TripRequestRepository } from './trip-request.repository';
import { TripRequestService } from './trip-request.service';
import { TripRequestController } from './trip-request.controller';
import { Role } from '@zagotours/database';

const router: Router = Router();

// Initialize dependencies
const tripRequestRepository = new TripRequestRepository();
const tripRequestService = new TripRequestService(tripRequestRepository);
const tripRequestController = new TripRequestController(tripRequestService);

// Public/Adventurer endpoints
router.post('/trip-requests', tripRequestController.create);
router.get('/trip-requests/my-requests', tripRequestController.getMyRequests);

// Agent endpoints
router.get(
  '/trip-requests/assigned-to-me',
  tripRequestController.getAssignedToMe
);

// Admin endpoints
router.get('/trip-requests', tripRequestController.getAll);
router.get('/trip-requests/recent', tripRequestController.getRecent);
router.get('/trip-requests/:id', tripRequestController.getById);
router.delete('/trip-requests/:id', tripRequestController.delete);

export { router as tripRequestRoutes };
