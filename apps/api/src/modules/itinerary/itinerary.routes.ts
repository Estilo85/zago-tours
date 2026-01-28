import { Router } from 'express';
import { ItineraryController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { ItineraryRepository } from './itinerary.repository';
import { upload } from 'src/config/multer.config';
import { authenticate } from 'src/shared/middleware/authentication.middleware';

import { Role } from '@zagotours/types';
import { authorizeRoles } from 'src/shared/middleware/authorization.middleware';

const router = Router();
const repository = new ItineraryRepository();
const service = new ItineraryService(repository);
const controller = new ItineraryController(service);

router.use(authenticate);
// Bulk create itineraries for an adventure
router.post(
  '/:adventureId/itineraries/bulk',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  controller.createBulk,
);

// Get all itineraries for an adventure
router.get(
  '/:adventureId/itineraries',
  authenticate,

  controller.getByAdventure,
);

// Get single itinerary by ID
router.get(
  '/itineraries/:id',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  controller.getById,
);

// Update itinerary
router.put(
  '/itineraries/:id',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  upload.single('image'),
  controller.update,
);

// Delete itinerary
router.delete(
  '/itineraries/:id',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  controller.delete,
);

export { router as itineraryRoutes };
