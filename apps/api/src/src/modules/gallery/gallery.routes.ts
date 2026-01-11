import { Router } from 'express';
import { GalleryRepository } from './gallery.repository';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';

const router: Router = Router();

// Initialize dependencies
const galleryRepository = new GalleryRepository();
const galleryService = new GalleryService(galleryRepository);
const galleryController = new GalleryController(galleryService);

// Public routes
router.get('/', galleryController.getAll);
router.get('/:id', galleryController.getById);

// Authenticated routes
router.post('/', galleryController.upload);
router.delete('/:id', galleryController.delete);

export { router as galleryRoutes };
