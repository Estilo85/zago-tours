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

// Public route
router.post('/', tripRequestController.create);

// Admin routes
router.get('/', tripRequestController.getAll);

router.get('/recent', tripRequestController.getRecent);

router.get('/:id', tripRequestController.getById);

router.delete('/:id', tripRequestController.delete);

export { router as tripRequestRoutes };
