import { Router } from 'express';
import { ItineraryController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { ItineraryRepository } from './itinerary.repository';
import { upload } from 'src/config/multer.config';
import { authenticate } from 'src/shared/middleware/authentication.middleware';
import { requireRole } from 'src/shared/middleware/authorization.middleware';
import { Role } from '@zagotours/types';

const router = Router();
const repository = new ItineraryRepository();
const service = new ItineraryService(repository);
const controller = new ItineraryController(service);

router.use(authenticate);
// Bulk create itineraries for an adventure
router.post(
  '/:adventureId/itineraries/bulk',
  authenticate,
  controller.createBulk,
);

// Get all itineraries for an adventure
router.get('/:adventureId/itineraries', controller.getByAdventure);

// Get single itinerary by ID
router.get('/itineraries/:id', controller.getById);

// Update itinerary
router.put('/itineraries/:id', upload.single('image'), controller.update);

// Delete itinerary
router.delete('/itineraries/:id', controller.delete);

export { router as itineraryRoutes };
