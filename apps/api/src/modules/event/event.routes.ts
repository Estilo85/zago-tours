import { Router } from 'express';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { upload } from 'src/config/multer.config';
import { Role } from '@zagotours/types';
import { authenticate } from 'src/shared/middleware/authentication.middleware';

const router: Router = Router();

const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);

// ========== PUBLIC ROUTES ==========
router.post('/', authenticate, upload.single('media'), eventController.create);
router.get('/', eventController.getAll);
router.get('/upcoming', authenticate, eventController.getUpcoming);
router.get('/me/bookings', authenticate, eventController.getMyBookings);

router.get('/:id', authenticate, eventController.getById);

// ========== PROTECTED ROUTES (Authenticated Users) ==========
router.post('/:id/join', authenticate, eventController.joinEvent);
router.post('/:id/cancel', authenticate, eventController.cancelRegistration);

// ========== ADMIN ROUTES ==========
router.put(
  '/:id',
  authenticate,
  upload.single('media'),
  eventController.update,
);
router.delete('/:id', authenticate, eventController.delete);
router.get('/admin/stats', authenticate, eventController.getStats);

export { router as eventRoutes };
