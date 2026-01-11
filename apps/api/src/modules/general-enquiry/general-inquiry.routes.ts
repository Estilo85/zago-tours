import { Router } from 'express';
import { GeneralInquiryRepository } from './general-inquiry.repository';
import { GeneralInquiryService } from './general-inquiry.service';
import { GeneralInquiryController } from './general-inquiry.controller';
import { Role } from '@zagotours/database';

const router: Router = Router();

// Initialize dependencies
const inquiryRepository = new GeneralInquiryRepository();
const inquiryService = new GeneralInquiryService(inquiryRepository);
const inquiryController = new GeneralInquiryController(inquiryService);

// Public route
router.post('/', inquiryController.create);

// Admin routes
router.get('/', inquiryController.getAll);

router.get('/recent', inquiryController.getRecent);

router.get('/:id', inquiryController.getById);

router.delete('/:id', inquiryController.delete);

export { router as generalInquiryRoutes };
