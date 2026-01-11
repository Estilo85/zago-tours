import { Router } from 'express';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Role } from '@zagotours/database';

const router: Router = Router();

// Initialize dependencies
const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);

// Public routes
router.get('/', eventController.getAll);
router.get('/upcoming', eventController.getUpcoming);
router.get('/:id', eventController.getById);

router.post('/', eventController.create);

router.patch('/:id', eventController.update);

router.delete('/:id', eventController.delete);

export { router as eventRoutes };
