import { Router } from 'express';
import { ItineraryController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { ItineraryRepository } from './itinerary.repository';

import { Role } from '@zagotours/database';
import { upload } from 'src/config/multer.config';

const router = Router();
const repository = new ItineraryRepository();
const service = new ItineraryService(repository);
const controller = new ItineraryController(service);

// Create single itinerary (ADMIN only)
router.post(
  '/:adventureId/itineraries',
  upload.single('image'),
  controller.create
);
router.post('/:adventureId/itineraries/bulk', controller.createBulk);

router.get('/:adventureId/itineraries', controller.getByAdventure);

router.get('/itineraries/:id', controller.getById);

router.put('/itineraries/:id', upload.single('image'), controller.update);

router.delete('/itineraries/:id', controller.delete);

export { router as itineraryRoutes };
