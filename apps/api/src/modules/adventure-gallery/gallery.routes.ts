import { Router } from 'express';
import { AdventureGalleryController } from './gallery.controller';
import { AdventureGalleryService } from './gallery.service';
import { AdventureGalleryRepository } from './gallery.repository';
import { Role } from '@zagotours/database';
import { upload } from 'src/config/multer.config';

const router = Router();
const repository = new AdventureGalleryRepository();
const service = new AdventureGalleryService(repository);
const controller = new AdventureGalleryController(service);

// Create single gallery item (ADMIN only)
router.post(
  '/adventures/:adventureId/gallery',
  upload.single('media'),
  controller.create
);

// Bulk upload gallery items (ADMIN only)
router.post(
  '/adventures/:adventureId/gallery/bulk',
  upload.array('media', 10),
  controller.bulkUpload
);

router.get('/adventures/:adventureId/gallery', controller.getByAdventure);

router.get('/gallery/:id', controller.getById);

// Update gallery item metadata (ADMIN only)
router.put('/gallery/:id', controller.update);

// Reorder gallery items (ADMIN only)
router.put('/gallery/reorder', controller.reorder);

// Soft delete gallery item (ADMIN only)
router.delete('/gallery/:id', controller.delete);

export { router as adventureGalleryRoutes };
