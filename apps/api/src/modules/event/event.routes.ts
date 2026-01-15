import { Router } from 'express';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { upload } from 'src/config/multer.config';

const router: Router = Router();

// Initialize dependencies
const eventRepository = new EventRepository();
const eventService = new EventService(eventRepository);
const eventController = new EventController(eventService);

// Public routes
router.get('/', eventController.getAll);
router.get('/upcoming', eventController.getUpcoming);
router.get('/:id', eventController.getById);

// Routes with file upload
router.post('/', upload.single('media'), eventController.create);
router.patch('/:id', upload.single('media'), eventController.update);
router.delete('/:id', eventController.delete);

export { router as eventRoutes };
