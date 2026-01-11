import { Router } from 'express';
import { CallbackRequestRepository } from './callback-request.repository';
import { CallbackRequestService } from './callback-request.service';
import { CallbackRequestController } from './callback-request.controller';
import { Role } from '@zagotours/database';

const router: Router = Router();

// Initialize dependencies
const callbackRequestRepository = new CallbackRequestRepository();
const callbackRequestService = new CallbackRequestService(
  callbackRequestRepository
);
const callbackRequestController = new CallbackRequestController(
  callbackRequestService
);

// Public route - anyone can submit a callback request
router.post('/', callbackRequestController.create);

// Admin routes
router.get(
  '/',

  callbackRequestController.getAll
);

router.get(
  '/pending',

  callbackRequestController.getPending
);

router.get(
  '/:id',

  callbackRequestController.getById
);

router.delete(
  '/:id',

  callbackRequestController.delete
);

export { router as callbackRequestRoutes };
