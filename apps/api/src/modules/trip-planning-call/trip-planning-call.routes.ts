import { Router } from 'express';
import { TripPlanningCallRepository } from './trip-planning-call.repository';
import { TripPlanningCallService } from './trip-planning-call.service';
import { TripPlanningCallController } from './trip-planning-call.controller';

const router: Router = Router();

// Initialize dependencies
const callRepository = new TripPlanningCallRepository();
const callService = new TripPlanningCallService(callRepository);
const callController = new TripPlanningCallController(callService);

// User routes (authenticated)
router.post('/', callController.scheduleCall);
router.get('/upcoming', callController.getUpcoming);
router.get('/my-calls', callController.getMyCalls);
router.get('/:id', callController.getById);
router.patch('/:id/reschedule', callController.rescheduleCall);
router.patch('/:id/cancel', callController.cancelCall);
router.patch('/:id/complete', callController.markAsCompleted);

// Admin routes
router.get(
  '/',

  callController.getAll
);

router.delete('/:id', callController.delete);

export { router as tripPlanningCallRoutes };
