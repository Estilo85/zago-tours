import { Router } from 'express';

import { Role } from '@zagotours/database';
import { DestinationCountryRepository } from './destination-country.repository';
import { DestinationCountryService } from './destination-country.service';
import { DestinationCountryController } from './destination-country.controller';

const router: Router = Router();
const countryRepository = new DestinationCountryRepository();
const countryService = new DestinationCountryService(countryRepository);
const countryController = new DestinationCountryController(countryService);

router.get('/', countryController.getAll);
router.get('/:id', countryController.getById);

// Admin Routes
router.post('/', countryController.create);
router.post('/bulk', countryController.createBulk);
router.put('/:id', countryController.update);
router.patch('/:id/toggle-active', countryController.toggleActive);
router.delete('/:id', countryController.delete);

export { router as destinationCountryRoutes };
