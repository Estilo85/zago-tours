import { Router } from 'express';
import { AdventureGalleryController } from './gallery.controller';
import { AdventureGalleryService } from './gallery.service';
import { AdventureGalleryRepository } from './gallery.repository';
import { upload } from 'src/config/multer.config';

const router = Router();
const repository = new AdventureGalleryRepository();
const service = new AdventureGalleryService(repository);
const controller = new AdventureGalleryController(service);

router.post(
  '/:adventureId/gallery/bulk',
  upload.array('media', 10),
  controller.bulkUpload,
);

// Get all gallery items for an adventure
router.get('/:adventureId/gallery', controller.getByAdventure);

router.put('/gallery/reorder', controller.reorder);

// Get single gallery item
router.get('/gallery/:id', controller.getById);

// Update gallery item metadata (altText, order)
router.put('/gallery/:id', controller.update);

// Reorder gallery items

// Delete gallery item (with Cloudinary cleanup)
router.delete('/gallery/:id', controller.delete);

export { router as adventureGalleryRoutes };
