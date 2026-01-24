import { Router } from 'express';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { upload } from 'src/config/multer.config';

import { Role } from '@zagotours/types';

const router: Router = Router();

const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);

// ========== PUBLIC ROUTES ==========
router.post('/', upload.single('media'), eventController.create);
router.get('/', eventController.getAll);
router.get('/upcoming', eventController.getUpcoming);
router.get('/:id', eventController.getById);

// ========== PROTECTED ROUTES (Authenticated Users) ==========

router.get('/me/bookings', eventController.getMyBookings);
router.post('/:id/join', eventController.joinEvent);
router.post('/:id/cancel', eventController.cancelRegistration);

// ========== ADMIN ROUTES ==========
router.patch('/:id', upload.single('media'), eventController.update);
router.delete('/:id', eventController.delete);
router.get('/admin/stats', eventController.getStats);

export { router as eventRoutes };
