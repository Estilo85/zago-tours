import { Router } from 'express';
import { TripPlanningCallRepository } from './trip-planning-call.repository';
import { TripPlanningCallService } from './trip-planning-call.service';
import { TripPlanningCallController } from './trip-planning-call.controller';

const router: Router = Router();

// Initialize dependencies
const tripPlanningCallRepository = new TripPlanningCallRepository();
const tripPlanningCallService = new TripPlanningCallService(
  tripPlanningCallRepository,
);
const tripPlanningCallController = new TripPlanningCallController(
  tripPlanningCallService,
);

router.post('/', tripPlanningCallController.scheduleCall);
router.get('/upcoming', tripPlanningCallController.getUpcoming);
router.get('/my-calls', tripPlanningCallController.getMyCalls);
router.put('/:id/reschedule', tripPlanningCallController.rescheduleCall);
router.put('/:id/cancel', tripPlanningCallController.cancelCall);
router.put('/:id/complete', tripPlanningCallController.markAsCompleted);

// Admin endpoints
router.get('/', tripPlanningCallController.getAll);
router.get('/:id', tripPlanningCallController.getById);
router.delete('/:id', tripPlanningCallController.delete);

export { router as tripPlanningCallRoutes };
