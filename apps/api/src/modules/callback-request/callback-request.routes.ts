import { Router } from 'express';
import { CallbackRequestRepository } from './callback-request.repository';
import { CallbackRequestService } from './callback-request.service';
import { CallbackRequestController } from './callback-request.controller';

const router: Router = Router();

// Initialize dependencies
const callbackRequestRepository = new CallbackRequestRepository();
const callbackRequestService = new CallbackRequestService(
  callbackRequestRepository
);
const callbackRequestController = new CallbackRequestController(
  callbackRequestService
);

router.post('/', callbackRequestController.create);

// Adventurer endpoints
router.get('/my-requests', callbackRequestController.getMyRequests);

// Agent endpoints
router.get('/assigned-to-me', callbackRequestController.getAssignedToMe);

// Admin endpoints
router.get('/', callbackRequestController.getAll);
router.get('/pending', callbackRequestController.getPending);
router.get('/:id', callbackRequestController.getById);
router.delete('/:id', callbackRequestController.delete);

export { router as callbackRequestRoutes };
