import { Router } from 'express';

import { Role } from '@zagotours/database';
import { DestinationCountryRepository } from './destination-country.repository';
import { DestinationCountryService } from './destination-country.service';
import { DestinationCountryController } from './destination-country.controller';
import { authenticate } from 'src/shared/middleware/authentication.middleware';
import { authorizeRoles } from 'src/shared/middleware/authorization.middleware';

const router: Router = Router();
const countryRepository = new DestinationCountryRepository();
const countryService = new DestinationCountryService(countryRepository);
const countryController = new DestinationCountryController(countryService);

router.get('/', countryController.getAll);
router.get('/:id', countryController.getById);

// Admin Routes
router.post(
  '/',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  countryController.create,
);
router.post(
  '/bulk',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  countryController.createBulk,
);
router.put(
  '/:id',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  countryController.update,
);
router.patch(
  '/:id/toggle-active',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  countryController.toggleActive,
);
router.delete(
  '/:id',
  authenticate,
  authorizeRoles(Role.ADMIN, Role.SUPER_ADMIN),
  countryController.delete,
);

export { router as destinationCountryRoutes };
